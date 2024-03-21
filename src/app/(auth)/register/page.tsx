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
import Button from "@/components/UIComponents/Button";
import Main from "@/components/UIComponents/Main";
import { toast } from "react-toastify";
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
                toast.error(error.message);
                console.log(error.message);
                setErrorMessage(error.message);
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
            } else {
                // Other error handling logic
                toast.error(error.message);
                setErrorMessage(error.message);
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
                console.log(error);
            }
        }
    };

    return (
        <Main variant="auth">
            <section className="flex flex-col items-center gap-6">
                <header className="flex flex-col items-center gap-4">
                    <Image
                        className="size-28 overflow-hidden rounded-full"
                        src={Birdie}
                        alt="SwiftForm logo"
                    />
                    <h1 className="text-2xl font-bold md:text-3xl">
                        Create your account
                    </h1>
                </header>

                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="grid gap-4"
                >
                    <Input
                        variant="auth"
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
                        variant="auth"
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
                        variant="authpassword"
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
                        variant="authpassword"
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

                    <Button className="mt-4" type="submit" variant="auth">
                        Continue
                    </Button>
                </form>
                <Link href="/login" className="w-fit text-sm">
                    Already have an account?
                    <span className="font-bold"> Log in</span>
                </Link>
            </section>
        </Main>
    );
}
