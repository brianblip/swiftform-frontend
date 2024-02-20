import Input from "../../../components/Input";

export default function AccountSettings() {
    return (
        <form className="flex w-full flex-col gap-4">
            <p className="text-xl font-medium">Account Setting</p>
            <div className="flex flex-col gap-4">
                <Input
                    type="password"
                    id="password"
                    label="Password"
                    placeholder="Password"
                    size="full"
                    required={true}
                />
                <Input
                    label="New Password"
                    id="newPassword"
                    type="password"
                    placeholder="New Password"
                    size="full"
                    required={true}
                />
            </div>
            <button className="w-fit rounded bg-primary-secondary px-8 py-2">
                Save Changes
            </button>
        </form>
    );
}
