'use client'

import ProfileInformation from "./ProfileInformation"
import AccountSettings from "./AccountSettings"


export default function MyAccount() {
    return (
        <div className="w-full px-20 h-[100vh] overflow-y-scroll">
            <p className="text-center text-3xl py-10">My account</p>

            <ProfileInformation />
            <AccountSettings />
        </div>
    )
}