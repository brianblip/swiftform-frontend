import { Input } from "./MyAccount"

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
        </div>
    )
}