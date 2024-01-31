import Input from "../../components/profile/Input"

export default function ProfileInformation() {
    return (
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
                <Input type="name" placeholder="Last name" label="Last name" size="md" id="lastName" />
            </div>
            <div className="flex flex-row justify-center gap-10">
                <Input type="email" placeholder="Email" label="Email" size="full" id="email"/>
            </div>
            <div className="flex justify-end">
                <button className="h-[44px] w-[176px] bg-[#444654] rounded-sm flex items-center justify-center">
                    Save Changes
                </button>

            </div>
        </div>
    )
}
