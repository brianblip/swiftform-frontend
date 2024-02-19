"use client";

import { createContext, ReactNode, useEffect } from "react";
import useSWR from "swr";
import api from "@/services/api";
import { User } from "@@/types";
import { usePathname, useRouter } from "next/navigation";
import { createStore, StoreApi } from "zustand";

type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    stopLoading: () => void;
    initialize: (props: InitializeProps) => void;
    login: (props: LoginProps) => Promise<User>;
    logout: () => Promise<void>;
    register: (props: RegisterProps) => Promise<User>;
};

interface InitializeProps {
    user?: User | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

interface RegisterProps extends Omit<User, "id"> {
    password: string;
}

interface LoginProps extends Pick<User, "email"> {
    password: string;
}

const useAuthStore = () => {
    return createStore<AuthState>((set) => ({
        user: null,
        isAuthenticated: false,
        isLoading: true,

        initialize: (props: InitializeProps) => {
            set((state) => ({
                ...state,
                ...props,
            }));
        },

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
                isAuthenticated: true,
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

        /**
         * Sets loading state to false
         */
        stopLoading: () => {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        },
    }));
};

export const AuthContext =
    createContext<() => StoreApi<AuthState>>(useAuthStore);

export function AuthProvider({ children }: { children: ReactNode }) {
    const fetcher = async (url: string) => {
        const { data } = await api.get(url);
        return data.data || data;
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
