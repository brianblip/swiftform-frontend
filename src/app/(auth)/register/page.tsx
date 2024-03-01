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
 
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isReenterPasswordVisible, setIsReenterPasswordVisible] = useState(false);

   

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

                <form onSubmit={handleFormSubmit} className="grid gap-4">
                    <div className="grid gap-1">
                        <label htmlFor="name" className="text-sm font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            required
                            className="rounded border border-black p-3"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="rounded border border-black p-3"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-1">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium"
                        >
                            Password
                        </label>
                        <div className="relative flex items-center">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                required
                                className="rounded border border-black p-3 pr-10"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            Re-enter your password
                        </label>
                        <div className="relative flex items-center">
                            <input
                                type={isReenterPasswordVisible ? "text" : "password"}
                                required
                                className="rounded border border-black p-3 pr-10"
                                id="confirm_password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
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
