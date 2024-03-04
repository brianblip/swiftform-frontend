interface InputProps {
    label: string;
    required?: boolean;
    type: "text" | "textarea";
    error: any;
    register: any;
    registerName: string;
    registerRequired?: {};
}

export default function Input({
    label,
    required,
    type,
    error,
    register,
    registerName,
    registerRequired,
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
            <input
                id={label}
                type={type}
                className={`w-full rounded border-2 px-3 py-2 text-primary-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-error focus:ring-error" : "border-transparent"}`}
                {...register(registerName, registerRequired)}
            />
            {error && <p className="mx-2 text-xs text-error">{error}</p>}
        </div>
    );
}
