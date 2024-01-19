import Link from 'next/link';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuIcon from '@mui/icons-material/Menu';

export default function TopBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    /* function for opening and closing mobile menu */
    function onClickOpenMenu() {
        setIsMenuOpen(true);
    };

    function onClickCloseMenu() {
        setIsMenuOpen(false);
    }

    /* function for toggling the notification panel */
    function onClickToggleNotification() {
        setIsNotificationOpen(!isNotificationOpen);
    }

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
            </div>
        </nav>
    );
}