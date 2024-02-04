"use client";

import { createContext, ReactNode } from "react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { User } from "@/types/user";
import useAuth from "@/store/useAuth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isLoading, error } = useSWR<{
    data: User;
  }>(`/users/me`, fetcher, {
    onSuccess: (response) => {
      const { data } = response;
      initialize({
        user: data,
        isLoading,
        error,
      });
    },
  });

  const { initialize } = useAuth();

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}
export default AuthContext;
