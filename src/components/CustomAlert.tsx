"use client";

import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";

export default function CustomAlert() {
    const [isAlertVisible, setIsAlertVisible] = useState(Boolean);

    function onClickCloseAlert() {
        setIsAlertVisible(false);
    }

    return (
        isAlertVisible && (
            <section
                className={`absolute bottom-4 right-4 flex max-h-16 min-w-48 max-w-[328px] gap-2 rounded p-4 text-primary-black`}
            >
                <button
                    onClick={onClickCloseAlert}
                    className={`absolute right-0.5 top-0.5 grid place-items-center rounded hover:bg-primary-black/10`}
                >
                    <CloseIcon className="text-sm" />
                </button>
                    <CheckCircleIcon className="text-green-500" />
                    <CancelIcon className=" text-primary-white" />
                <div className="flex gap-2 overflow-x-scroll whitespace-nowrap">
                    <h1 className={`font-semibold`}>
                        Custom Alert
                    </h1>
                </div>
            </section>
        )
    );
}
