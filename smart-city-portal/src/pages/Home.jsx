import React, { useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import { AuthContext } from "../context/AuthContext";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const scrollToTarget = () => {
      const sectionId = new URLSearchParams(location.search).get("scrollTo");
      if (sectionId) {
        scroller.scrollTo(sectionId, {
          smooth: true,
          duration: 500,
          offset: -70,
        });
      }
    };

    setTimeout(scrollToTarget, 500);
  }, [location]);

  const handleViewComplaints = () => {
    if (user) {
      navigate("/complaints");
    } else {
      navigate("/auth");
    }
  };

  return (
    <Box id="home" sx={{ bgcolor: "transparent", color: "white", minHeight: "100vh", position: "relative", zIndex: 1 }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ textAlign: "center", py: 25 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ fontWeight: 700, mb: 2, fontSize: { xs: "2.5rem", md: "3.5rem" } }}
        >
          WELCOME TO <Box component="span" sx={{ color: "#3498db" }}>SMART CITY PORTAL</Box>
        </Typography>
        <Typography variant="h6" sx={{ color: "#a0aec0", maxWidth: 800, mx: "auto", mb: 4, px: 2 }}>
          Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your needs.
        </Typography>
      </Container>

      <Container maxWidth="md" sx={{ textAlign: "center", mb: 10 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Want to file a complaint?</Typography>
        <Button 
          variant="contained" 
          onClick={handleViewComplaints}
          endIcon={<ArrowForwardIcon />}
          sx={{ mt: 1, px: 4, py: 1.5, bgcolor: "#3498db", "&:hover": { bgcolor: "#2980b9" }, fontWeight: 600 }}
        >
          Get Started
        </Button>
      </Container>
     
      <Box sx={{ mt: 6 }}>
        <About />
        <Services />
        <Contact />
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;