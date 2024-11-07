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
import img from "./image.png";
import { Search, AccountCircle, ShoppingCart } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Order Confirmation Message */}
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 2 }}>
        <Box sx={{ p: 4 }}>
          {/* <Typography variant="h4" gutterBottom>
            Order Placed Successfully
          </Typography> */}
          <Box
            component="img"
            src={img} // Add an image URL here
            alt="Success Icon"
            sx={{ my: 3, maxWidth: "45%", maxHeight: "45%" }}
          />
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            Hurray!!! Your order is confirmed. The order ID is{" "}
            <strong>#123456</strong>. Save the order ID for further
            communication.
          </Typography>
        </Box>

        {/* Contact Information */}
        <Card sx={{ mt: 5, mb: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="subtitle1">Email us</Typography>
                <Typography variant="body1" color="textSecondary">
                  vinitbhamare2002@gmail.com
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="subtitle1">Contact us</Typography>
                <Typography variant="body1" color="textSecondary">
                  +91 1234567890
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="subtitle1">Address</Typography>
                <Typography variant="body1" color="textSecondary">
                  42, 14th Main, 15th Cross, Sector 4, opp to BDA complex, near
                  Kumarakom restaurant, HSR Layout, Bangalore 560034
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Continue Shopping Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3, backgroundColor: "#A03037", mb: 3 }}
          onClick={() => navigate("/home")}
        >
          CONTINUE SHOPPING
        </Button>
      </Container>
    </div>
  );
};

export default Checkout;
