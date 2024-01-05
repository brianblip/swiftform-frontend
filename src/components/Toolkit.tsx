"use client";

import Link from "next/link";
import {
  faBell,
  faCaretDown,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Toolkit() {
  const [openNotification, setOpenNotification] = useState(false);
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);

  // To open and close the notification button
  function handleNotificationClick() {
    setOpenNotification(!openNotification);
    setOpenProfileDropdown(false);
  }

  useEffect(() => {
    function handleOutsideClick(event: any) {
      if (!event.target.closest(".notifications")) {
        setOpenNotification(false);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // To open and close the Profile Dropdown button
  function handleProfileDropdownClick() {
    setOpenProfileDropdown(!openProfileDropdown);
    setOpenNotification(false);
  }

  useEffect(() => {
    function handleOutsideClick(event: any) {
      if (!event.target.closest(".profile-dropdown")) {
        setOpenProfileDropdown(false);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="text-l flex h-16 items-center justify-between gap-x-2 rounded-md border border-solid border-white p-2 px-8">
      <div>
        <Link href="/">
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </div>
      <div className="flex items-center justify-center gap-x-3">
        <div className="notifications relative">
          <button onClick={handleNotificationClick}>
            <FontAwesomeIcon className="h-1em" icon={faBell} />
          </button>
          {openNotification && (
            <div className="absolute right-0 top-full w-40 bg-white px-4 py-2 text-black">
              <h1 className="text-lg font-semibold">Notifications</h1>
            </div>
          )}
        </div>
        <FontAwesomeIcon className="h-1em" icon={faUser} />
        <p>User Name</p>
        <div className="profile-dropdown relative">
          <button className="" onClick={handleProfileDropdownClick}>
            <FontAwesomeIcon
              className={`h-1em transition-all ${
                openProfileDropdown ? "rotate-0" : "rotate-180"
              }`}
              icon={faCaretDown}
            />
          </button>
          <div
            className={`absolute right-0 top-full w-40 bg-white px-4 py-2 text-black transition-all ease-in-out ${
              openProfileDropdown ? "block" : "hidden"
            }`}
          >
            <h1 className="text-lg font-semibold">Profile</h1>
            <Link href="/UserProfile">Edit Profile</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
