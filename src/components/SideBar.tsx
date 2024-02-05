"use client";

import Link from "next/link";
import { useState } from "react";
import FormsList from "./FormsList";
import { usePathname } from "next/navigation";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

export default function SideBar() {
    const pathname = usePathname();
    // Extract form ID from the pathname
    const currentFormId = Number(pathname.split("/Form/")[1]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    /* function for toggling the notification panel */
    function onClickToggleNotification() {
        setIsNotificationOpen(!isNotificationOpen);
    }

    /* function for toggling the profile panel */
    function onClickToggleProfile() {
        setIsProfileOpen(!isProfileOpen);
    }

    return (
        <nav className="hidden h-screen min-w-60 max-w-60 flex-col items-center justify-between bg-primary-black px-2 py-4 md:flex">
            <Link className="" href="/">
                <p>LOGO</p>
            </Link>
            <FormsList formId={currentFormId} />
            <div className="flex w-full flex-col gap-2">
                <div className="relative flex items-center">
                    <button
                        onClick={onClickToggleNotification}
                        className={`flex w-full gap-2 p-2 hover:bg-primary-secondary ${isNotificationOpen ? "bg-primary-secondary" : ""}`}
                    >
                        <NotificationsOutlinedIcon />
                        <p>Notification</p>
                    </button>
                    <div
                        className={`absolute left-[calc(100%+theme(spacing.4))] flex w-full flex-col bg-primary-secondary p-2 ${isNotificationOpen ? "scale-100" : "scale-0"} `}
                    >
                        <h1>No Notifications</h1>
                    </div>
                </div>
                <div className="relative flex items-center">
                    <button
                        onClick={onClickToggleProfile}
                        className={`flex w-full gap-2 p-2 hover:bg-primary-secondary ${isProfileOpen ? "bg-primary-secondary" : ""}`}
                    >
                        <PermIdentityOutlinedIcon />
                        <p>My Account</p>
                    </button>
                    <div
                        className={`absolute left-[calc(100%+theme(spacing.4))] flex w-full flex-col bg-primary-secondary p-2 ${isProfileOpen ? "scale-100" : "scale-0"}`}
                    >
                        <button
                            className={`w-full p-2 text-start hover:bg-primary-neutral`}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
                <button
                    className={`flex w-full gap-2 p-2 hover:bg-primary-secondary`}
                >
                    <LogoutOutlinedIcon />
                    <p>Log out</p>
                </button>
            </div>
        </nav>
    );
}
