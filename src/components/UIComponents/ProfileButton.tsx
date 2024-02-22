import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Link from "next/link";

const ProfileButton = () => {
    return (
        <div>
            <button
                className={`flex w-full gap-2 p-2 hover:bg-primary-secondary`}
            >
                <PermIdentityOutlinedIcon />
                <p>My Account</p>
            </button>
            <div
                className={`absolute bottom-full mb-2 w-full flex-col items-start bg-primary-secondary p-2`}
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
