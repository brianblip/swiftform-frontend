"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuth";
import Image from "next/image";
import Birdie from "@/assets/Birdie.png";
import { useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
export default function Signup() {
    const router = useRouter();
    const { register } = useAuthStore();
    const [isPasswordsMismatch, setPasswordsMismatch] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Check if passwords match
            if (formData.password !== formData.confirmPassword) {
                console.error("Passwords do not match");
                setPasswordsMismatch(true);
                return;
            }

            // Call register function
            await register({
                email: formData.email,
                password: formData.password,
                name: "",
                avatar_url: "",
            });

            router.push("/"); // Redirect to homepage
        } catch (error) {
            console.error("Error registering:", error);
        }
    };

    return (
        <div className="flex h-[100vh] w-screen min-w-[352px] items-center justify-center bg-white">
            <div className="flex h-[93%] max-h-[1300px] w-[80%] flex-col items-center justify-center gap-9 rounded-lg md:w-[60%]">
                <div className="h-36 w-28 overflow-hidden rounded-full">
                    <Image src={Birdie} alt="Swift form logo" />
                </div>
                <p className="text-center text-2xl font-extrabold text-black sm:text-3xl md:text-4xl">
                    Create your account
                </p>
                <form
                    onSubmit={handleSubmit}
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
                            className="focus:shadow-outline h-[52px] w-full rounded-[4px] border border-black px-3 py-2 leading-tight  text-gray-700"
                            id="email"
                            placeholder="Email address"
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                });
                                setPasswordsMismatch(false);
                            }}
                            required
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
                            value={formData.password}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                });
                                setPasswordsMismatch(false);
                            }}
                            id="password"
                            required
                        />
                    </div>
                    <div className="mb-4 w-[60%] max-w-md">
                        <label
                            className="block text-sm font-bold text-black"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="h-[52px] w-full rounded-[4px] border border-black px-3 py-2 leading-tight text-gray-700"
                            type="password"
                            placeholder="********"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    confirmPassword: e.target.value,
                                });
                                setPasswordsMismatch(false);
                            }}
                            required
                        />
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
                    onClick={() => router.push("/Login")}
                >
                    Already have an account? Login
                </p>
            </div>
            {isPasswordsMismatch && (
                <Alert
                    severity="error"
                    className="fixed bottom-5 left-5 z-50 border border-black"
                >
                    <AlertTitle>Password do not match</AlertTitle>
                    Please double check your password
                </Alert>
            )}
        </div>
    );
}
