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

interface AuthState {
  user?: User | null;
  isLoading: boolean;
  error: string | null;
  initialize: (props: InitializeProps) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: ({
    name,
    email,
    password,
    avatar_url,
  }: RegisterProps) => Promise<void>;
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
  logout: async () => {
    const response = await axios.post("/auth/logout");

    return response.data;
  },
  register: async ({ name, email, password, avatar_url }) => {
    const response = await axios.post("/auth/register", {
      name,
      email,
      password,
      avatar_url,
    });

    return response.data;
  },
}));

export default useAuth;
