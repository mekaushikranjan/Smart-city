import React, { useState, useContext, useEffect } from "react";
import { Container, TextField, Button, Typography, Tabs, Tab, CircularProgress } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";

const Auth = () => {
  const { user, setUser, checkAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // API URL from environment variables
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080"; // Fallback for local testing

  // Check if user is already authenticated (helps on refresh)
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  // Reset error and input fields when switching tabs
  useEffect(() => {
    setError("");
    setCredentials({ name: "", email: "", password: "" });
  }, [tab]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password || (tab === 1 && !credentials.name)) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const endpoint = tab === 0 ? "login" : "register";
      const payload =
        tab === 1
          ? { name: credentials.name, email: credentials.email, password: credentials.password }
          : { email: credentials.email, password: credentials.password };

      const response = await axios.post(`${API_URL}/api/auth/${endpoint}`, payload, {
        withCredentials: true,
      });

      if (response.data.user) {
        setUser(response.data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="auth-container">
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} className="auth-tabs">
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      <Typography variant="h4" className="auth-title">
        {tab === 0 ? "Login" : "Register"}
      </Typography>
      {error && (
        <Typography variant="body1" color="error" className="auth-error">
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        {tab === 1 && (
          <TextField
            label="Name"
            fullWidth
            required
            value={credentials.name}
            onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
            className="auth-input"
          />
        )}
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          className="auth-input"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="auth-input"
        />
        <Button type="submit" variant="contained" className="auth-btn" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : tab === 0 ? "Login" : "Register"}
        </Button>
      </form>
    </Container>
  );
};

export default Auth;
