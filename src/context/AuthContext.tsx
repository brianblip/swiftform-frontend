"use client";

import { createContext, ReactNode, useEffect } from "react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { User } from "@/types/user";
import useAuth from "@/store/useAuth";
import { useRouter, usePathname } from "next/navigation";

export const AuthContext = createContext(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { data: userData, error: userError } = useSWR<User>(
        `/users/me`,
        fetcher,
    );

    const { initialize } = useAuth();

    useEffect(() => {
        if (userData) {
            initialize({
                user: userData,
                isLoading: false,
                error: null,
                isAuthenticated: true,
            });
        }
    }, [userData, initialize]);

    if (!userData && !userError) {
        return <div>Loading...</div>;
    }

    if (userError) {
        console.error("Error fetching user data", userError);
        const pathname = usePathname();
        if (pathname !== "/Register") {
            router.push("/Login");
        }
    }

    return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

export default AuthContext;
