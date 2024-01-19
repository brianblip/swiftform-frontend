'use client'
import Link from "next/link";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useState } from 'react';

export default function SideBar() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  return (
    <nav className="hidden h-screen w-60 flex-col items-center p-4 bg-primary-black justify-between md:flex">
      <Link className="" href="/">
        <p>LOGO</p>
      </Link>
      <div className="flex flex-col gap-2 w-full">
        <button className="w-full p-2 flex gap-2">
          <NotificationsOutlinedIcon />
          <p>Notification</p>
        </button>
        <button className="w-full p-2 flex gap-2">
          <PermIdentityOutlinedIcon />
          <p>My Account</p>
        </button>
        <button className="w-full p-2 flex gap-2">
          <LogoutOutlinedIcon />
          <p>Log out</p>
        </button>
      </div>
    </nav>
  );
}
