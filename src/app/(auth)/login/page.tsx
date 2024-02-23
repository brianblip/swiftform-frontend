"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Birdie from "@/assets/Birdie.png";
import useAuth from "@/contexts/auth";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form"

interface LoginForm {
    email: string
    password: string
}

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginForm>()

    const handleLogin = async (data: LoginForm) => {
        const success = await login({
            email: data.email,
            password: data.password,
        });
        if (success) {
            router.push("/");
        }

    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-white text-black">
            <div className="flex flex-col items-center">
                <div className="mb-8 size-28 overflow-hidden rounded-full">
                    <Image src={Birdie} alt="SwiftForm logo" />
                </div>

                <h1 className="mb-8 text-xl font-bold md:text-2xl">
                    Welcome back
                </h1>

                <form onSubmit={handleSubmit(handleLogin)} className="grid gap-4">
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
                            {...register("email", {
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
                            required
                            className={`rounded border ${errors.password ? "border-red-500" : "border-black"
                                } p-3`}
                            id="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be 8 characters"
                                }
                            })}
                            aria-invalid={errors.password ? "true" : "false"}

                        />
                    </div>

                    <a href="#" className="mb-4 text-sm font-medium">
                        Forgot password?
                    </a>

                    <button
                        type="submit"
                        className="mb-4 w-full rounded bg-black py-3 text-white"
                    >
                        Continue
                    </button>

                    <Link href="/register" className="text-center text-sm">
                        Don&rsquo;t have an account?
                        <span className="ml-1 font-medium">Sign up</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}
