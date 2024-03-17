import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FormsList from "../FormsList";
import ProfileButton from "./ProfileButton";
import LogoutButton from "./LogoutButton";
import Button from "./Button";

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
            document.addEventListener("click", handleCloseMenu);
        } else {
            document.removeEventListener("click", handleCloseMenu);
        }

        return () => {
            document.removeEventListener("click", handleCloseMenu);
        };
    }, [isMenuOpen]);

    return (
        <section ref={parentRef}>
            <Button
                size="navbar"
                variant="navbar"
                className={`${isMenuOpen ? "bg-primary-secondary" : ""} block rounded-none`}
                onClick={onToggleOpenMenu}
            >
                <MenuIcon />
            </Button>
            <aside
                className={`absolute right-0 top-0 flex h-screen w-[240px] flex-col justify-between bg-primary-black p-2 transition ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <Button
                    variant="navbar"
                    onClick={onClickCloseMenu}
                    className="w-fit self-end p-2"
                >
                    <CloseIcon />
                </Button>
                <FormsList formId={currentFormId} />
                <div className="grid gap-2">
                    <ProfileButton />
                    <LogoutButton />
                </div>
            </aside>
        </section>
    );
};

export default MobileMenu;
