import Input from "../../components/Input";

export default function AccountSettings() {
    return (
        <form>
            <p className="text-xl">Account Setting</p>
            <div className="flex flex-col items-center justify-center">
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
            <div className="flex justify-end">
                <button className="flex h-[44px] w-[176px] items-center justify-center rounded-sm bg-[#444654]">
                    Save Changes
                </button>
            </div>
        </form>
    );
}
