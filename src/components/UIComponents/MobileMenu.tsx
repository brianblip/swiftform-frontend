import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FormsList from "../FormsList";
import ProfileButton from "./ProfileButton";
import LogoutButton from "./LogoutButton";

const MobileMenu = () => {
    const pathname = usePathname();
    // Extract form ID from the pathname
    const currentFormId = Number(pathname.split("/Form/")[1]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const parentRef = useRef<HTMLDivElement>(null);

    function onToggleOpenMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    function onClickCloseMenu() {
        setIsMenuOpen(false);
    }

    useEffect(() => {
        function handleCloseMenu(e: MouseEvent) {
            if (
                parentRef.current &&
                !parentRef.current.contains(e.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        }

        if (isMenuOpen) {
            window.addEventListener("click", handleCloseMenu);
        } else {
            window.removeEventListener("click", handleCloseMenu);
        }

        return () => {
            window.removeEventListener("click", handleCloseMenu);
        };
    }, [isMenuOpen]);

    return (
        <div ref={parentRef}>
            <button
                onClick={onToggleOpenMenu}
                className={`p-4 hover:bg-primary-secondary ${isMenuOpen ? "bg-primary-secondary" : ""}`}
            >
                <MenuIcon />
            </button>
            <div
                className={`absolute top-0 flex h-screen w-3/4 flex-col justify-end bg-primary-black p-2 ${isMenuOpen ? "right-0" : "right-full"}`}
            >
                <button
                    onClick={onClickCloseMenu}
                    className="absolute right-full top-0 m-2 p-2 hover:bg-primary-secondary"
                >
                    <CloseIcon />
                </button>
                <div className="flex size-full flex-col justify-between gap-2">
                    <FormsList formId={currentFormId} />
                    <div className="flex flex-col gap-2">
                        <ProfileButton />
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
