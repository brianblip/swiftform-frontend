"use client";

import { createContext, ReactNode, useContext } from "react";
import useSWR from "swr";
import api from "@/services/api";
import { User } from "@@/types";
import { createStore, StoreApi } from "zustand";

type AuthState = {
    user?: User | null;
    isLoading: boolean;
    error: Error | null;
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

const useAuth = () => useContext(AuthContext)().getInitialState();

export default useAuth;
