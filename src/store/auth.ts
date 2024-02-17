import api from "@/lib/api";
import { create } from "zustand";
import { createSelectorHooks } from "auto-zustand-selectors-hook";
import { User } from "@@/types";

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

const useAuthStoreBase = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    initialize: ({
        user,
        isLoading,
        error,
        isAuthenticated,
    }: InitializeProps) => {
        set((state) => ({
            ...state,
            user,
            isLoading,
            error,
            isAuthenticated,
        }));
    },
    login: async ({ email, password }: LoginProps) => {
        try {
            // Perform login logic, e.g., axios request
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
        } catch (error) {
            console.error("Error logging in", error);
            throw error; // Propagate the error to the caller
        }
    },
    logout: async () => {
        try {
            const response = await api.post("/auth/logout");

            set({ user: null });
            return response.data;
        } catch (error) {
            console.error("Error logging out", error);
            throw error; // Propagate the error to the caller
        }
    },
    register: async ({ name, email, password, avatar_url }: RegisterProps) => {
        try {
            // Perform registration logic, e.g., axios request
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
        } catch (error) {
            console.error("Error registering", error);
            throw error; // Propagate the error to the caller
        }
    },
    stopLoading: () => {
        set((state) => ({
            ...state,
            isLoading: false,
        }));
    },
}));

const useAuthStore = createSelectorHooks(useAuthStoreBase);

export default useAuthStore;
