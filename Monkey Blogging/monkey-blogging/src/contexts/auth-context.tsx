import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    UserCredential,
    User as FirebaseUser,
} from "firebase/auth";
import { User } from "../module/User";
import { ReactNode, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../hooks/useAuth";

interface AuthProviderProps {
    children: ReactNode;
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<UserCredential>;
    register: (
        fullname: string,
        email: string,
        password: string
    ) => Promise<UserCredential>;
    logout: () => Promise<void>;
    loading: boolean;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchAndSetUserData = async (firebaseUser: FirebaseUser) => {
        try {
            const userDocRef = doc(db, "users", firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const customUser: User = {
                    ...firebaseUser,
                    fullname: userData.fullname,
                    createdAt: userData.createdAt?.toDate() || new Date(),
                } as User;
                setUser(customUser);
            } else {
                const basicUser: User = {
                    ...firebaseUser,
                    fullname: firebaseUser.displayName || "",
                    createdAt: new Date(),
                } as User;
                setUser(basicUser);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            const basicUser: User = {
                ...firebaseUser,
                fullname: firebaseUser.displayName || "",
                createdAt: new Date(),
            } as User;
            setUser(basicUser);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            async (firebaseUser: FirebaseUser | null) => {
                if (firebaseUser) {
                    await fetchAndSetUserData(firebaseUser);
                } else {
                    setUser(null);
                }
                setLoading(false);
            }
        );

        return unsubscribe;
    }, []);

    const login = (
        email: string,
        password: string
    ): Promise<UserCredential> => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = (): Promise<void> => {
        return signOut(auth);
    };

    const register = async (
        fullname: string,
        email: string,
        password: string
    ): Promise<UserCredential> => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(userCredential.user, {
                displayName: fullname,
            });

            const colRef = collection(db, "users");
            await addDoc(colRef, {
                fullname: fullname,
                email: email,
                uid: userCredential.user.uid,
                createdAt: new Date(),
            });

            return userCredential;
        } catch (error) {
            console.error("Error during registration:", error);
            throw error;
        }
    };

    const value: AuthContextType = {
        user,
        login,
        logout,
        register,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
