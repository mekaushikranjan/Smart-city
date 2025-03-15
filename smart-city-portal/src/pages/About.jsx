import React from "react";
import { Container, Typography } from "@mui/material";
import "../styles/about.css";  // if styles is inside src/

const About = () => {
  return (
    <Container className="about-container">
      <section className="about-section">
        <Typography variant="h4" className="about-title">About Us</Typography>
        <Typography variant="body1" className="about-text">
          The Smart City Complaint Portal is dedicated to improving our community through effective complaint management.
        </Typography>
      </section>
    </Container>
  );
};

export default About;
