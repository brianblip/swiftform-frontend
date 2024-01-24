interface InputProps {
    label: string,
    placeholder: string,
    type: string
}

const Input = ({ label, placeholder, type }: InputProps) => {
    return (
        <div className="mb-4 w-72 max-w-md">
            <label className="block text-sm font-bold text-[#ECECF1]" htmlFor="email">
                {label}
            </label>
            <input
                className="border h-[52px] bg-[#444654] border-none w-full py-2 px-3 text-white leading-tight rounded-[4px]  focus:shadow-outline"
                id="email"
                placeholder={placeholder}
                type={type}
            />
        </div>
    )
}