'use client'
import Link from 'next/link';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useState } from 'react';

export default function TopBar() {
    return (
        <nav className="sticky top-0 flex justify-between items-center bg-primary-black md:hidden">
            <button className="p-4">
                <NotificationsOutlinedIcon />
            </button>

            <Link className="" href="/">
                <p>LOGO</p>
            </Link>

            <div>
                <button className="p-4">
                    <MenuIcon />
                </button>
                    <div className='bg-primary-black h-screen w-3/4 absolute right-full top-0 flex flex-col justify-end p-2'>
                        <button className='absolute top-0 right-full p-4'>
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