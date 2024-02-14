import Input from "../../components/Input";

export default function ProfileInformation() {
    return (
        <form className="flex w-full flex-col gap-4">
            <p className="text-xl font-medium">Profile Information</p>
            <div className="flex items-center justify-center gap-10">
                <div className="flex aspect-square h-[120px] items-center justify-center rounded-full border border-red-500"></div>
                <button className="cursor-pointer rounded bg-primary-secondary px-4 py-2 text-center">
                    Change picture
                </button>
            </div>
            <div className="flex gap-10">
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
            <Input
                type="email"
                placeholder="Email"
                label="Email"
                size="full"
                id="email"
            />
            <button className="w-fit rounded bg-primary-secondary px-8 py-2">
                Save Changes
            </button>
        </form>
    );
}
