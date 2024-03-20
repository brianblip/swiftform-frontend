import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import useAuth from "@/contexts/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

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
        return (
            <Button disabled variant="navbar" size="sm">
                <LogoutOutlinedIcon />
                <p>Logging out...</p>
            </Button>
        );
    }
    return (
        <Button
            onClick={handleLogout}
            disabled={isLoggedOut}
            variant="navbar"
            size="sm"
            className="p-2"
        >
            <LogoutOutlinedIcon />
            <p>Log out</p>
        </Button>
    );
};

export default LogoutButton;
