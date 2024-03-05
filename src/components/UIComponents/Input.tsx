interface InputProps {
    label: string;
    required?: boolean;
    type: "text" | "email" | "password" | "textarea";
    register: any;
    registerName: string;
    registerRequired?: {};
    error: any;
    isPasswordVisible?: boolean;
    setIsPasswordVisible?: any;
}

export default function Input({
    label,
    required,
    type,
    register,
    registerName,
    registerRequired,
    error,
    isPasswordVisible,
    setIsPasswordVisible,
}: InputProps) {
    return (
        <div className="grid gap-1">
            <label
                className={`text-sm font-semibold ${error ? "text-error" : ""}`}
                htmlFor={label}
            >
                {label}
                {required ? "*" : ""}
            </label>
            {type === "textarea" ? (
                <textarea
                    id={label}
                    className={`max-h-40 min-h-20 w-full rounded border-2 px-3 py-2 text-primary-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-error focus:ring-error" : "border-transparent"}`}
                    {...register(registerName, registerRequired)}
                />
            ) : type === "text" || type === "email" ? (
                <input
                    type={type === "text" ? "text" : "email"}
                    id={label}
                    className={`w-full rounded border border-primary-black px-3 py-2 text-primary-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-error focus:ring-error" : ""}`}
                    {...register(registerName, registerRequired)}
                    aria-invalid={error ? "true" : "false"}
                />
            ) : type === "password" ? (
                <div className="relative flex items-center">
                    <input
                        type={isPasswordVisible ? "text" : "password"}
                        id={label}
                        className={`w-full rounded border border-primary-black px-3 py-2 text-primary-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-error focus:ring-error" : ""}`}
                        {...register(registerName, registerRequired)}
                        aria-invalid={error ? "true" : "false"}
                    />
                    {isPasswordVisible ? (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsPasswordVisible(!isPasswordVisible);
                            }}
                            className="absolute right-0 mr-2 hover:text-primary-secondary"
                        >
                            <VisibilityOffIcon />
                        </button>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsPasswordVisible(!isPasswordVisible);
                            }}
                            className="absolute right-0 mr-2 hover:text-primary-secondary"
                        >
                            <VisibilityIcon />
                        </button>
                    )}
                </div>
            ) : (
                <p className="w-full">
                    Sorry, you didn&rsquo;t specify the type of the input
                </p>
            )}
            {error && <p className="mx-2 text-xs text-error">{error}</p>}
        </div>
    );
}
