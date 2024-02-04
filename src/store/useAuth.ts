import { create } from "zustand";
import { User } from "@/types/user";

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
}

const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  initialize: ({ user, isLoading, error }: InitializeProps) => {
    set({ user, isLoading, error });
  },
}));

export default useAuth;
