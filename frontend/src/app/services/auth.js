import axios from "./axios";

// Register User
export const registerUser = async (formData) => {
  const response = await axios.post("/register", formData);
  return response.data;
};

// Login User
export const loginUser = async (formData) => {
  const response = await axios.post("/login", formData);
  return response.data;
};
