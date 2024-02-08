"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Birdie from "../../assets/Birdie.png";
import { useForm, Controller } from "react-hook-form";

type FormData = {
    email: string;
    password: string;
};

export default function Login() {
    const router = useRouter();

    const { handleSubmit, control, setError, reset } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        // TODO: Handle form submission
        reset({
            email: "",
            password: "",
        });
    };

    return (
        <div className="flex h-[100vh] w-screen min-w-[280px] flex-col items-center justify-center bg-white">
            <div className="flex h-[90%] max-h-[1300px] w-[80%] max-w-[1000px] flex-col items-center justify-center gap-9 overflow-y-auto rounded-lg border border-gray-300 md:w-[70%] md:min-w-[500px]">
                <div className="h-16 w-16 overflow-hidden rounded-full sm:h-36 sm:w-28">
                    <Image src={Birdie} alt="Swift form logo" />
                </div>
                <p className="text-center text-xl font-extrabold text-black sm:text-2xl md:text-4xl">
                    Welcome Back
                </p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex w-full flex-col items-center justify-center"
                >
                    <div className="mb-4 w-[60%] max-w-md">
                        <label
                            className="block text-sm font-bold text-black"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <input
                                        {...field}
                                        className="focus:shadow-outline w-full rounded-[4px] border border-black px-3 py-2 leading-tight text-gray-700  md:h-[52px]"
                                        id="email"
                                        placeholder="Email address"
                                        type="email"
                                        required
                                    />
                                    {fieldState.error && (
                                        <p className="text-red-500">
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                </>
                            )}
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Invalid email address",
                                },
                            }}
                        />
                    </div>
                    <div className="mb-4 w-[60%] max-w-md">
                        <label
                            className="block text-sm font-bold text-black"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <input
                                        {...field}
                                        className="w-full rounded-[4px] border border-black px-3 py-2 leading-tight text-gray-700 md:h-[52px]"
                                        type="password"
                                        placeholder="********"
                                        id="password"
                                        required
                                    />
                                    {fieldState.error && (
                                        <p className="text-red-500">
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                </>
                            )}
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            }}
                        />
                    </div>
                    <p className="mb-4 w-[60%] max-w-md cursor-pointer text-black">
                        Forgot password?
                    </p>
                    <button
                        type="submit"
                        className="w-[60%] max-w-md rounded-md border border-black bg-black px-3 py-2 leading-tight text-white md:h-[52px]"
                    >
                        Continue
                    </button>
                </form>
                <p
                    className="cursor-pointer text-center text-black"
                    onClick={() => router.push("/signup")}
                >
                    Don&rsquo;t have an account? Signup
                </p>
            </div>
        </div>
    );
}
