"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import Birdie from "@/assets/Birdie.png";
import Link from "next/link";
import useAuth from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/UIComponents/Input";
import Alert from "@/components/Alert";
interface RegisterForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export default function RegistrationPage() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");
    const { register: authRegister } = useAuth();
    const {
        register: formRegister,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterForm>();
    const password = watch("password", ""); // Get the value of the password field

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isReenterPasswordVisible, setIsReenterPasswordVisible] =
        useState(false);

    const handleFormSubmit = async (data: RegisterForm) => {
        try {
            const registered = await authRegister({
                name: data.name,
                email: data.email,
                password: data.password,
                avatar_url: "",
            });
            console.log(registered);
            if (registered.message === "User already exists.") {
                throw Error(registered.message);
            }
            router.push("/");
        } catch (error: any) {
            console.log(error);
            if (error.message === "User already exists.") {
                console.log(error.message);
                setErrorMessage(error.message);
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
            } else {
                // Other error handling logic
                setErrorMessage(error.message);
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
                console.log(error);
            }
        }
    };

    return (
        <div className="flex min-h-dvh w-dvw items-center justify-center bg-white text-primary-black">
            <div className="flex flex-col items-center gap-8">
                <div className="size-28 overflow-hidden rounded-full">
                    <Image src={Birdie} alt="SwiftForm logo" />
                </div>

                <h1 className="text-xl font-bold md:text-2xl">
                    Create your account
                </h1>

                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="grid gap-4"
                >
                    <Input
                        label="Name"
                        type="text"
                        {...formRegister("name", {
                            required: "Name is required",
                            minLength: {
                                value: 2,
                                message: "At least 2 characters long",
                            },
                            maxLength: {
                                value: 50,
                                message: "Name should not exceed 50 characters",
                            },
                        })}
                        error={errors.name?.message}
                    />
                    <Input
                        label="Email"
                        type="email"
                        {...formRegister("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address",
                            },
                        })}
                        error={errors.email?.message}
                    />
                    <Input
                        label="Password"
                        type="password"
                        {...formRegister("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be 8 characters",
                            },
                        })}
                        error={errors.password?.message}
                        isPasswordVisible={isPasswordVisible}
                        setIsPasswordVisible={setIsPasswordVisible}
                    />
                    <Input
                        {...formRegister("confirmPassword", {
                            required: "Please re-enter your password",
                            minLength: {
                                value: 8,
                                message: "Password must be 8 characters",
                            },
                            validate: (value: string) =>
                                value === password || "Passwords do not match",
                        })}
                        label="Re-enter your password"
                        type="password"
                        error={errors.confirmPassword?.message}
                        isPasswordVisible={isReenterPasswordVisible}
                        setIsPasswordVisible={setIsReenterPasswordVisible}
                    />

                    <button
                        type="submit"
                        className="mt-4 w-full rounded bg-primary-black p-3 text-white"
                    >
                        Continue
                    </button>
                </form>
                <Link href="/login" className="w-fit text-sm">
                    Already have an account?
                    <span className="font-medium"> Log in</span>
                </Link>
            </div>
            <Alert message={errorMessage} status="Error" />
        </div>
    );
}
