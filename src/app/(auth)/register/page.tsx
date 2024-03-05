"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import Birdie from "@/assets/Birdie.png";
import Link from "next/link";
import useAuth from "@/contexts/auth";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm, SubmitHandler } from "react-hook-form"
import Input from "@/components/UIComponents/Input";
interface RegisterForm {
    name: string
    email: string
    password: string
    confirmPassword: string
}
export default function RegistrationPage() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("")
    const { register: authRegister } = useAuth();
    const {
        register: formRegister,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterForm>()
    const password = watch("password", ""); // Get the value of the password field

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isReenterPasswordVisible, setIsReenterPasswordVisible] = useState(false);

    const handleFormSubmit = async (data: RegisterForm) => {
        try {
            await authRegister({
                name: data.name,
                email: data.email,
                password: data.password,
                avatar_url: "",
            });
            router.push("/");

        } catch (error: any) {
            if (error.message === "Email already exists") {
                console.log(error.message)
                setErrorMessage(error.message)
                setTimeout(()=>{
                    setErrorMessage("")
                }, 7000)
            } else {
                // Other error handling logic
                console.log(error);
            }
        }
    }

    function onClickTogglePasswordVisibility() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    function onClickToggleReenterPasswordVisibility() {
        setIsReenterPasswordVisible(!isReenterPasswordVisible);
    }

    return (
        <div className="flex min-h-dvh w-dvw items-center justify-center bg-white text-primary-black">
            <div className="flex flex-col items-center gap-8">
                <div className="size-28 overflow-hidden rounded-full">
                    <Image src={Birdie} alt="SwiftForm logo" />
                </div>

                <h1 className="text-xl font-bold md:text-2xl">
                    Create your account
                </h1>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="grid gap-4">
                    <div className="grid gap-1">
                        <label htmlFor="name" className="text-sm font-medium">
                            {errors.name ? (
                                <span className="text-red-500">
                                    {errors.name.message}
                                </span>
                            ) : "Name"}                        </label>
                        <input
                            type="text"
                            className={`rounded border ${errors.name ? "border-red-500" : "border-black"
                                } p-3`}
                            id="name"
                            {...formRegister("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 2,
                                    message: "At least 2 characters long"
                                },
                                maxLength: {
                                    value: 50,
                                    message: "Name should not exceed 50 characters"
                                }
                            })}
                            aria-invalid={errors.name ? "true" : "false"}
                        />
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="email" className="text-sm font-medium">
                            {errorMessage ? (
                                <span className="text-red-500">
                                    {errorMessage}
                                </span>
                            ) : errors.email ? (
                                <span className="text-red-500">
                                    {errors.email.message}
                                </span>
                            ) : "Email"}
                        </label>
                        <input
                            type="email"
                            className={`rounded border ${errors.email || errorMessage ? "border-red-500" : "border-black"
                                } p-3`}
                            id="email"
                            {...formRegister("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address"
                                },
                            })}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                    </div>

                    <div className="grid gap-1">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium"
                        >
                            {errors.password ? (
                                <span className="text-red-500">
                                    {errors.password.message}
                                </span>
                            ) : "Password"}
                        </label>
                        <div className="relative flex items-center">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                required
                                className={`rounded border ${errors.password ? "border-red-500" : "border-black"
                                    } p-3 pr-10`}
                                id="password"
                                {...formRegister("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be 8 characters"
                                    }
                                })}
                                aria-invalid={errors.password ? "true" : "false"}
                            />
                            {isPasswordVisible ? (
                                <button
                                    onClick={onClickTogglePasswordVisibility}
                                    className="absolute right-0 mr-2 hover:text-primary-secondary"
                                >
                                    <VisibilityOffIcon />
                                </button>
                            ) : (
                                <button
                                    onClick={onClickTogglePasswordVisibility}
                                    className="absolute right-0 mr-2 hover:text-primary-secondary"
                                >
                                    <VisibilityIcon />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mb-4 grid gap-1">
                        <label
                            htmlFor="confirm_password"
                            className="text-sm font-medium"
                        >
                            {errors.confirmPassword ? (
                                <span className="text-red-500">
                                    {errors.confirmPassword.message}
                                </span>
                            ) : "Re-enter your password"}
                        </label>
                        <div className="relative flex items-center">
                            <input
                                type={isReenterPasswordVisible ? "text" : "password"}
                                className={`rounded border ${errors.confirmPassword ? "border-red-500" : "border-black"
                                    } p-3 pr-10`}
                                id="confirm_password"
                                {...formRegister("confirmPassword", {
                                    required: "Please re-enter your password",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be 8 characters"
                                    },
                                    validate: (value) =>
                                        value === password || "Passwords do not match"
                                })}
                                aria-invalid={errors.confirmPassword || password ? "true" : "false"}
                            />
                            {isReenterPasswordVisible ? (
                                <button
                                    onClick={onClickToggleReenterPasswordVisibility}
                                    className="absolute right-0 mr-2 hover:text-primary-secondary"
                                >
                                    <VisibilityOffIcon />
                                </button>
                            ) : (
                                <button
                                    onClick={onClickToggleReenterPasswordVisibility}
                                    className="absolute right-0 mr-2 hover:text-primary-secondary"
                                >
                                    <VisibilityIcon />
                                </button>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded bg-primary-black p-3 text-white"
                    >
                        Continue
                    </button>
                </form>
                <Link href="/login" className="w-fit text-sm">
                    Already have an account?
                    <span className="font-medium"> Log in</span>
                </Link>
            </div>
        </div>
    );
}
