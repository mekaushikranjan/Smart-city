import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { login as loginService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Alert, Modal } from "@mui/material";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginService(email, password);
      setShowOtpModal(true);
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/verify-otp", { email, otp });
      setUser(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      setError("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" disabled={loading}>{loading ? "Loading..." : "Login"}</Button>
      </form>

      <Modal open={showOtpModal} onClose={() => setShowOtpModal(false)}>
        <Box>
          <Typography variant="h6">Enter OTP</Typography>
          <TextField label="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <Button onClick={handleVerifyOtp} disabled={loading}>{loading ? "Loading..." : "Verify OTP"}</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Login;