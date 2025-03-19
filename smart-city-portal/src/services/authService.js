import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (email, password) => {
  return await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
};

export const register = async (name, email, password) => {
  return await axios.post(`${API_BASE_URL}/api/auth/register`, { name, email, password });
};