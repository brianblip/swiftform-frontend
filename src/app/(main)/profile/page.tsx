"use client";

import ProfileInformation from "./ProfileInformation";
import AccountSettings from "./AccountSettings";

export default function MyAccount() {
    return (
        <main className="flex w-dvw flex-col items-center gap-8 p-8">
            <h1 className="text-3xl font-bold">My account</h1>
            <ProfileInformation />
            <AccountSettings />
        </main>
    );
}
