"use client";

import { createContext, ReactNode, useEffect } from "react";
import useSWR from "swr";
import api from "@/lib/api";
import { User } from "@@/types";
import useAuth from "@/store/auth";
import { useRouter } from "next/navigation";

export const AuthContext = createContext(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();

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

    if (!data && !error) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error("Error fetching user data", error);
        router.push("/login");
    }

    return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

export default AuthContext;
