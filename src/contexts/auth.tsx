"use client";

import { createContext, ReactNode, useEffect } from "react";
import useSWR from "swr";
import api from "@/services/api";
import { User } from "@@/types";
import { usePathname, useRouter } from "next/navigation";
import { createStore, StoreApi } from "zustand";

type AuthState = {
    user?: User | null;
    isLoading: boolean;
    error: string | null;
    login: (props: LoginProps) => Promise<User>;
    logout: () => Promise<void>;
    register: (props: RegisterProps) => Promise<User>;
};

interface InitializeProps {
    user?: User | null;
    isLoading: boolean;
    error: string | null;
}

interface RegisterProps extends Omit<User, "id"> {
    password: string;
}

interface LoginProps extends Pick<User, "email"> {
    password: string;
}

const useAuthStore = () => {
    const fetcher = async (url: string) => {
        const { data } = await api.get(url);
        return data.data || data;
    };

    const { data: user, isLoading, error } = useSWR<User>(`/users/me`, fetcher);

    return createStore<AuthState>((set) => ({
        user,
        isLoading,
        error,

        /**
         * Sends login request
         */
        login: async ({ email, password }: LoginProps) => {
            const response = await api.post("/auth/login", {
                email,
                password,
            });
            const user = response.data;

            set((state) => ({
                ...state,
                user,
            }));

            return user;
        },

        /**
         * Sends logout request and invalidates user store
         */
        logout: async () => {
            const response = await api.post("/auth/logout");

            set({ user: null });
            return response.data;
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
            const response = await api.post("/auth/register", {
                name,
                email,
                password,
                avatar_url,
            });
            const user = response.data;

            set((state) => ({
                ...state,
                isAuthenticated: true,
                user,
            }));

            return user;
        },
    }));
};

export const AuthContext =
    createContext<() => StoreApi<AuthState>>(useAuthStore);

export function AuthProvider({ children }: { children: ReactNode }) {
    return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

export default AuthContext;
