import React, { useState, useContext, useEffect } from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/api"; // Ensure you have API setup
import "../styles/User.css";

const User = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  useEffect(() => {
    // Sync form data when user updates
    if (user) {
      setFormData({ name: user.name, email: user.email, password: "" });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await API.put("/user/update", formData, { withCredentials: true });
      setUser(response.data.user); // Update Auth Context
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      alert("Failed to update profile.");
    }
  };

  return (
    <Container className="user-container">
      <Paper className="user-card">
        <Typography variant="h4">User Profile</Typography>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="New Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Profile
        </Button>
      </Paper>
    </Container>
  );
};

export default User;
