import React from "react";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "../globals.css";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/SideBar";
import { AuthProvider, ProtectRoute } from "@/contexts/auth";
import { FormProvider } from "@/contexts/forms";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SwiftForm",
    description: "AI Integrated Form Builder",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${sora.className} relative overflow-hidden bg-primary-neutral text-primary-white md:flex`}
            >
                <ProtectRoute>
                    <AuthProvider>
                        <FormProvider>
                            <TopBar />
                            <Sidebar />
                            {children}
                        </FormProvider>
                    </AuthProvider>
                </ProtectRoute>
                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </body>
        </html>
    );
}
