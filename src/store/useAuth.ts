import { create } from "zustand";
import { User } from "@/types/user";
import axios from "@/lib/axios";

interface InitializeProps {
  user?: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthState {
  user?: User | null;
  isLoading: boolean;
  error: string | null;
  initialize: (props: InitializeProps) => void;
  login: (email: string, password: string) => Promise<void>;
}

const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  initialize: ({ user, isLoading, error }: InitializeProps) => {
    set({ user, isLoading, error });
  },
  login: async (email, password) => {
    const response = await axios.post("/auth/login", { email, password });

    return response.data;
  },
}));

export default useAuth;
