import { create } from "zustand";
import { User } from "@/types/user";
import axios from "@/lib/axios";

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

interface AuthState {
    user?: User | null;
    isLoading: boolean;
    error: string | null;
    initialize: (props: InitializeProps) => void;
    login: (props: LoginProps) => Promise<User>;
    logout: () => Promise<void>;
    register: ({
        name,
        email,
        password,
        avatar_url,
    }: RegisterProps) => Promise<User>;
}

const useAuth = create<AuthState>((set) => ({
    user: null,
    isLoading: false,
    error: null,
    initialize: ({ user, isLoading, error }: InitializeProps) => {
        set({ user, isLoading, error });
    },
    login: async ({ email, password }) => {
        const response = await axios.post<User>("/auth/login", {
            email,
            password,
        });

        set({ user: response.data });

        return response.data;
    },
    logout: async () => {
        const response = await axios.post("/auth/logout");

        set({ user: null });
        return response.data;
    },
    register: async ({ name, email, password, avatar_url }) => {
        const response = await axios.post<User>("/auth/register", {
            name,
            email,
            password,
            avatar_url,
        });

        set({ user: response.data });

        return response.data;
    },
}));

export default useAuth;
