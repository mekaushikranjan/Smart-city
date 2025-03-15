import React, { useState, useContext } from "react";
import { Container, TextField, Button, Avatar, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import "../styles/Profile.css";

const UserProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");

  const handleSave = async () => {
    const updatedUser = { ...user, name, profilePic };
    setUser(updatedUser);

    // Save to backend (Replace with real API)
    await fetch("http://localhost:5000/api/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    alert("Profile updated successfully!");
  };

  return (
    <Container className="profile-container">
      <Typography variant="h4">Edit Profile</Typography>
      <Avatar
        src={profilePic || "https://via.placeholder.com/150"}
        alt="Profile Picture"
        className="profile-avatar"
      />
      <TextField
        label="Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="profile-input"
      />
      <TextField
        label="Profile Picture URL"
        fullWidth
        value={profilePic}
        onChange={(e) => setProfilePic(e.target.value)}
        className="profile-input"
      />
      <Button variant="contained" className="save-btn" onClick={handleSave}>
        Save Changes
      </Button>
    </Container>
  );
};

export default UserProfile;
