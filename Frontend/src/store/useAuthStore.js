import { create } from "zustand";

export const useAuthStore = create((set) => ({
  // 1. Initial State values
  user: null,
  isAuthenticated: false,

  // 2. Action functions to modify state fields
  setAuth: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
