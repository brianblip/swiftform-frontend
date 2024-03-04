"use client";

import { createContext, ReactNode, useContext, useEffect } from "react";
import useSWR from "swr";
import api from "@/services/api";
import { User } from "@@/types";
import { createStore, StoreApi } from "zustand";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher } from "@/utils";

type AuthState = {
    user?: User | null;
    isLoading: boolean;
    error: Error | null;
    login: (props: LoginProps) => Promise<User>;
    logout: () => Promise<void>;
    register: (props: RegisterProps) => Promise<User>;
};

interface RegisterProps extends Omit<User, "id"> {
    password: string;
}

interface LoginProps extends Pick<User, "email"> {
    password: string;
}

const useAuthStore = () => {
    const {
        data: user,
        isLoading,
        error,
        mutate,
    } = useSWR<User | null>(`/users/me`, fetcher);

    return createStore<AuthState>((set) => ({
        user,
        isLoading,
        error,

        /**
         * Sends login request
         */
        login: async ({ email, password }: LoginProps) => {
            const { data } = await api.post("/auth/login", {
                email,
                password,
            });

            const user = data.data;
            await mutate(user);

            return data;
        },

        /**
         * Sends logout request and invalidates user store
         */
        logout: async () => {
            const { data } = await api.post("/auth/logout");

            await mutate(null);

            return data;
        },

        /**
         * Sends registration request
         */
        register: async ({
            name,
            email,
            password,
            avatar_url,
        }: RegisterProps) => {
            const { data } = await api.post("/auth/register", {
                name,
                email,
                password,
                avatar_url,
            });

            const newUser = data.data;
            await mutate(newUser);

            return data;
        },
    }));
};

export const AuthContext =
    createContext<() => StoreApi<AuthState>>(useAuthStore);

export function AuthProvider({ children }: { children: ReactNode }) {
    return (
        <AuthContext.Provider value={useAuthStore}>
            {children}
        </AuthContext.Provider>
    );
}

export function ProtectRoute({ children }: { children: ReactNode }) {
    const { user, isLoading: isAuthLoading, error: authError } = useAuth();
    const [protectRouteLoading, setProtectRouteLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (isAuthLoading) return;

        // if auth is not loading and user is not present, redirect to login
        if (!user) {
            router.push("/login");
        } else {
            setProtectRouteLoading(false);
        }
    }, [isAuthLoading, router, user]);

    return (
        <ErrorBoundary isLoading={protectRouteLoading} error={authError}>
            {children}
        </ErrorBoundary>
    );
}

const useAuth = () => useContext(AuthContext)().getState();

export default useAuth;
