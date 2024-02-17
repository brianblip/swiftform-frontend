"use client";

import { createContext, ReactNode, useEffect } from "react";
import useSWR from "swr";
import api from "@/lib/api";
import { User } from "@@/types";
import useAuth from "@/store/auth";
import { usePathname, useRouter } from "next/navigation";

export const AuthContext = createContext(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const fetcher = async (url: string) => {
        const { data } = await api.get(url);
        return data;
    };

    const { data, error } = useSWR<User>(`/users/me`, fetcher);

    const { initialize } = useAuth();

    useEffect(() => {
        if (data) {
            initialize({
                user: data,
                isLoading: false,
                error: null,
                isAuthenticated: true,
            });
        }
    }, [data, initialize]);

    return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

export default AuthContext;
