import { AxiosError } from "axios";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import { ReactNode } from "react";

interface ErrorBoundaryProps {
    error: AxiosError | Error | null;
    isLoading: boolean;
    children: ReactNode;
}

export default function ErrorBoundary({
    error,
    isLoading,
    children,
}: ErrorBoundaryProps) {
    if (error) {
        return <ErrorPage />;
    }

    if (isLoading) return <LoadingPage />;

    return <>{children}</>;
}
