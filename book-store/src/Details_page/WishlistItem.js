import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import img from "../Home/img8a.png";
import { removeBookFromWishlist } from "../redux/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWish } from "../Services/userServices";
const WishlistItem = ({ item }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const handleRemoveFav = async () => {
    const token = localStorage.getItem("access");
    dispatch(removeBookFromWishlist(item.id));
    if (token) {
      const data = { book_id: item.id };
      const newItem = await removeFromWish(data, token);
      console.log("Removed from wishlist:", newItem);
    }
  };
  useEffect(() => {
    console.log("Wishlist items updated:", wishlistItems);
  }, [wishlistItems]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={2}>
        <Box
          component="img"
          src={img}
          alt={item.name}
          sx={{
            width: 80,
            height: 120,
            borderRadius: 1,
            mr: 2,
            objectFit: "cover",
          }}
        />
      </Grid>

      <Grid item xs={12} sm={8} sx={{ border: "", textAlign: "left" }}>
        <Box flex={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            {item?.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            by {item?.author}
          </Typography>
          <Typography variant="h6" color="primary" mt={1}>
            Rs. {item?.price}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ textDecoration: "line-through" }}
          >
            Rs. {Math.round(item?.price * (100 / 80))}
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={2}
        sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}
      >
        <IconButton color="error" aria-label="delete" onClick={handleRemoveFav}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default WishlistItem;
