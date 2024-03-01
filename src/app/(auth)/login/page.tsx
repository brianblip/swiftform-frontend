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

interface LoginForm {
    email: string
    password: string
}

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginForm>()
    

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

                <form onSubmit={handleLogin} className="grid gap-4">
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
