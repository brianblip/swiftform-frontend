interface InputProps {
    label: string;
    required?: boolean;
    type: string;
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
                className={`text-sm font-semibold`}
                htmlFor="Form Name"
            >
                Form Name
            </label>
            <input
                id="Form Name"
                type="text"
                className={`w-full rounded border-2 px-3 py-2 text-primary-black focus:outline-none focus:ring-2 focus:ring-blue-500 `}
            />
        </div>
    );
}
