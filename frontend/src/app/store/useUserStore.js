import { create } from "zustand";
import { loginUser, registerUser } from "../services/auth";

// Create the store with initial empty values
const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  // Login action
  login: async (formData) => {
    try {
      const response = await loginUser(formData);
      set({ user: response.user, isAuthenticated: true });

      // Only access sessionStorage on the client
      if (typeof window !== "undefined") {
        sessionStorage.setItem("user", JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Register action
  register: async (formData) => {
    try {
      const response = await registerUser(formData);
      set({ user: response.user, isAuthenticated: true });

      // Only access sessionStorage on the client
      if (typeof window !== "undefined") {
        sessionStorage.setItem("user", JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  // Logout action
  logout: () => {
    set({ user: null, isAuthenticated: false });

    // Only access sessionStorage on the client
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("user");
    }
  },

  // Initialize user from session storage (call this in useEffect on client side)
  initializeFromStorage: () => {
    if (typeof window === "undefined") return false;

    try {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      if (storedUser) {
        set({ user: storedUser, isAuthenticated: true });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error retrieving user from sessionStorage:", error);
      return false;
    }
  },
}));

export default useUserStore;
