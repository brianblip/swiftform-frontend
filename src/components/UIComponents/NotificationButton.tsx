import { useEffect, useRef, useState } from "react";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Button from "./Button";

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
        <section className="md:relative" ref={parentRef}>
            <Button
                size="navbar"
                variant="navbar"
                className={`${isNotificationOpen ? "bg-primary-secondary" : ""} block rounded-none md:flex md:rounded`}
                onClick={onClickToggleNotification}
            >
                <NotificationsOutlinedIcon />
                <p className="hidden md:block">Notification</p>
            </Button>
            <div
                className={`absolute -z-10 flex max-h-40 w-full flex-col overflow-scroll bg-primary-secondary p-2 shadow-2xl transition md:bottom-0 md:left-[calc(100%+theme(spacing.4))] md:rounded ${isNotificationOpen ? "translate-y-0" : "-translate-y-full md:translate-x-[-105%] md:translate-y-0"}`}
            >
                <h1 className="p-2">No Notifications</h1>
            </div>
        </section>
    );
};

export default NotificationButton;
