import React, { useContext, useState, useEffect } from "react";
import { 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Chip,
  Skeleton,
  Alert,
  Snackbar
} from "@mui/material";
import { ComplaintContext } from "../context/ComplaintContext";
import "../styles/ComplaintList.css";

const statusColors = {
  Pending: "warning",
  Resolved: "success",
  'In Progress': "info"
};

const ComplaintList = () => {
  const { complaints, updateComplaintStatus } = useContext(ComplaintContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  // Fetch complaints on mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        // Assuming your context has a fetchComplaints method
        await fetchComplaints(); 
        setLoading(false);
      } catch (err) {
        setError("Failed to load complaints");
        setLoading(false);
      }
    };
    
    fetchComplaints();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateComplaintStatus(id, newStatus);
      setSnackbar({ open: true, message: "Status updated successfully!" });
    } catch (err) {
      setSnackbar({ open: true, message: "Failed to update status" });
    }
  };

  if (error) {
    return (
      <Container className="complaint-list">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="complaint-list">
        {[...Array(3)].map((_, index) => (
          <Skeleton 
            key={index} 
            variant="rectangular" 
            width="100%" 
            height={150} 
            sx={{ mb: 2 }}
          />
        ))}
      </Container>
    );
  }

  return (
    <Container className="complaint-list">
      <Typography variant="h4" gutterBottom>
        Reported Issues
      </Typography>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />

      {complaints.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No complaints reported yet.
        </Typography>
      ) : (
        complaints.map((complaint) => (
          <Paper 
            key={complaint.id} 
            className="complaint-card"
            elevation={2}
            sx={{ mb: 2, p: 2 }}
          >
            <div className="complaint-header">
              <Typography variant="h6" className="complaint-title">
                {complaint.title}
              </Typography>
              <Chip
                label={complaint.status}
                color={statusColors[complaint.status] || "default"}
                size="small"
              />
            </div>

            <Typography variant="body2" className="complaint-desc">
              {complaint.description}
            </Typography>

            <div className="complaint-footer">
              <Typography variant="caption" color="textSecondary">
                Location: {complaint.location}
              </Typography>
              
              {complaint.status === "Pending" && (
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  onClick={() => handleStatusUpdate(complaint.id, "Resolved")}
                >
                  Mark Resolved
                </Button>
              )}
            </div>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default ComplaintList;