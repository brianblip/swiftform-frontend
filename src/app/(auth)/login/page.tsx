"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Birdie from "@/assets/Birdie.png";
import useAuth from "@/contexts/auth";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/UIComponents/Input";
import Alert from "@/components/Alert";
import Button from "@/components/UIComponents/Button";
import Main from "@/components/UIComponents/Main";

interface LoginForm {
    email: string;
    password: string;
}

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loginError, setLoginError] = useState("");
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginForm>();

    const handleLogin = async (data: LoginForm) => {
        await login({
            email: data.email,
            password: data.password,
        })
            .then((response) => {
                if (response.message === "Invalid email or password") {
                    throw Error(response.message);
                } else if (response.data) {
                    router.push("/");
                }
                throw Error("there's something wrong...");
            })
            .catch((error) => {
                if (error.message === "Invalid email or password") {
                    setLoginError(error.message);
                    setTimeout(() => {
                        setLoginError("");
                    }, 5000);
                }
                console.log(error);
            });
    };

    return (
        <Main variant="auth">
            <div className="flex flex-col items-center gap-8">
                <div className="size-28 overflow-hidden rounded-full">
                    <Image src={Birdie} alt="SwiftForm logo" />
                </div>

                <h1 className="text-xl font-bold md:text-3xl">Welcome back</h1>

                <form
                    onSubmit={handleSubmit(handleLogin)}
                    className="grid gap-4"
                >
                    <Input
                        variant="auth"
                        label="email"
                        type="email"
                        {...register("email", {
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
                        label="password"
                        type="password"
                        {...register("password", {
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

                    <a href="#" className="w-fit text-sm font-medium">
                        Forgot password?
                    </a>

                    <Button type="submit" variant="auth">
                        Continue
                    </Button>
                </form>
                <Link href="/register" className="w-fit text-sm">
                    Don&rsquo;t have an account?
                    <span className="font-bold"> Sign up</span>
                </Link>
            </div>
            <Alert message={loginError} status="Error" />
        </Main>
    );
}
