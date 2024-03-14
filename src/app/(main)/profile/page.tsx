"use client";

import ProfileInformation from "./ProfileInformation";
import AccountSettings from "./AccountSettings";

export default function MyAccount() {
    return (
        <main className="flex h-[calc(100vh-57.0667px)] w-dvw flex-col items-center gap-8 overflow-scroll p-8">
            <h1 className="text-3xl font-bold">My account</h1>
            <ProfileInformation />
            <AccountSettings />
        </main>
    );
}
