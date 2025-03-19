import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Alert, Modal, Stack } from "@mui/material";

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post("/api/auth/register", { name, email, password });
      setShowOtpModal(true);
      setMessage("OTP sent to your email. Please check your inbox.");
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post("/api/auth/verify-otp", { email, otp });
      setUser(response.data.user);
      navigate("/dashboard");
      setMessage("OTP verified successfully. Registration completed.");
    } catch (error) {
      setError("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: { xs: 2, sm: 5 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" align="center" mb={3}>
          Register
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} mb={3}>
            <TextField 
              fullWidth
              label="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
            <TextField 
              fullWidth
              label="Email" 
              type="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <TextField 
              fullWidth
              label="Password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </Stack>
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </Button>
        </form>
      </Box>

      <Modal 
        open={showOtpModal} 
        onClose={() => setShowOtpModal(false)}
        aria-labelledby="otp-modal-title"
      >
        <Box 
          sx={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="otp-modal-title" variant="h6" component="h2" mb={2}>
            Enter OTP
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}
          <Stack spacing={2}>
            <TextField 
              fullWidth
              label="OTP" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              required 
            />
            <Button 
              variant="contained"
              onClick={handleVerifyOtp} 
              disabled={loading}
              fullWidth
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default Register;