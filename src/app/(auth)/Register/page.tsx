"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Birdie from "@/assets/Birdie.png";

export default function Signup() {
    const router = useRouter();

    return (
        <div className="flex h-[100vh] w-screen min-w-[352px] items-center justify-center bg-white">
            <div className="flex h-[93%] max-h-[1300px] w-[80%] flex-col items-center justify-center gap-9 rounded-lg border border-gray-300 md:w-[50%]">
                <div className="h-36 w-28 overflow-hidden rounded-full">
                    <Image src={Birdie} alt="Swift form logo" />
                </div>
                <p className="text-center text-4xl font-extrabold text-black">
                    Create your account
                </p>
                <form className="flex w-full flex-col items-center justify-center">
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
                            id="password"
                            required
                        />
                    </div>
                    <div className="mb-4 w-[60%] max-w-md">
                        <label
                            className="block text-sm font-bold text-black"
                            htmlFor="password"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="h-[52px] w-full rounded-[4px] border border-black px-3 py-2 leading-tight text-gray-700"
                            type="password"
                            placeholder="********"
                            id="password"
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
        </div>
    );
}
