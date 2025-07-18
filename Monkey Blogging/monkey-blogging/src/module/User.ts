import { User as FirebaseUser } from "firebase/auth";

export interface User extends FirebaseUser {
    uid: string;
    fullname: string;
    email: string;
    createdAt: Date;
}
