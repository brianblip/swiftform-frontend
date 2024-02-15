"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Birdie from "@/assets/Birdie.png";
import useAuth from "@/contexts/auth";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const success = await login({
            email: email,
            password: password,
        });

        if (success) {
            router.push("/");
        }
    };

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
                        <input
                            type="password"
                            required
                            className="rounded border border-black p-3"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
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
                <Link href="/Register" className="w-fit text-sm">
                    Don&rsquo;t have an account?
                    <span className="font-medium"> Sign up</span>
                </Link>
            </div>
        </main>
    );
}
