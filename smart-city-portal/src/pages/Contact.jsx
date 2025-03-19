import React, { useContext } from "react";
import { Container, Typography, TextField, Button, Box, Grid, Link, Paper, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { ThemeContext } from "../context/ThemeContext";

const Contact = () => {
  const { themeMode } = useContext(ThemeContext);
  const theme = useTheme();
  
  // Set dynamic styles based on theme mode
  const isDarkMode = themeMode === "dark";
  const paperBgColor = isDarkMode ? "#1e1e1e" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#333";
  const secondaryTextColor = isDarkMode ? "#a0aec0" : "#555";

  return (
    <Box
      id="contact"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
        bgcolor: "transparent", // No fixed background to respect theme
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            p: 3,
            bgcolor: paperBgColor,
            borderRadius: 5,
            color: textColor,
          }}
        >
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            {/* Contact Form (Left) */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: "#3498db" }}>
                Contact Us
              </Typography>
              <Typography variant="body1" sx={{ color: secondaryTextColor, mb: 2 }}>
                If you have any questions or need support, please reach out using the form below.
              </Typography>
              <TextField
                label="Your Name"
                fullWidth
                required
                sx={{ mb: 2, bgcolor: isDarkMode ? "#2c2c2c" : "#f0f0f0", borderRadius: 1 }}
              />
              <TextField
                label="Your Email"
                fullWidth
                required
                sx={{ mb: 2, bgcolor: isDarkMode ? "#2c2c2c" : "#f0f0f0", borderRadius: 1 }}
              />
              <TextField
                label="Message"
                multiline
                rows={4}
                fullWidth
                required
                sx={{ mb: 2, bgcolor: isDarkMode ? "#2c2c2c" : "#ffffff", borderRadius: 1 }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#3498db",
                  "&:hover": { bgcolor: "#2980b9" },
                  fontWeight: 600,
                  transition: "0.3s",
                }}
              >
                Send Message
              </Button>
            </Grid>

            {/* Social Media and Info (Right) */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: "#3498db" }}>
                Follow Us
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ transition: "0.3s", "&:hover": { transform: "scale(1.2)" } }}
                >
                  <FontAwesomeIcon icon={faFacebook} size="lg" color="#3b5998" />
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ transition: "0.3s", "&:hover": { transform: "scale(1.2)" } }}
                >
                  <FontAwesomeIcon icon={faTwitter} size="lg" color="#1da1f2" />
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ transition: "0.3s", "&:hover": { transform: "scale(1.2)" } }}
                >
                  <FontAwesomeIcon icon={faInstagram} size="lg" color="#e1306c" />
                </Link>
              </Box>
              <Typography variant="body1" sx={{ color: secondaryTextColor, mb: 1 }}>
                Address: 123 Main St, Anytown, USA
              </Typography>
              <Typography variant="body1" sx={{ color: secondaryTextColor, mb: 1 }}>
                Phone: +1 555 123 4567
              </Typography>
              <Typography variant="body1" sx={{ color: secondaryTextColor }}>
                Email:{" "}
                <Link href="mailto:info@example.com" sx={{ color: "#3498db" }}>
                  info@example.com
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;
