'use client'

import { useRouter } from "next/navigation";
import Image from "next/image"
import Birdie from "../../assets/Birdie.png"
import { Router } from "next/router";

export default function Signup() {
    const router = useRouter();

    return (
        <div className="h-[100vh] bg-white w-screen flex justify-center items-center min-w-[352px]">
            <div className="border rounded-lg border-gray-300 w-[80%] md:w-[50%] h-[93%] flex flex-col items-center gap-9 justify-center max-h-[1300px]">
                <div className="w-28 h-36 rounded-full overflow-hidden" >
                    <Image src={Birdie} alt="Swift form logo" />
                </div>
                <p className="text-center font-extrabold text-4xl text-black">Create your account</p>
                <form className="w-full flex flex-col justify-center items-center">
                    <div className="mb-4 w-[60%] max-w-md">
                        <label className="block text-sm font-bold text-black" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="border h-[52px] border-black w-full py-2 px-3 text-gray-700 leading-tight rounded-[4px]  focus:shadow-outline"
                            id="email"
                            placeholder="Email address"
                            type="email"
                        />
                    </div>
                    <div className="mb-4 w-[60%] max-w-md">
                        <label className="block text-sm font-bold text-black" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="border h-[52px] border-black w-full py-2 px-3 text-gray-700 leading-tight rounded-[4px]"
                            type="password"
                            placeholder="********"
                            id="password"
                        />
                    </div>
                    <div className="mb-4 w-[60%] max-w-md">
                        <label className="block text-sm font-bold text-black" htmlFor="password">
                            Confirm Password
                        </label>
                        <input
                            className="border h-[52px] border-black w-full py-2 px-3 text-gray-700 leading-tight rounded-[4px]"
                            type="password"
                            placeholder="********"
                            id="password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="border w-[60%] max-w-md rounded-md h-[52px] border-black py-2 px-3 bg-black text-white leading-tight"
                    >
                        Continue
                    </button>
                </form>
                <p className="text-center text-black cursor-pointer" onClick={() => router.push('/login')}>
                    Already have an account? Login
                </p>
            </div>
        </div>
    )
}