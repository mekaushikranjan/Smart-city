import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert, Card, Divider, Modal, Stack } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = isLogin
        ? await axios.post("/api/auth/login", { email, password })
        : await axios.post("/api/auth/register", { name, email, password });

      if (isLogin) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        navigate("/dashboard");
      } else {
        setShowOtpModal(true);
        setMessage("OTP sent to your email. Please check your inbox.");
      }
    } catch (err) {
      const errMsg =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : isLogin
          ? "Login failed. Please check your credentials."
          : "Registration failed. Please check your details.";
      setError(errMsg);
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
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
      setMessage("OTP verified successfully. Registration completed.");
    } catch (error) {
      setError("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Implement social login logic here
    console.log(`Login with ${provider}`);
    // This would typically redirect to OAuth provider
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: { xs: 2, sm: 5 },
      }}
    >
      <Card
        variant="outlined"
        sx={{
          px: { xs: 3, sm: 5 },
          py: 5,
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Box sx={{ textAlign: "center", mt: 5, mb: 2 }}>
          <Typography component="h1" variant="h4" sx={{ mt: 1 }}>
            {isLogin ? "Login" : "Register"}
          </Typography>
        </Box>
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
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {!isLogin && (
            <TextField
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading} variant="contained">
            {loading ? "Loading..." : isLogin ? "Login" : "Register"}
          </Button>
        </form>
        <Divider sx={{ my: 2 }}>OR</Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{ textTransform: "none" }}
            onClick={() => handleSocialLogin("Google")}
          >
            Continue with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FacebookIcon />}
            sx={{ textTransform: "none" }}
            onClick={() => handleSocialLogin("Facebook")}
          >
            Continue with Facebook
          </Button>
        </Box>
        <Button
          fullWidth
          variant="text"
          sx={{ mt: 2 }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </Button>
      </Card>

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

export default Auth;
