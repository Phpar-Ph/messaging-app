import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isLoggingIn: false,
  isSignUp: false,
  isUpadatingProfile: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
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
      const res = await axiosInstance.post("/auth/signup", data);
      console.log("sigup succesfully");
      set({ authUser: res.data });
    } catch (err) {
      console.log("Error sign up: ", err);
    } finally {
      set({ isSignUp: false });
    }
  },
}));
