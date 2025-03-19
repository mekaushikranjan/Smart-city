import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Button,
  Avatar,
  Box,
  Container,
  Stack,
} from "@mui/material";
import { Link as ScrollLink, scroller } from "react-scroll";
import { useLocation, useNavigate, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { themeMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isDarkMode = themeMode === "dark";
  const navbarBg = isDarkMode ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.2)";
  const textColor = isDarkMode ? "white" : "black";

  // Function to handle navigation and scrolling
  const handleScrollNavigation = (section) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true }); // Navigate to homepage first
      setTimeout(() => {
        scroller.scrollTo(section, { smooth: true, duration: 300, offset: -70 });
      }, 100); // Delay to ensure the page has loaded
    } else {
      scroller.scrollTo(section, { smooth: true, duration: 300, offset: -70 });
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: navbarBg,
        backdropFilter: "blur(10px)",
        borderRadius: 3,
        mt: 2,
        width: { xs: "95%", sm: "90%" },
        left: "50%",
        transform: "translateX(-50%)",
        color: textColor,
        boxShadow: isDarkMode ? "0px 4px 10px rgba(255, 255, 255, 0.1)" : "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" sx={{ fontSize: 30, fontWeight: "bold", p: 2.1, color: textColor }}>
            Smart City Portal
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {user?.role === "admin" ? (
              <Button color="inherit" component={Link} to="/dashboard" sx={{ color: textColor, fontWeight: "bold" }}>
                Dashboard
              </Button>
            ) : (
              ["Home", "About", "Services", "Contact"].map((text) => (
                <Button
                  key={text}
                  color="inherit"
                  onClick={() => handleScrollNavigation(text.toLowerCase())} // Use custom function
                  sx={{ color: textColor, fontWeight: "bold" }}
                >
                  {text}
                </Button>
              ))
            )}

            {!user ? (
              <Button variant="contained" component={Link} to="/auth">
                Login / Sign-up
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => setIsSidebarOpen(true)} sx={{ color: textColor, borderColor: textColor }}>
                {user.role === "admin" ? "Admin" : "User"}
              </Button>
            )}

            {/* Theme Toggle Button */}
            <IconButton onClick={toggleTheme} sx={{ ml: 6, color: textColor }}>
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton sx={{ display: { xs: "flex", md: "none" }, color: textColor }} onClick={() => setIsSidebarOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Sidebar Drawer for Mobile */}
      <Drawer anchor="right" open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <Box sx={{ width: 280, p: 2, textAlign: "center" }}>
          <IconButton onClick={() => setIsSidebarOpen(false)} sx={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
          {user && (
            <>
              <Avatar src={user?.profilePic || "https://via.placeholder.com/150"} sx={{ width: 80, height: 80, mx: "auto", mb: 1 }} />
              <Typography variant="h6" fontWeight="bold">{user?.name}</Typography>
            </>
          )}

          <Stack spacing={2} mt={3}>
            {user?.role === "admin" ? (
              <Button variant="contained" component={Link} to="/dashboard" fullWidth onClick={() => setIsSidebarOpen(false)}>
                Dashboard
              </Button>
            ) : (
              ["Home", "About", "Services", "Contact"].map((text) => (
                <Button
                  key={text}
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    setIsSidebarOpen(false);
                    handleScrollNavigation(text.toLowerCase());
                  }}
                >
                  {text}
                </Button>
              ))
            )}

            {!user ? (
              <Button variant="contained" component={Link} to="/auth" fullWidth onClick={() => setIsSidebarOpen(false)}>
                Login / Sign-up
              </Button>
            ) : (
              <>
                <Button variant="outlined" onClick={() => {
                  navigate("/profile");
                  setIsSidebarOpen(false);
                }} fullWidth>
                  Account Settings
                </Button>
                <Button variant="contained" color="error" onClick={() => {
                  logout();
                  setIsSidebarOpen(false);
                }} fullWidth>
                  Logout
                </Button>
              </>
            )}
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
