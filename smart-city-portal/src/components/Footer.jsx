import React from "react";
import { Box, Typography } from "@mui/material";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <Box className="footer">
      <Typography variant="body2">
        © {new Date().getFullYear()} Smart City Complaint Portal. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
