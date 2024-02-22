import { useEffect, useRef, useState } from "react";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const NotificationButton = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const parentRef = useRef<HTMLDivElement>(null);

    function onClickToggleNotification() {
        setIsNotificationOpen(!isNotificationOpen);
    }

    useEffect(() => {
        function onClickCloseNotification(e: MouseEvent) {
            if (
                parentRef.current &&
                !parentRef.current.contains(e.target as Node)
            ) {
                setIsNotificationOpen(false);
            }
        }

        if (isNotificationOpen) {
            window.addEventListener("click", onClickCloseNotification);
        } else {
            window.removeEventListener("click", onClickCloseNotification);
        }

        return function () {
            window.removeEventListener("click", onClickCloseNotification);
        };
    }, [isNotificationOpen]);

    return (
        <div ref={parentRef}>
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
