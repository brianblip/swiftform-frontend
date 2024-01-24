'use client'
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

export default function MyAccount() {
    return (
        <div className="border border-red-500 w-full px-20 py-20">
            <p className="text-center text-3xl">My account</p>

            <div>
                <p className="text-xl">Profile Information</p>
                <div></div>
                <div className="flex flex-row justify-center gap-10">
                    <Input type="name" placeholder="First name" label="First name" />
                    <Input type="name" placeholder="Last name" label="Last name" />
                </div>
                <div className="flex flex-row justify-center gap-10">
                    <Input type="email" placeholder="Email" label="Email" />
                </div>
                <div></div>
            </div>

            <div>
                <p className="text-xl">Account Setting</p>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}