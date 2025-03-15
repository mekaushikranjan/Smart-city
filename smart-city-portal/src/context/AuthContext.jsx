import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/checkSession`, {
        withCredentials: true,
        timeout: 5000,
      });

      if (response.data.isAuthenticated) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check error:", error?.response?.data || error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error?.response?.data || error.message);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; // ✅ Make sure this line exists!
