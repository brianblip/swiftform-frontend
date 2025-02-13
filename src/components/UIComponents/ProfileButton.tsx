import { useEffect, useRef, useState } from "react";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Link from "next/link";
import Button from "./Button";

const ProfileButton = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    function onClickToggleProfile() {
        setIsProfileOpen(!isProfileOpen);
    }

    useEffect(() => {
        function handleCloseProfile(e: MouseEvent) {
            if (
                profileRef.current &&
                !profileRef.current.contains(e.target as Node)
            ) {
                setIsProfileOpen(false);
            }
        }

        if (isProfileOpen) {
            document.addEventListener("click", handleCloseProfile);
        } else {
            document.removeEventListener("click", handleCloseProfile);
        }

        return () => {
            document.removeEventListener("click", handleCloseProfile);
        };
    }, [isProfileOpen]);

    return (
        <div ref={profileRef} className="relative md:flex md:items-center">
            <Button
                variant="navbar"
                size="sm"
                onClick={onClickToggleProfile}
                className={`${isProfileOpen ? "bg-primary-secondary" : ""} p-2`}
            >
                <PermIdentityOutlinedIcon />
                <p>My Account</p>
            </Button>
            <div
                className={`absolute bottom-full mb-2 flex w-full origin-bottom flex-col items-start rounded bg-primary-secondary p-2 shadow-2xl transition md:bottom-auto md:left-[calc(100%+theme(spacing.4))] md:-z-50 md:mb-0 md:flex md:max-h-40 md:overflow-y-auto ${isProfileOpen ? "md:translate-x-0" : "scale-0 md:translate-x-[-105%] md:scale-100"}`}
            >
                <Link
                    href="/profile"
                    className="w-full rounded p-2 text-start transition hover:bg-primary-neutral"
                >
                    Edit Profile
                </Link>
            </div>
        </div>
    );
};

export default ProfileButton;
