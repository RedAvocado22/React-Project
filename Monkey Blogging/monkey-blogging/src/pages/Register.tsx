import styled from "styled-components";
import {
    Button,
    Field,
    IconEyeClose,
    IconEyeOpen,
    Input,
    Label,
} from "../components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

const RegisterPageStyles = styled.div`
    min-height: 100vh;
    padding: 40px;
    .logo {
        margin: 0 auto 20px;
    }
    .heading {
        text-align: center;
        color: ${(props) => props.theme.primary};
        font-weight: bold;
        font-size: 40px;
        margin-bottom: 50px;
    }
    .form {
        max-width: 600px;
        margin: 0 auto;
    }
`;

const schema = yup.object({
    fullname: yup.string().required("Full name is required"),
    email: yup
        .string()
        .required("Email is required")
        .email("Email is not valid"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number"),
});

interface RegisterFormData {
    fullname: string;
    email: string;
    password: string;
}

const Register = () => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        watch,
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
        },
    });

    const handleRegister = async (data: RegisterFormData) => {
        if (!isValid) return;

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(userCredential.user, {
                displayName: data.fullname,
            });

            const colRef = collection(db, "users");
            await addDoc(colRef, {
                fullname: data.fullname,
                email: data.email,
                uid: userCredential.user.uid,
                createdAt: new Date(),
            });

            toast.success("Register successfully!");
            navigate("/");
        } catch (error: any) {
            console.error("Registration error:", error);

            let errorMessage = "Registration failed. Please try again.";
            if (error.code === "auth/email-already-in-use") {
                errorMessage = "This email is already registered.";
            } else if (error.code === "auth/weak-password") {
                errorMessage = "Password is too weak.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Invalid email address.";
            }

            toast.error(errorMessage);
        }
    };

    const [togglePassword, setTogglePassword] = useState(false);

    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0].message, {
                pauseOnHover: true,
                delay: 0,
            });
        }
    }, [errors]);

    return (
        <RegisterPageStyles>
            <div className="container">
                <img
                    srcSet="/logo.png 2x"
                    alt="monkey-blogging"
                    className="logo"
                />
                <h1 className="heading">Monkey Blogging</h1>
                <form className="form" onSubmit={handleSubmit(handleRegister)}>
                    <Field>
                        <Label htmlFor="fullname">Full name</Label>
                        <Input
                            name="fullname"
                            type="text"
                            control={control}
                            placeholder="Enter your full name"
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            type="email"
                            control={control}
                            placeholder="Enter your email"
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            name="password"
                            type={togglePassword ? "text" : "password"}
                            control={control}
                            placeholder="Enter your password"
                        >
                            {togglePassword ? (
                                <IconEyeOpen
                                    onClick={() => setTogglePassword(false)}
                                ></IconEyeOpen>
                            ) : (
                                <IconEyeClose
                                    onClick={() => setTogglePassword(true)}
                                ></IconEyeClose>
                            )}
                        </Input>
                    </Field>
                    <Button
                        type="submit"
                        isLoading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        Create new account
                    </Button>
                </form>
            </div>
        </RegisterPageStyles>
    );
};

export default Register;
