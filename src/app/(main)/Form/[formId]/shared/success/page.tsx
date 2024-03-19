import React from "react";
import Link from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SuccessPage = () => {
    return (
        <div className="flex w-full flex-col items-center justify-center bg-gray-100">
            <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-lg">
                <div className="mb-6 flex items-center justify-center">
                    <CheckCircleIcon className="text-7xl text-green-500" />
                </div>
                <h1 className="mb-4 text-center text-3xl font-bold text-green-700">
                    Thank You!
                </h1>
                <p className="mb-8 text-center text-gray-800 ">
                    Your response has been submitted.
                </p>
                <div className="mb-6 flex justify-center">
                    <Link
                        href="/"
                        className="rounded bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-900"
                    >
                        Go to Home
                    </Link>
                </div>
                <p className="text-center text-sm text-gray-500">
                    SwiftForm - Effortless Form Creation
                </p>
            </div>
        </div>
    );
};

export default SuccessPage;
