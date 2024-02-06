"use client";

import ProfileInformation from "./ProfileInformation";
import AccountSettings from "./AccountSettings";

export default function MyAccount() {
    return (
        <div className="h-[100vh] w-full overflow-y-scroll px-20">
            <p className="py-10 text-center text-3xl">My account</p>

            <ProfileInformation />
            <AccountSettings />
        </div>
    );
}
