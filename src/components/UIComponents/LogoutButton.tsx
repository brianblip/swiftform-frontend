import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import useAuth from "@/contexts/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const { logout } = useAuth();
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        setIsLoggedOut(true);
    };

    if (isLoggedOut) {
        router.push("/login"); // This will reload the current route
        return null; // Return null while reloading to avoid rendering the component
    }
    return (
        <button
            onClick={handleLogout}
            className={`flex w-full gap-2 rounded p-2 transition hover:bg-primary-secondary`}
        >
            <LogoutOutlinedIcon />
            <p>Log out</p>
        </button>
    );
};

export default LogoutButton;
