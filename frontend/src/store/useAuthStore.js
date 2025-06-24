import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isLoggingIn: false,
  isSignUp: false,
  isUpdatingProfile: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("AUTH", res);
      set({ authUser: res.data });
    } catch (err) {
      set({ authUser: null });
      console.log("Error in checkAuth: ", err);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSignUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      console.log("sigup succesfully");
      set({ authUser: res.data });
    } catch (err) {
      console.log("Error sign up: ", err);
    } finally {
      set({ isSignUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
    } catch (err) {
      console.log("Error logging out", err);
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      console.log("Sing In succesfully");
      set({ authUser: res.data });
    } catch (err) {
      console.log("Error logging in", err);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
