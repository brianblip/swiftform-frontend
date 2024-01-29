
interface InputProps {
    label: string,
    placeholder: string,
    type: string,
    size: string,
    id: string

}
const Input = ({ label, placeholder, type, size, id }: InputProps) => {
    const getSize = () => {
        switch (size) {
            case "sm":
                return "w-24";
            case "md":
                return "w-[205px]";
            case"lg":
                return "w-60";
            case "full":
                return 'w-full';
            default:
                return "w-48";
        }
    };
    return (

        <div className={`mb-4 ${getSize()} max-w-md`}>
            <label className="block text-sm font-bold text-[#ECECF1]" htmlFor={id}>
                {label}
            </label>
            <input
                className="border h-[52px] bg-[#444654] border-none w-full py-2 px-3 text-white leading-tight rounded-[4px] focus:shadow-outline"
                id={id}
                placeholder={placeholder}
                type={type}
            />
        </div>
    )
}

export default Input;
