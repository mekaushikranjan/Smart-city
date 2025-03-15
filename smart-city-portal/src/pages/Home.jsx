import React, { useEffect, useContext } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import { AuthContext } from "../context/AuthContext"; // ✅ Import AuthContext
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import "../styles/Home.css";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // ✅ Check if user is logged in

  useEffect(() => {
    const scrollToTarget = () => {
      const sectionId = new URLSearchParams(location.search).get("scrollTo");
      if (sectionId) {
        scroller.scrollTo(sectionId, {
          smooth: true,
          duration: 500,
          offset: -70, // Adjust based on navbar height
        });
      }
    };

    setTimeout(scrollToTarget, 500); // ✅ Delay ensures DOM is ready
  }, [location]);

  // 🔥 Handle "View Complaints" click
  const handleViewComplaints = () => {
    if (user) {
      navigate("/complaints"); // ✅ Allow navigation if logged in
    } else {
      navigate("/auth"); // 🔴 Redirect to login if not logged in
    }
  };

  return (
    <Container className="home-container">
      {/* Hero Section */}
      <section id="homeHero" className="home-section home-hero">
        <Typography variant="h3">
          Welcome to Smart City Complaint Portal
        </Typography>
        <Typography variant="h6">
          Report and track local issues like potholes, streetlight failures, and garbage collection.
        </Typography>
        <Box className="home-buttons">
          <Button variant="contained" className="btn-primary" component={Link} to="/report">
            Report an Issue
          </Button>
          <Button 
  variant="outlined" 
  className="btn-outlined" 
  onClick={() => user ? navigate("/complaints") : navigate("/auth")}
>
  View Complaints
</Button>

        </Box>
      </section>

      {/* About Section */}
      <section id="about" className="home-section">
        <About />
      </section>

      {/* Services Section */}
      <section id="services" className="home-section">
        <Services />
      </section>

      {/* Contact Section */}
      <section id="contact" className="home-section">
        <Contact />
      </section>
    </Container>
  );
};

export default Home;
