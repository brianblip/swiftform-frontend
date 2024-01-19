export default function SideBar() {
  return (
    <nav className="hidden h-screen w-60 flex-col items-center p-4 md:flex">
      <Link className="" href="/">
        <p>LOGO</p>
      </Link>
      <button className="w-full p-2">
        <NotificationsOutlinedIcon />
        <p>Notification</p>
      </button>
      <button className="w-full p-2">
        <PermIdentityOutlinedIcon />
        <p>My Account</p>
      </button>
      <button className="w-full p-2">
        <LogoutOutlinedIcon />
        <p>Log out</p>
      </button>
    </nav>
  );
}
