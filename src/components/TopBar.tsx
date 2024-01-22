'use client'
import Link from 'next/link';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useState } from 'react';

export default function TopBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    /* function for opening and closing mobile menu */
    function onClickOpenMenu() {
        setIsMenuOpen(true);
    };

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
        <nav className="sticky top-0 flex justify-between items-center bg-primary-black md:hidden">
            <div>
                <button onClick={onClickToggleNotification} className="p-4">
                    <NotificationsOutlinedIcon />
                </button>
                <div className={`absolute top-full left-0 bg-primary-neutral w-full p-2 ${isNotificationOpen ? 'scale-100' : 'scale-0'} `}><h1>No Notifications</h1></div>
            </div>

            <Link className="" href="/">
                <p>LOGO</p>
            </Link>

            <div>
                <button onClick={onClickOpenMenu} className="p-4">
                    <MenuIcon />
                </button>
                    <div className={`bg-primary-black h-screen w-3/4 absolute top-0 flex flex-col justify-end p-2 ${isMenuOpen ? 'right-0' : 'right-full' }`}>
                        <button onClick={onClickCloseMenu} className='absolute top-0 right-full p-4'>
                            <CloseIcon />
                        </button>
                        <div className="flex flex-col gap-2 w-full">
                            <button className="w-full p-2 flex gap-2">
                                <PermIdentityOutlinedIcon />
                                <p>My Account</p>
                            </button>
                            <button className="w-full p-2 flex gap-2">
                                <LogoutOutlinedIcon />
                                <p>Log out</p>
                            </button>
                        </div>
                    </div>
            </div>
        </nav>
    );
}