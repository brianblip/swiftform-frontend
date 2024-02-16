import Input from "../../../components/Input";

export default function ProfileInformation() {
    return (
        <form className="grid w-full gap-4 sm:w-11/12 md:w-full lg:w-[640px]">
            <p className="text-xl font-medium">Profile Information</p>
            <div className="flex items-center justify-center gap-8">
                <div className="flex aspect-square h-[120px] items-center justify-center rounded-full border border-red-500"></div>
                <button className="cursor-pointer rounded bg-primary-secondary px-4 py-2 text-center">
                    Change picture
                </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
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
            <div className="mb-4">
                <Input
                    type="email"
                    placeholder="Email"
                    label="Email"
                    size="full"
                    id="email"
                />
            </div>
            <button className="rounded bg-primary-secondary px-8 py-2">
                Save Changes
            </button>
        </form>
    );
}
