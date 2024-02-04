import { createContext, ReactNode } from "react";

import useSWR from "swr";
import fetcher from "@/utils/fetcher";

interface User {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
}

type AuthContextType = {
  user: User | undefined;
  isLoading: boolean;
  error: unknown;
};

const defaultAuthContext = {
  user: undefined,
  isLoading: false,
  error: undefined,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, error } = useSWR<User>(`/users/me`, fetcher);

  return (
    <AuthContext.Provider
      value={{
        user: data,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
