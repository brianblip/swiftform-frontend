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
        <div className={`mb-4 ${getSize()} max-w-md`}>
            <label
                className="block text-sm font-bold text-[#ECECF1]"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                className="focus:shadow-outline h-[52px] w-full rounded-[4px] border border-none bg-[#444654] px-3 py-2 leading-tight text-white"
                id={id}
                placeholder={placeholder}
                type={type}
                required={required}
            />
        </div>
    );
};

export default Input;
