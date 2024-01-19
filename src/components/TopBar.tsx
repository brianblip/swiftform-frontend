import Link from 'next/link';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuIcon from '@mui/icons-material/Menu';

export default function TopBar() {
    return (
        <nav className="flex justify-between items-center p-1 md:hidden">
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
                    </div>
            </div>
        </nav>
    );
}