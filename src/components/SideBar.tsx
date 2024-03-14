"use client";

import Link from "next/link";
import FormsList from "./FormsList";
import { usePathname } from "next/navigation";
import NotificationButton from "./UIComponents/NotificationButton";
import ProfileButton from "./UIComponents/ProfileButton";
import LogoutButton from "./UIComponents/LogoutButton";
import Image from "next/image";
import Birdie from "@/assets/Birdie.png";

export default function SideBar() {
    const pathname = usePathname();
    const currentFormId = Number(pathname.split("/Form/")[1]);

    return (
        <nav className="sticky left-0 top-0 hidden h-dvh min-w-60 max-w-60 flex-col items-center justify-between bg-primary-black px-2 py-4 md:flex">
            <Link className="" href="/">
                <p>LOGO</p>
            </Link>
            <FormsList formId={currentFormId} />
            <div className="flex w-full flex-col gap-2">
                <NotificationButton />
                <ProfileButton />
                <LogoutButton />
            </div>
        </nav>
    );
}
