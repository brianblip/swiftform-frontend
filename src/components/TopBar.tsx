"use client";
import Link from "next/link";
import NotificationButton from "./UIComponents/NotificationButton";
import MobileMenu from "./UIComponents/MobileMenu";
import Image from "next/image";
import Birdie from "@/assets/Birdie.png";

export default function TopBar() {
    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between bg-primary-black md:hidden">
            <NotificationButton />
            <Link className="" href="/">
                <p>LOGO</p>
            </Link>
            <MobileMenu />
        </nav>
    );
}
