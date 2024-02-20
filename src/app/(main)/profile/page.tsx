"use client";

import ProfileInformation from "./ProfileInformation";
import AccountSettings from "./AccountSettings";

export default function MyAccount() {
    return (
        <main className="flex w-full flex-col items-center gap-4 p-8">
            <h1 className="text-3xl font-bold">My account</h1>
            <section className="flex w-full max-w-fit flex-col items-center gap-8">
                <ProfileInformation />
                <AccountSettings />
            </section>
        </main>
    );
}
