import React, { useState, useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Drawer, IconButton, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar>
        <Typography variant="h6" className="navbar-title">
          Smart City Complaint Portal
        </Typography>
        <div className="nav-links">
          {!user || user.role !== "admin" ? (
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/about">
                About
              </Button>
              <Button color="inherit" component={Link} to="/services">
                Services
              </Button>
              <Button color="inherit" component={Link} to="/contact">
                Contact
              </Button>
            </>
          ) : (
            // For admin users, show the Admin Dashboard link
            <Button color="inherit" component={Link} to="/admindashboard">
              Admin Dashboard
            </Button>
          )}

          {!user ? (
            <Button color="inherit" component={Link} to="/auth">
              Login / Sign-up
            </Button>
          ) : (
            <Button color="inherit" onClick={() => setIsSidebarOpen(true)}>
              {user.role === "admin" ? "Admin" : "User"}
            </Button>
          )}
        </div>
      </Toolbar>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="right"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        className="user-sidebar"
      >
        <div className="sidebar-content">
          <IconButton className="close-btn" onClick={() => setIsSidebarOpen(false)}>
            <CloseIcon />
          </IconButton>
          <Avatar
            src={user?.profilePic || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="user-avatar"
          />
          <Typography variant="h6" className="user-name">
            {user?.name}
          </Typography>
          <Button
            variant="contained"
            className="settings-btn"
            onClick={() => {
              navigate("/profile");
              setIsSidebarOpen(false);
            }}
          >
            Account Settings
          </Button>
          <Button variant="contained" color="error" className="logout-btn" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
