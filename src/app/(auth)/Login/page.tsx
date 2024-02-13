"use client";

import { useState } from "react"; // Import useState hook
import { useRouter } from "next/navigation";
import Image from "next/image";
import Birdie from "@/assets/Birdie.png";
import useAuth from "@/store/useAuth";
import { NextRequest, NextResponse } from "next/server";

export default function Login(req: NextRequest, res: NextResponse) {
    const router = useRouter();
    const { login, logout } = useAuth();
    const [email, setEmail] = useState(""); // State for email input
    const [password, setPassword] = useState("");

    const handleLogin = async (e: { preventDefault: () => void }) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Call login function from useAuth hook with email and password
        const success = await login({
            email: email,
            password: password,
        });

        // If login is successful, redirect to home page
        if (success) {
            router.push("/");
        }
    };

    return (
        <div className="flex h-[100vh] w-screen min-w-[352px] flex-col items-center justify-center bg-white">
            <div className="flex h-[85%] max-h-[1300px] w-[80%] flex-col items-center justify-center gap-9 rounded-lg border border-gray-300 md:w-[50%]">
                <div className="h-36 w-28 overflow-hidden rounded-full">
                    <Image src={Birdie} alt="Swift form logo" />
                </div>
                <p className="text-center text-4xl font-extrabold text-black">
                    Welcome Back
                </p>
                <form
                    onSubmit={handleLogin} // Call handleLogin on form submission
                    className="flex w-full flex-col items-center justify-center"
                >
                    <div className="mb-4 w-[60%] max-w-md">
                        <label
                            className="block text-sm font-bold text-black"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="focus:shadow-outline h-[52px] w-full rounded-[4px] border border-black px-3 py-2 leading-tight text-gray-700"
                            id="email"
                            placeholder="Email address"
                            type="email"
                            required
                            value={email} // Bind value to email state
                            onChange={(e) => setEmail(e.target.value)} // Update email state on change
                        />
                    </div>
                    <div className="mb-4 w-[60%] max-w-md">
                        <label
                            className="block text-sm font-bold text-black"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="h-[52px] w-full rounded-[4px] border border-black px-3 py-2 leading-tight text-gray-700"
                            type="password"
                            placeholder="********"
                            id="password"
                            required
                            value={password} // Bind value to password state
                            onChange={(e) => setPassword(e.target.value)} // Update password state on change
                        />
                        <button className="mb-4 w-[60%] cursor-pointer text-black">
                            Forgot password?
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="h-[52px] w-[60%] max-w-md rounded-md border border-black bg-black px-3 py-2 leading-tight text-white"
                    >
                        Continue
                    </button>
                </form>
                <p
                    className="cursor-pointer text-center text-black"
                    onClick={() => {
                        router.push("/Register");
                    }}
                >
                    Don't have an account? Signup
                </p>
            </div>
        </div>
    );
}
