import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ComplaintForm from "./ComplaintForm";
import {
  Box,
  Card,
  Typography,
  Button,
  CircularProgress,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/auth/checkSession", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.isAuthenticated) {
          navigate("/auth");
        } else {
          setUser(data.user);
        }
      })
      .catch((err) => console.error("Session check failed:", err));
  }, [navigate, setUser]);

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ p: 4, width: "90%", maxWidth: 500, textAlign: "center", bgcolor: "background.paper" }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.name}!
        </Typography>

        {user.role === "admin" ? (
          <Box>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Admin Panel
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => navigate("/admindashboard")}
            >
              Go to Admin Dashboard
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" color="textSecondary">
              Your Email: {user.email}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Complaints:
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => setShowForm(true)}
            >
              File Complaint
            </Button>
          </Box>
        )}

        {/* Complaint Form Modal */}
        <Modal open={showForm} onClose={() => setShowForm(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <IconButton
              sx={{ position: "absolute", top: 10, right: 10 }}
              onClick={() => setShowForm(false)}
            >
              <CloseIcon />
            </IconButton>
            <ComplaintForm />
          </Box>
        </Modal>
      </Card>
    </Box>
  );
};

export default Dashboard;
