import React from "react";
import Link from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Main from "@/components/UIComponents/Main";

const SuccessPage = () => {
    return (
        <Main>
            <section className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                    <CheckCircleIcon className="text-7xl text-green-500" />
                    <h1 className="text-5xl font-bold text-green-500">
                        Thank You!
                    </h1>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-center">
                        Your response has been submitted.
                    </p>
                    <Link
                        href="/"
                        className="mb-4 w-fit rounded bg-green-700 px-3 py-2 font-bold hover:bg-green-900"
                    >
                        Go to Home
                    </Link>
                    <p className="text-center text-sm">
                        SwiftForm - Effortless Form Creation
                    </p>
                </div>
            </section>
        </Main>
    );
};

export default SuccessPage;
