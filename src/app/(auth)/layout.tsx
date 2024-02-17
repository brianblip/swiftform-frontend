import React from "react";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/context/auth";

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
                className={`${sora.className} bg-primary-neutral text-primary-white md:flex`}
            >
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
