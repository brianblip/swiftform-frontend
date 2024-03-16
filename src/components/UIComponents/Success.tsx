import React from "react";
import CloseIcon from "@mui/icons-material/Close";

interface SuccessComponentProps {
    onClose: () => void;
}

const SuccessComponent: React.FC<SuccessComponentProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-green-700">
                        Success!
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="mb-6 flex items-center">
                    <div className="mr-4 rounded-full bg-green-200 p-2">
                        <svg
                            className="size-6 text-green-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                    </div>
                    <p className="text-gray-700">
                        Your answer has been submitted successfully.
                    </p>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessComponent;
