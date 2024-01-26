import Input from "./Input"

export default function AccountSettings() {
    return (
        <div>
            <p className="text-xl">Account Setting</p>
            <div className="flex flex-col items-center justify-center gap-10">
                <Input
                    type="password"
                    id="password"
                    label="Password"
                    placeholder="Password"
                    size="full" />
                <Input
                    label="New Password"
                    id="newPassword"
                    type="password"
                    placeholder="New Password"
                    size="full"
                />
            </div>
            <div className="border border-red-500 flex justify-end">
                <button className="h-[44px] w-[176px] bg-[#444654] rounded-sm flex items-center justify-center">Save Changes</button>
            </div>
        </div>
    )
}