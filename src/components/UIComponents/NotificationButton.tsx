import { useState } from "react";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const NotificationButton = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    function onClickToggleNotification() {
        setIsNotificationOpen(!isNotificationOpen);
    }

    return (
        <div>
            <button
                onClick={onClickToggleNotification}
                className={`p-4 hover:bg-primary-secondary ${isNotificationOpen ? "bg-primary-secondary" : ""}`}
            >
                <NotificationsOutlinedIcon />
            </button>
            <div
                className={`absolute w-full bg-primary-secondary p-2 ${isNotificationOpen ? "scale-100" : "scale-0"} `}
            >
                <h1 className="p-2">No Notifications</h1>
            </div>
        </div>
    );
};

export default NotificationButton;
