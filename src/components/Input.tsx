interface InputProps {
    label: string;
    placeholder: string;
    type: string;
    size: string;
    id: string;
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
        <div className={`${getSize()} max-w-md`}>
            <label className="flex flex-col gap-2" htmlFor={id}>
                <p className="text-sm font-bold">{label}</p>
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
