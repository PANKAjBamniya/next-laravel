import { create } from "zustand";
import { loginUser, registerUser } from "../services/auth";

// Get user from sessionStorage on initialization
const sessionUser = JSON.parse(sessionStorage.getItem("user"))?.state?.user;

const useUserStore = create((set) => ({
  user: sessionUser || null,
  isAuthenticated: !!sessionUser, // Convert to boolean

  // Login action
  login: async (formData) => {
    try {
      const response = await loginUser(formData); // API call for login
      set({ user: response.user, isAuthenticated: true });
      sessionStorage.setItem("user", JSON.stringify(response.user)); // Save to sessionStorage
    } catch (error) {
      console.error("Login error:", error);
    }
  },

  // Register action
  register: async (formData) => {
    try {
      const response = await registerUser(formData); // API call for registration
      set({ user: response.user, isAuthenticated: true });
      sessionStorage.setItem("user", JSON.stringify(response.user)); // Save to sessionStorage
    } catch (error) {
      console.error("Registration error:", error);
    }
  },

  // Logout action
  logout: () => {
    set({ user: null, isAuthenticated: false });
    sessionStorage.removeItem("user"); // Clear sessionStorage on logout
  },

  // Set user from sessionStorage on app load
  setUserFromSessionStorage: () => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      set({ user: storedUser, isAuthenticated: true });
    }
  },
}));

export default useUserStore;
