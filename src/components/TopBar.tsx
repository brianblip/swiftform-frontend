"use client";
import Link from "next/link";
import NotificationButton from "./UIComponents/NotificationButton";
import MobileMenu from "./UIComponents/MobileMenu";
import Image from "next/image";
import Birdie from "@/assets/Birdie.png";

export default function TopBar() {
    return (
        <section className="sticky top-0 z-50 md:hidden">
            <nav className="flex w-full items-center justify-between bg-primary-black">
                {/* <NotificationButton /> */}
                <Link className="flex items-center" href="/">
                    <Image
                        className="size-14"
                        src={Birdie}
                        alt="SwiftForm logo"
                    />
                    <p>SwiftForm</p>
                </Link>
                <MobileMenu />
            </nav>
        </section>
    );
}
