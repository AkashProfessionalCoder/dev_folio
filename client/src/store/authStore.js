import { create } from "zustand";
import api from "../services/api";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: true,

  setAuth: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token, loading: false });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, loading: false });
  },

  fetchUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ loading: false });
      return;
    }
    try {
      const { data } = await api.get("/auth/me");
      set({ user: data.user, loading: false });
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null, loading: false });
    }
  },

  updateProfile: async (updates) => {
    const { data } = await api.patch("/auth/me", updates);
    set({ user: data.user });
  },
}));

export default useAuthStore;
