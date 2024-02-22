import { useEffect, useRef, useState } from "react";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Link from "next/link";

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
            window.addEventListener("click", handleCloseProfile);
        } else {
            window.removeEventListener("click", handleCloseProfile);
        }

        return () => {
            window.removeEventListener("click", handleCloseProfile);
        };
    }, [isProfileOpen]);

    return (
        <div ref={profileRef}>
            <button
                onClick={onClickToggleProfile}
                className={`flex w-full gap-2 p-2 hover:bg-primary-secondary ${isProfileOpen ? "bg-primary-secondary" : ""}`}
            >
                <PermIdentityOutlinedIcon />
                <p>My Account</p>
            </button>
            <div
                className={`absolute bottom-full mb-2 w-full flex-col items-start bg-primary-secondary p-2 ${isProfileOpen ? "flex" : "hidden"}`}
            >
                <Link
                    href="/profile"
                    className="w-full p-2 text-start hover:bg-primary-neutral"
                >
                    Edit Profile
                </Link>
            </div>
        </div>
    );
};

export default ProfileButton;
