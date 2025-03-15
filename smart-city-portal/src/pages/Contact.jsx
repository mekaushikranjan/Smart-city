import React from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <Container className="contact-container">
      <Box className="contact-form">
        <Typography variant="h4" className="contact-title">Contact Us</Typography>
        <Typography variant="body1" className="contact-text">
          If you have any questions or need support, please reach out using the form below.
        </Typography>
        <TextField label="Your Name" variant="outlined" fullWidth required />
        <TextField label="Your Email" variant="outlined" fullWidth required />
        <TextField label="Message" variant="outlined" multiline rows={4} fullWidth required />
        <Button variant="contained" color="primary">
          Send Message
        </Button>
      </Box>
    </Container>
  );
};

export default Contact;
