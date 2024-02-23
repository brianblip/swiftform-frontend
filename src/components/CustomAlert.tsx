"use client";

import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";

interface alertParams {
    message?: string;
    status: "success" | "error";
}

export default function CustomAlert({
    message,
    status = "success",
}: alertParams) {
    const [isAlertVisible, setIsAlertVisible] = useState(Boolean);

    useEffect(() => {
        if (message) {
            setIsAlertVisible(true);
        } else {
            setIsAlertVisible(false);
        }
        const timeoutId = setInterval(() => setIsAlertVisible(false), 5000);

        return () => clearInterval(timeoutId);
    }, [message]);

    function onClickCloseAlert() {
        setIsAlertVisible(false);
    }

    return (
        isAlertVisible && (
            <section
                className={`absolute bottom-4 right-4 flex max-h-16 min-w-48 max-w-[328px] gap-2 rounded p-4 text-primary-black ${status === "success" ? "bg-primary-white " : "bg-error"}`}
            >
                <button
                    onClick={onClickCloseAlert}
                    className={`absolute right-0.5 top-0.5 grid place-items-center rounded hover:bg-primary-black/10 ${status === "error" ? "text-primary-white" : ""}`}
                >
                    <CloseIcon className="text-sm" />
                </button>
                {status === "success" ? (
                    <CheckCircleIcon className="text-green-500" />
                ) : (
                    <CancelIcon className=" text-primary-white" />
                )}
                <div className="flex gap-2 overflow-x-scroll whitespace-nowrap">
                    <h1
                        className={`font-semibold ${status === "error" ? "text-primary-white" : ""}`}
                    >
                        {message}
                    </h1>
                </div>
            </section>
        )
    );
}
