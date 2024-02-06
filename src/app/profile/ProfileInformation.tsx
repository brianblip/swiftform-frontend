import Input from "../../components/Input";

export default function ProfileInformation() {
    return (
        <form>
            <p className="text-xl">Profile Information</p>
            <div className="flex h-[20vh] items-center gap-10 lg:pl-48">
                <div className="h-[120px] w-[120px] rounded-full border border-red-500"></div>
                <button className="flex h-[44px] w-[176px] items-center justify-center rounded-sm bg-[#444654]">
                    Change picture
                </button>
            </div>
            <div className="flex flex-row justify-center gap-10">
                <Input
                    type="name"
                    placeholder="First name"
                    label="First name"
                    size="md"
                    id="firstName"
                />
                <Input
                    type="name"
                    placeholder="Last name"
                    label="Last name"
                    size="md"
                    id="lastName"
                />
            </div>
            <div className="flex flex-row justify-center gap-10">
                <Input
                    type="email"
                    placeholder="Email"
                    label="Email"
                    size="full"
                    id="email"
                />
            </div>
            <div className="flex justify-end">
                <button className="flex h-[44px] w-[176px] items-center justify-center rounded-sm bg-[#444654]">
                    Save Changes
                </button>
            </div>
        </form>
    );
}
