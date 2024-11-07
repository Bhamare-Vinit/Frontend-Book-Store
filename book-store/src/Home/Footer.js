import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const Footer = () => {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#A03037",
          color: "white",
          textAlign: "center",
          py: 2,
          mt: 5,
          position: "fixed",
        }}
      >
        <Typography variant="body2">
          &copy; 2020 Bookstore Private Limited. All Rights Reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default Footer;
