import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Alert,
  Box,
  FormControl
} from "@mui/material";

const AdminDashboard = () => {
  const { user, loading: authLoading, logout } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!user) {
        setError("You must be logged in to view complaints.");
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.get(`${API_BASE_URL}/api/complaints`, {
          withCredentials: true,
        });
  
        setComplaints(response.data);
      } catch (err) {
        console.error("Fetch Complaints Error:", err);
  
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
        } else {
          setError("Error fetching complaints.");
        }
      } finally {
        setLoading(false);
      }
    };
  
    if (!authLoading) fetchComplaints();
  }, [user, authLoading]);
  
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/complaints/${id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );

      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status: newStatus } : complaint
        )
      );

      setSuccessMessage("Status updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Update Status Error:", err);
      setError("Failed to update status");
      setTimeout(() => setError(""), 3000);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending":
        return "#ff9800"; // Orange
      case "In Progress":
        return "#2196f3"; // Blue
      case "Resolved":
        return "#4caf50"; // Green
      default:
        return "#757575"; // Grey
    }
  };

  if (loading || authLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Manage Complaints
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Complaint ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint._id}>
                <TableCell>#{complaint._id.slice(-6)}</TableCell>
                <TableCell>{complaint.title}</TableCell>
                <TableCell>{complaint.user?.name || "Unknown User"}</TableCell>
                <TableCell>{complaint.description}</TableCell>
                <TableCell>{complaint.category}</TableCell>
                <TableCell>
                  <FormControl fullWidth size="small">
                    <Select
                      value={complaint.status}
                      onChange={(e) => handleStatusUpdate(complaint._id, e.target.value)}
                      sx={{
                        color: getStatusColor(complaint.status),
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: getStatusColor(complaint.status)
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: getStatusColor(complaint.status)
                        }
                      }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Resolved">Resolved</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleStatusUpdate(complaint._id, complaint.status)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminDashboard;