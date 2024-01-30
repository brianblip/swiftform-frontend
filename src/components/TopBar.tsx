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
    <nav className="sticky top-0 flex justify-between items-center bg-primary-black md:hidden">
      <div>
        <button onClick={onClickToggleNotification} className="p-4">
          <NotificationsOutlinedIcon />
        </button>
        <div
          className={`absolute top-full left-0 bg-primary-secondary w-full p-2 ${isNotificationOpen ? "scale-100" : "scale-0"} `}
        >
          <h1>No Notifications</h1>
        </div>
      </div>

      <Link className="" href="/">
        <p>LOGO</p>
      </Link>

      <div>
        <button onClick={onClickOpenMenu} className="p-4">
          <MenuIcon />
        </button>
        <div
          className={`bg-primary-black h-screen w-3/4 absolute top-0 flex flex-col justify-end p-2 ${isMenuOpen ? "right-0" : "right-full"}`}
        >
          <button
            onClick={onClickCloseMenu}
            className="absolute top-0 right-full p-4"
          >
            <CloseIcon />
          </button>
          <div className="flex flex-col gap-2 w-full">
            <FormsList formId={currentFormId} />
            <div className="relative">
              <button
                onClick={onClickToggleProfile}
                className="w-full p-2 flex gap-2"
              >
                <PermIdentityOutlinedIcon />
                <p>My Account</p>
              </button>
              <div
                className={`absolute bottom-full left-0 mb-2 w-full flex-col items-start bg-primary-neutral ${isProfileOpen ? "flex" : "hidden"}`}
              >
                <button className="p-2 w-full text-start">Edit Profile</button>
              </div>
            </div>
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
