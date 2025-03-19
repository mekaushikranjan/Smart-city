import React, { useState, useEffect, useContext } from "react";
import { Container, TextField, Button, Typography, Grid, Card, CardContent } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/api";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Complaint = () => {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "", location: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await API.get(`${API_BASE_URL}/complaints`, {
          withCredentials: true,  // ✅ Ensures authentication works
        });
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setError("Error fetching complaints.");
      }
    };

    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.location) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await API.post("/complaints", { ...formData, user: user?.id });
      setComplaints([response.data, ...complaints]); // Add new complaint
      setFormData({ title: "", description: "", location: "" });
      setError("");
    } catch (error) {
      setError("Failed to submit complaint. Try again!");
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Submit a Complaint
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <TextField
          label="Location"
          fullWidth
          margin="normal"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit Complaint
        </Button>
      </form>

      <Typography variant="h5" sx={{ mt: 4 }}>
        Recent Complaints
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {complaints.map((complaint) => (
          <Grid item xs={12} md={6} key={complaint._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{complaint.title}</Typography>
                <Typography variant="body2">{complaint.description}</Typography>
                <Typography variant="caption">Location: {complaint.location}</Typography>
                <Typography variant="caption" display="block">
                  Status: {complaint.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Complaint;
