import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Rating,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { addCart, updateCart } from "../redux/cartSlice";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  addBookToWishlist,
  removeBookFromWishlist,
} from "../redux/wishlistSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import img1 from "../Home/img8a.png";
import {
  signUp,
  signIn,
  getCart,
  addToCart,
  getWishlist,
  orderConfirm,
  addToWish,
  removeFromWish,
} from "../Services/userServices";

const OldPrice = styled("span")({
  textDecoration: "line-through",
  color: "#9e9e9e",
  fontSize: "14px",
  marginLeft: "8px",
});
const Details = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const AllBooks = useSelector((state) => state.book.AllBooks);
  const CartItems = useSelector((state) => state.cart.CartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems); // Get wishlist items

  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState("");
  const book = AllBooks.find((book) => book.id === parseInt(bookId));
  console.log("-------", book);
  //==========start
  const cartItem = CartItems.find((item) => item.id === parseInt(bookId));
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
    console.log("Cart items updated:", CartItems);
    console.log("Wishlist items updated:", wishlistItems);
  }, [CartItems, cartItem, wishlistItems]);

  const handleAddToCart = () => {
    if (book) {
      setQuantity(1);
      dispatch(addCart({ ...book, quantity: 1 }));
      
    }
  };

  const increaseQuantity = () => {
    if (quantity < 10) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      dispatch(updateCart({ id: book.id, quantity: newQuantity }));
      console.log("Cart Items:", CartItems);
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(updateCart({ id: book.id, quantity: newQuantity }));
      console.log("Cart Items:", CartItems);
    }
  };

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Review:", review);
  };
  const isBookInWishlist = wishlistItems.some((item) => item.id === book?.id); // Check if the book is in the wishlist

  const handleWishlistClick = async () => {
    const token = localStorage.getItem("access");
    if (isBookInWishlist) {
      dispatch(removeBookFromWishlist(book.id));
      if(token){
        const data = { book_id: book.id };
        const newItem = await removeFromWish(data, token);
        console.log("Removed from wishlist:", newItem);
      } // Remove from wishlist
      // console.log("Removed from wishlist:", wishlistItems);
    } else {
      dispatch(addBookToWishlist(book)); // Add to wishlist
      if (token) {
        const data = { book_id: book.id };
        const newItem = await addToWish(data, token);
        console.log("Removed from wishlist:", newItem);
      }
      // console.log("Added to wishlist:", wishlistItems);
    }
  };

  // const handleAddToCart = () => {
  //   if (book) {
  //     dispatch(addCart(book));
  //     console.log("Added to cart:", book);
  //   }
  // };
  // console.log("Cart Items:", CartItems);

  return (
    <Box sx={{ maxWidth: "1000px", margin: "auto" }}>
      <div
        style={{
          display: "flex",
          //   border: "1px solid black",
          height: "90px",
          width: "75%",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        hii
      </div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <img
            // src="https://m.media-amazon.com/images/I/41uPjEenkFL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg"
            src={img1}
            alt="Book"
            style={{ width: "100%", margin: "auto" }}
          />
          <Box
            display="flex"
            gap={2}
            mt={4}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: "100%",
              border: "1px solid black",
            }}
          >
            {/* <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              color="primary"
              sx={{ width: "45%" }}
              onClick={handleAddToCart}
            >
              Add to Bag
            </Button> */}
            {cartItem ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent={"center"}
                sx={{ width: "45%" }}
              >
                <IconButton
                  onClick={decreaseQuantity}
                  sx={{
                    border: "1px solid #DBDBDB",
                    backgroundColor: "#DBDBDB",
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography
                  variant="body1"
                  sx={{
                    margin: "0 10px",
                    width: "20%",
                  }}
                >
                  {quantity}
                </Typography>
                <IconButton
                  onClick={increaseQuantity}
                  sx={{
                    border: "1px solid #DBDBDB",
                    backgroundColor: "#DBDBDB",
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            ) : (
              <Button
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
                color="primary"
                sx={{ width: "45%" }}
                onClick={handleAddToCart} // Call handleAddToCart on button click
              >
                Add to Bag
              </Button>
            )}
            {/* <Button
              variant="outlined"
              startIcon={<FavoriteBorderIcon />}
              sx={{ width: "45%" }}
            >
              Wishlist
            </Button> */}
            <Button
              variant="outlined"
              startIcon={
                isBookInWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />
              }
              sx={{ width: "45%" }}
              onClick={handleWishlistClick}
            >
              {isBookInWishlist ? "Added" : "Wishlist"}
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={7} sx={{ textAlign: "left" }}>
          <Typography variant="h4">{book?.name}</Typography>
          <Typography variant="h6" color="textSecondary">
            by {book?.author}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            sx={{ marginTop: "8px", marginBottom: "8px" }}
            gutterBottom
          >
            <Typography
              variant="body2"
              sx={{
                // marginLeft: "8px",
                backgroundColor: "#388E3C",
                color: "white",
                padding: "4px 4px",
                // borderRadius: "4px",
              }}
            >
              4.5 ☆
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginLeft: "4px" }}
            >
              (20)
            </Typography>
          </Stack>

          <Box
            sx={{
              marginTop: "15px",
              display: "flex",
              // marginLeft: "8px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "", fontSize: "40px", fontWeight: "bold" }}
            >
              Rs.{book?.price}
            </Typography>
            <Typography
              variant="body1"
              sx={{ textDecoration: "line-through", color: "gray", ml: 1 }}
            >
              Rs.{Math.round(book?.price * (100 / 80))}
            </Typography>
          </Box>

          <hr></hr>
          <Box mt={2} mb={4}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Book Detail
            </Typography>
            <Typography variant="body1">{book?.description}</Typography>
          </Box>
          <hr></hr>
          <Box mt={4}>
            <Typography variant="h6" gutterBottom mb={2}>
              Customer Feedback
            </Typography>
            <Box sx={{ backgroundColor: "#F5F5F5", padding: "4%" }}>
              <Typography sx={{ fontSize: "16px" }} mb={1}>
                Overall Rating:
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <Rating
                  name="customer-rating"
                  value={rating}
                  onChange={handleRatingChange}
                />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {rating === 0 ? "Rate this book" : `${rating} stars`}
                </Typography>
              </Box>

              <TextField
                label="Write your review"
                // variant="outlined"
                fullWidth
                multiline
                rows={2}
                value={review}
                onChange={handleReviewChange}
                // backgroundColor="white"
                sx={{ backgroundColor: "white", borderRadius: "5px" }}
              />

              <Box
                mt={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  // border: "1px solid gray",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Details;
