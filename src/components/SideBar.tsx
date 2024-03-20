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
        <section className="sticky left-0 top-0 z-50 hidden h-dvh min-w-60 md:block">
            <nav className="flex size-full flex-col items-center justify-between bg-primary-black px-2 py-4">
                <Link className="flex items-center" href="/">
                    <Image
                        className="size-12"
                        src={Birdie}
                        alt="SwiftForm logo"
                    />
                    <p>SwiftForm</p>
                </Link>
                <FormsList formId={currentFormId} />
                <div className="grid w-full gap-2">
                    {/* <NotificationButton /> */}
                    <ProfileButton />
                    <LogoutButton />
                </div>
            </nav>
        </section>
    );
}
