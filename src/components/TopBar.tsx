export default function TopBar() {
    return (
        <nav className="flex justify-between items-center p-1 md:hidden">
            <button className="p-4">
                <NotificationsIcon />
            </button>

            <Link className="" href="/">
                <p>LOGO</p>
            </Link>

            <button className="p-4">
                <MenuIcon />
            </button>
        </nav>
    );
}