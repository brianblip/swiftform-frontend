"use client";

import React, { useState } from "react";
import Image from "next/image";
import Birdie from "@/assets/Birdie.png";
import Link from "next/link";
import useAuth from "@/contexts/auth";
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
    const router = useRouter();

    const { register } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleFormSubmit = async () => {
        try {
            await register({
                name: name,
                email: email,
                password: password,
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
                        <input
                            type="password"
                            required
                            className="rounded border border-black p-3"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-4 grid gap-1">
                        <label
                            htmlFor="confirm_password"
                            className="text-sm font-medium"
                        >
                            Re-enter your password
                        </label>
                        <input
                            type="password"
                            required
                            className="rounded border border-black p-3"
                            id="confirm_password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
