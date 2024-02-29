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
            document.addEventListener("click", onClickCloseNotification);
        } else {
            document.removeEventListener("click", onClickCloseNotification);
        }

        return function () {
            document.removeEventListener("click", onClickCloseNotification);
        };
    }, [isNotificationOpen]);

    return (
        <div className="md:relative md:flex md:items-center" ref={parentRef}>
            <button
                onClick={onClickToggleNotification}
                className={`p-4 hover:bg-primary-secondary md:flex md:w-full md:gap-2 md:p-2 ${isNotificationOpen ? "bg-primary-secondary" : ""}`}
            >
                <NotificationsOutlinedIcon />
                <p className="hidden md:block">Notification</p>
            </button>
            <div
                className={`absolute w-full bg-primary-secondary p-2 md:bottom-0 md:left-[calc(100%+theme(spacing.4))] md:flex md:max-h-40 md:w-full md:flex-col md:overflow-y-auto ${isNotificationOpen ? "scale-100" : "scale-0"} `}
            >
                <h1 className="p-2">No Notifications</h1>
            </div>
        </div>
    );
};

export default NotificationButton;
