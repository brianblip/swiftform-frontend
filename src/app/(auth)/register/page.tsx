"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import Birdie from "@/assets/Birdie.png";
import Link from "next/link";
import useAuth from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form"

interface RegisterForm {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export default function RegistrationPage() {
    const router = useRouter();

    const { register: authRegister } = useAuth();
    const {
        register: formRegister,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterForm>()
    const password = watch("password", ""); // Get the value of the password field
    const handleFormSubmit = async (data: RegisterForm) => {
        try {
            await authRegister({
                name: data.name,
                email: data.email,
                password: data.password,
                avatar_url: "",
            });
            router.push("/");
        } catch (error) {
            // TODO: Display form errors
            console.error(error);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-white text-black">
            <div className="flex flex-col items-center">
                <div className="mb-8 size-28 overflow-hidden rounded-full">
                    <Image src={Birdie} alt="SwiftForm logo" />
                </div>

                <h1 className="mb-8 text-xl font-bold md:text-2xl">
                    Create your account
                </h1>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="grid gap-4">
                    <div className="grid gap-1">
                        <label htmlFor="name" className="text-sm font-medium">
                            {errors.name ? (
                                <span className="text-red-500">
                                    {errors.name.message}
                                </span>
                            ) : "Name"}
                        </label>
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
                            {errors.email ? (
                                <span className="text-red-500">
                                    {errors.email.message}
                                </span>
                            ) : "Email"}
                        </label>
                        <input
                            type="email"
                            className={`rounded border ${errors.email ? "border-red-500" : "border-black"
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
                        <input
                            type="password"
                            className={`rounded border ${errors.password ? "border-red-500" : "border-black"
                                } p-3`}
                            id="password"
                            {...formRegister("password", {
                                required: "Password is required"
                            })}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
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
                        <input
                            type="password"
                            className={`rounded border ${errors.confirmPassword ? "border-red-500" : "border-black"
                                } p-3`}
                            id="confirm_password"
                            {...formRegister("confirmPassword", {
                                required: "Please re-enter your password",
                                validate: (value) =>
                                    value === password || "Passwords do not match"
                            })}
                            aria-invalid={errors.confirmPassword || password ? "true" : "false"}

                        />
                    </div>

                    <button
                        type="submit"
                        className="mb-4 w-full rounded bg-black py-3 text-white"
                    >
                        Continue
                    </button>

                    <Link href="/login" className="text-center text-sm">
                        Already have an account?
                        <span className="ml-1 font-medium">Log in</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}
