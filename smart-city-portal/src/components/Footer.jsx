import React from "react";
import { Box, Typography, IconButton, Container } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "relative",
        bottom: 8,
        left: "50%",
        transform: "translateX(-50%)",
        width: { xs: "100%", sm: "90%" },
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(12px)",
        borderRadius: 3,
        color: "white",
        textAlign: "center",
        py: 2,
        px: { xs: 2, sm: 10, md: 25 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 1, sm: 0 },
      }}
    >
      <Typography variant="body2" sx={{ textAlign: "center", fontSize: { xs: "12px", sm: "14px" } }}>
        © {new Date().getFullYear()} Smart City Complaint Portal. All rights reserved.
      </Typography>

      <Box>
        <IconButton color="inherit" size="small">
          <Facebook />
        </IconButton>
        <IconButton color="inherit" size="small">
          <Twitter />
        </IconButton>
        <IconButton color="inherit" size="small">
          <Instagram />
        </IconButton>
        <IconButton color="inherit" size="small">
          <LinkedIn />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;