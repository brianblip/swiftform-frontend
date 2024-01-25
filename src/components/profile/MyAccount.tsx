'use client'
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
            case 'sm':
                return 'w-24';
            case 'md':
                return 'w-[205px]';
            case 'lg':
                return 'w-60';
            case 'full':
                return 'w-full';
            default:
                return 'w-48';
        }
    };
    return (

        <div className={`mb-4 ${getSize()} max-w-md`}>
            <label className="block text-sm font-bold text-[#ECECF1]" htmlFor={id}>
                {label}
            </label>
            <input
                className="border h-[52px] bg-[#444654] border-none w-full py-2 px-3 text-white leading-tight rounded-[4px]  focus:shadow-outline"
                id={id}
                placeholder={placeholder}
                type={type}
            />
        </div>
    )
}

export default function MyAccount() {
    return (
        <div className="border border-red-500 w-full px-20 py-20 h-max">
            <p className="text-center text-3xl">My account</p>

            <div>
                <p className="text-xl">Profile Information</p>
                <div className="h-[20vh] flex items-center gap-10 lg:pl-48">
                    <div className="border border-red-500 rounded-full h-[120px] w-[120px]">

                    </div>
                    <button className="h-[44px] w-[176px] bg-[#444654] rounded-sm flex items-center justify-center">
                        Change picture
                    </button>
                </div>
                <div className="flex flex-row justify-center gap-10">
                    <Input type="name" placeholder="First name" label="First name" size="md" id="firstName"/>
                    <Input type="name" placeholder="Last name" label="Last name" size="md" id="lastName"/>
                </div>
                <div className="flex flex-row justify-center gap-10">
                    <Input type="email" placeholder="Email" label="Email" size="full" id="email" />
                </div>
                <div className="border border-red-500 flex justify-end">
                    <button className="h-[44px] w-[176px] bg-[#444654] rounded-sm flex items-center justify-center">Save Changes</button>

                </div>
            </div>

            <div>
                <p className="text-xl">Account Setting</p>
                <div className="flex flex-row justify-center gap-10">
                </div>
            </div>
        </div>
    )
}