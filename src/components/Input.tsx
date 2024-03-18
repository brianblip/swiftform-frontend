interface InputProps {
    label: string;
    placeholder: string;
    type: string;
    size: string;
    id: string;
    value?: string;
    required?: boolean;
}
const Input = ({
    label,
    placeholder,
    type,
    size,
    id,
    required,
}: InputProps) => {
    const getSize = () => {
        switch (size) {
            case "sm":
                return "w-24";
            case "md":
                return "w-[205px]";
            case "lg":
                return "w-60";
            case "full":
                return "w-full";
            default:
                return "w-48";
        }
    };
    return (
        <div className={`grid gap-1`}>
            <label className="text-sm font-bold" htmlFor={id}>
                {label}
            </label>
            <input
                className="w-full rounded bg-primary-secondary p-4 leading-tight text-white"
                id={id}
                placeholder={placeholder}
                type={type}
                required={required}
            />
        </div>
    );
};

export default Input;
