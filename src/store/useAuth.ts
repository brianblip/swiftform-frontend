import { create } from "zustand";

const useAuth = create((set) => ({
  user: null,
}));

export default useAuth;
