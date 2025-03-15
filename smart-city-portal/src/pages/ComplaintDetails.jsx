import React, { useContext } from "react";
import { Container, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import { ComplaintContext } from "../context/ComplaintContext";
import "../styles/complaintsDetails.css";

const ComplaintDetails = () => {
  const { complaints } = useContext(ComplaintContext);

  return (
    <Container className="complaint-container">
      <Typography variant="h4" className="complaint-title">Complaints</Typography>

      {complaints.length === 0 ? (
        <Typography>No complaints found.</Typography>
      ) : (
        <List>
          {complaints.map((comp) => (
            <Paper key={comp.id} className="complaint-item">
              <ListItem>
                <ListItemText
                  primary={<strong>{comp.title}</strong>}
                  secondary={`📍 ${comp.location} - ${comp.status}`}
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Container>
  );
};

export default ComplaintDetails;
