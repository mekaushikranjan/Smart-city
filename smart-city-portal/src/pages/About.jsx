import React from "react";
import { Container, Typography, Box } from "@mui/material";

const About = () => {
  return (
    <Box id="about"
      sx={{
        bgcolor: "transparent",
        color: "white",
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 3,
        position: "relative",
        zIndex: 1, // Keeping same z-index as Home
      }}
    >
      <Container>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0, color: "#3498db" }}>
          About Us
        </Typography>
        <Typography variant="body1" sx={{ color: "#a0aec0", maxWidth: 800, mx: "auto" }}>
          The Smart City Complaint Portal is dedicated to improving our community through effective complaint management.
          Our platform ensures transparency, accountability, and real-time resolution of urban issues.
        </Typography>
      </Container>
    </Box>
  );
};

export default About;
