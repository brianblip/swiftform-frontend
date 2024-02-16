import Input from "../../../components/Input";

export default function AccountSettings() {
    return (
        <form className="grid w-full gap-4 sm:w-11/12 md:w-full lg:w-[640px]">
            <p className="text-xl font-medium">Account Setting</p>
            <Input
                type="password"
                id="password"
                label="Password"
                placeholder="Password"
                size="full"
                required={true}
            />
            <div className="mb-4">
                <Input
                    label="New Password"
                    id="newPassword"
                    type="password"
                    placeholder="New Password"
                    size="full"
                    required={true}
                />
            </div>
            <button className=" rounded bg-primary-secondary px-8 py-2">
                Save Changes
            </button>
        </form>
    );
}
