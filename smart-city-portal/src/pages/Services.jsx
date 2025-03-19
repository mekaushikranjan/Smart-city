import React from "react";
import { Container, Typography, List, ListItem, ListItemText, Box } from "@mui/material";

const Services = () => {
  return (
    <Box id="services" sx={{ color: "white", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: "#3498db" }}>
          Our Services
        </Typography>
        <List sx={{ color: "#a0aec0", maxWidth: 600, mx: "auto" }}>
          <ListItem sx={{ justifyContent: "center" }}>
            <ListItemText primary="Pothole Reporting" sx={{ textAlign: "center" }} />
          </ListItem>
          <ListItem sx={{ justifyContent: "center" }}>
            <ListItemText primary="Streetlight Repairs" sx={{ textAlign: "center" }} />
          </ListItem>
          <ListItem sx={{ justifyContent: "center" }}>
            <ListItemText primary="Garbage Collection Tracking" sx={{ textAlign: "center" }} />
          </ListItem>
          <ListItem sx={{ justifyContent: "center" }}>
            <ListItemText primary="Water Supply Issues" sx={{ textAlign: "center" }} />
          </ListItem>
        </List>
      </Container>
    </Box>
  );
};

export default Services;
