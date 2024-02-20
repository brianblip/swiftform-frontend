"use client";
import Link from "next/link";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import FormsList from "./FormsList";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function TopBar() {
    const pathname = usePathname();
    // Extract form ID from the pathname
    const currentFormId = Number(pathname.split("/Form/")[1]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    /* function for opening and closing mobile menu */
    function onClickOpenMenu() {
        setIsMenuOpen(true);
    }

    function onClickCloseMenu() {
        setIsMenuOpen(false);
    }

    /* function for toggling the notification panel */
    function onClickToggleNotification() {
        setIsNotificationOpen(!isNotificationOpen);
    }

    /* function for toggling the profile panel */
    function onClickToggleProfile() {
        setIsProfileOpen(!isProfileOpen);
    }

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between bg-primary-black md:hidden">
            <div>
                <button
                    onClick={onClickToggleNotification}
                    className={`p-4 hover:bg-primary-secondary ${isNotificationOpen ? "bg-primary-secondary" : ""}`}
                >
                    <NotificationsOutlinedIcon />
                </button>
                <div
                    className={`absolute left-0 top-full w-full bg-primary-secondary p-2 ${isNotificationOpen ? "scale-100" : "scale-0"} `}
                >
                    <h1>No Notifications</h1>
                </div>
            </div>

            <Link className="" href="/">
                <p>LOGO</p>
            </Link>

            <div>
                <button
                    onClick={onClickOpenMenu}
                    className={`p-4 hover:bg-primary-secondary ${isMenuOpen ? "bg-primary-secondary" : ""}`}
                >
                    <MenuIcon />
                </button>
                <div
                    className={`absolute top-0 flex h-screen w-3/4 flex-col justify-end bg-primary-black p-2 ${isMenuOpen ? "right-0" : "right-full"}`}
                >
                    <button
                        onClick={onClickCloseMenu}
                        className="absolute right-full top-0 m-2 p-2 hover:bg-primary-secondary"
                    >
                        <CloseIcon />
                    </button>
                    <div className="flex size-full flex-col justify-between gap-2">
                        <FormsList formId={currentFormId} />
                        <div className="flex flex-col gap-2">
                            <div className="relative">
                                <button
                                    onClick={onClickToggleProfile}
                                    className={`flex w-full gap-2 p-2 hover:bg-primary-secondary ${isProfileOpen ? "bg-primary-secondary" : ""}`}
                                >
                                    <PermIdentityOutlinedIcon />
                                    <p>My Account</p>
                                </button>
                                <div
                                    className={`absolute bottom-full left-0 mb-2 w-full flex-col items-start bg-primary-secondary p-2 ${isProfileOpen ? "flex" : "hidden"}`}
                                >
                                    <Link
                                        href="/profile"
                                        className="w-full p-2 text-start hover:bg-primary-neutral"
                                    >
                                        Edit Profile
                                    </Link>
                                </div>
                            </div>
                            <button
                                className={`flex w-full gap-2 p-2 hover:bg-primary-secondary`}
                            >
                                <LogoutOutlinedIcon />
                                <p>Log out</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
