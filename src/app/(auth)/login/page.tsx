"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Birdie from "@/assets/Birdie.png";
import useAuth from "@/contexts/auth";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm, SubmitHandler } from "react-hook-form"
import Input from "@/components/UIComponents/Input";

interface LoginForm {
    email: string
    password: string
}

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loginError, setLoginError] = useState("")
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginForm>()

    const handleLogin = async (data: LoginForm) => {

        await login({
            email: data.email,
            password: data.password,
        }).then(response => {
            if (response.message === "Invalid email or password") {
                throw Error(response.message)
            } else if (response.data) {
                router.push("/");
            }
            throw Error("there's something wrong...")
        }).catch(error => {
            if (error.message === "Invalid email or password") {
                setLoginError(error.message)
                setTimeout(() => {
                    setLoginError("")
                }, 7000)
            }
            console.log(error)

        })


    };

    function onClickToggleVisibility() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <main className="flex min-h-dvh w-dvw items-center justify-center bg-white text-primary-black">
            <div className="flex flex-col items-center gap-8">
                <div className="size-28 overflow-hidden rounded-full">
                    <Image src={Birdie} alt="SwiftForm logo" />
                </div>

                <h1 className="text-xl font-bold md:text-2xl">Welcome back</h1>

                <form onSubmit={handleSubmit(handleLogin)} className="grid gap-4">
                    <div className="grid gap-1">
                        <label htmlFor="email" className="text-sm font-medium">
                            {loginError ? (
                                <span className="text-red-500">
                                    {loginError}
                                </span>
                            ) : errors.email ? (
                                <span className="text-red-500">
                                    {errors.email.message}
                                </span>
                            ) : "Email"}
                        </label>
                        <input
                            type="email"
                            className={`rounded border ${errors.email || loginError ? "border-red-500" : "border-black"
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
                            {loginError ? (
                                <span className="text-red-500">
                                    {loginError}
                                </span>
                            ) : errors.email ? (
                                <span className="text-red-500">
                                    {errors.email.message}
                                </span>
                            ) : "Email"}
                        </label>
                        <div className="relative flex items-center">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                className={`rounded border ${errors.password || loginError ? "border-red-500" : "border-black"
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
                            {isPasswordVisible ? (
                                <button
                                    onClick={onClickToggleVisibility}
                                    className="absolute right-0 mr-2 hover:text-primary-secondary"
                                >
                                    <VisibilityOffIcon />
                                </button>
                            ) : (
                                <button
                                    onClick={onClickToggleVisibility}
                                    className="absolute right-0 mr-2 hover:text-primary-secondary"
                                >
                                    <VisibilityIcon />
                                </button>
                            )}
                        </div>
                    </div>

                    <a href="#" className="w-fit text-sm font-medium">
                        Forgot password?
                    </a>

                    <button
                        type="submit"
                        className="w-full rounded bg-primary-black p-3 text-white"
                    >
                        Continue
                    </button>
                </form>
                <Link href="/register" className="w-fit text-sm">
                    Don&rsquo;t have an account?
                    <span className="font-medium"> Sign up</span>
                </Link>
            </div>
        </main>
    );
}
