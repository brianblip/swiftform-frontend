import Link from 'next/link';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function TopBar() {
    return (
        <nav className="flex justify-between items-center md:hidden">
            <button className="p-4">
                <NotificationsOutlinedIcon />
            </button>

            <Link className="" href="/">
                <p>LOGO</p>
            </Link>

            <div>
                <button className="p-4">
                    <MenuIcon />
                </button>
                    <div className='bg-primary-black h-screen w-3/4 absolute right-0 top-0'>
                        <button className='absolute top-0 right-full p-4'>
                            <CloseIcon />
                        </button>
                        <button className="w-full p-2">
                            <PermIdentityOutlinedIcon />
                            <p>My Account</p>
                        </button>
                        <button className="w-full p-2">
                            <LogoutOutlinedIcon />
                            <p>Log out</p>
                        </button>
                    </div>
            </div>
        </nav>
    );
}