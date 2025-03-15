import React from "react";
import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";
import "../styles/services.css";

const Services = () => {
  return (
    <Container className="services-container">
      <section className="services-section">
        <Typography variant="h4" className="services-title">Our Services</Typography>
        <List className="services-list">
          <ListItem>
            <ListItemText primary="Pothole Reporting" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Streetlight Repairs" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Garbage Collection Tracking" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Water Supply Issues" />
          </ListItem>
        </List>
      </section>
    </Container>
  );
};

export default Services;
