import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const NotificationButton = () => {
    return (
        <div>
            <button
                className={`p-4 hover:bg-primary-secondary`}
            >
                <NotificationsOutlinedIcon />
            </button>
            <div
                className={`absolute left-0 top-full w-full bg-primary-secondary p-2`}
            >
                <h1 className="p-2">No Notifications</h1>
            </div>
        </div>
    );
};

export default NotificationButton;
