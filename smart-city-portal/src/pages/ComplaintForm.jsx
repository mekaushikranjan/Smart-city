import React, { useState, useContext } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { ComplaintContext } from "../context/ComplaintContext";
import { useNavigate } from "react-router-dom"; // ✅ Redirect after submission
import "../styles/ComplaintForm.css";

const ComplaintForm = () => {
  const { addComplaint } = useContext(ComplaintContext);
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState({ title: "", description: "", location: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!complaint.title || !complaint.description || !complaint.location) {
      alert("Please fill all fields.");
      return;
    }

    addComplaint(complaint); // 🔥 Store complaint
    setComplaint({ title: "", description: "", location: "" });

    // ✅ Redirect user to complaints page
    navigate("/complaints");
  };

  return (
    <Container className="form-container">
      <Typography variant="h4">Report an Issue</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          value={complaint.title}
          onChange={(e) => setComplaint({ ...complaint, title: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={complaint.description}
          onChange={(e) => setComplaint({ ...complaint, description: e.target.value })}
        />
        <TextField
          label="Location (Latitude, Longitude)"
          fullWidth
          value={complaint.location}
          onChange={(e) => setComplaint({ ...complaint, location: e.target.value })}
        />
        <Button type="submit" variant="contained" className="submit-btn">
          Submit Complaint
        </Button>
      </form>
    </Container>
  );
};

export default ComplaintForm;
