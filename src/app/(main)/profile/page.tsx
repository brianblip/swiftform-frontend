"use client";

import ProfileInformation from "./ProfileInformation";
import AccountSettings from "./AccountSettings";
import Main from "@/components/UIComponents/Main";

export default function MyAccount() {
    return (
        <Main variant="form">
            <h1 className="text-3xl font-bold">My account</h1>
            <ProfileInformation />
            <AccountSettings />
        </Main>
    );
}
