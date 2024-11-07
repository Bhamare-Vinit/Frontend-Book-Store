import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Tabs,
  Tab,
  Typography,
  Button,
  IconButton,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Grid,
  MenuItem,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import img1 from "../Home/img8a.png";
import { useDispatch, useSelector } from "react-redux";
import { addCart, updateCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { setAddress, toggleEdit } from "../redux/addressSlice";
import {
  signUp,
  signIn,
  getCart,
  addToCart,
  getWishlist,
  addToWish,
  orderConfirm,
  getordered,
} from "../Services/userServices";
import { addBookToWishlist } from "../redux/wishlistSlice";
import { setOrderedlistItems } from "../redux/orderedSlice";
const MyCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //cartItem Lits
  const AllBooks = useSelector((state) => state.book.AllBooks);
  const CartItems = useSelector((state) => state.cart.CartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems); // Get wishlist items
  const orderedlistItems = useSelector(
    (state) => state.orderedlist.orderedlistItems
  );
  const item = CartItems[0];
  //Address
  const { address, isEditing } = useSelector((state) => state.address);
  const [name, setName] = useState(address.name || "");
  const [mobileNumber, setMobileNumber] = useState(address.mobileNumber || "");
  const [addressText, setAddressText] = useState(address.address || "");
  const [city, setCity] = useState(address.city || "");
  const [state, setState] = useState(address.state || "");

  const [showForm, setShowForm] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [doneAddress, setDoneAddress] = useState(false);
  const [res, setRes] = useState([]);
  const [wish, setWish] = useState([]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleInput(e) {
    const newObj = { ...values, [e.target.name]: e.target.value };
    setValues(newObj);
  }

  async function handleSignIn(e) {
    e.preventDefault();

    try {
      let response = await signIn(values);

      // console.log("login success", "++++++++++", t);
      if (response) {
        let t = response.data.data.access;
        console.log("login success", "/////////", t);
        setOpen(false);
        setShowForm(true);
        fetchCart(t);
        fetchWish(t);
        fetchordered(t);

        // const res = await getCart(t);
        // setRes(res.data.items);
      }
      // if (CartItems.length === 0 && res.length === 0) return;

      // const resBookIds = res.map((item) => item.book);
      // const cartBooksNotInRes = CartItems.filter(
      //   (cartItem) => !resBookIds.includes(cartItem.id)
      // );

      // for (let item of cartBooksNotInRes) {
      //   const data = {
      //     book_id: item.id,
      //     quantity: item.quantity,
      //   };
      //   const newItem = await addToCart(data); // Make API call to add book to database
      //   setRes((prev) => [...prev, newItem]); // Add the new item to res array in state
      // }

      // const cartItemIds = CartItems.map((item) => item.id);
      // const resBooksNotInCart = res.filter(
      //   (resItem) => !cartItemIds.includes(resItem.book)
      // );

      // for (let item of resBooksNotInCart) {
      //   dispatch(addCart(item)); // Dispatch action to add item to CartItems in Redux store
      // }

      // CartItems.forEach((cartItem) => {
      //   const matchingResItem = res.find(
      //     (resItem) => resItem.book === cartItem.id
      //   );
      //   if (matchingResItem && matchingResItem.quantity !== cartItem.quantity) {
      //     dispatch(
      //       updateCart({ ...cartItem, quantity: matchingResItem.quantity })
      //     );
      //   }
      // });
    } catch (err) {
      //just try
      console.log("error: ", err);
    }
  }

  const [regValues, setRegValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    // confirmPassword: "",
    service: "advance",
  });
  function handleRegInput(e) {
    const newObj = { ...regValues, [e.target.name]: e.target.value };
    setRegValues(newObj);
  }
  async function handleSignUp(e) {
    e.preventDefault();
    try {
      let response = await signUp(regValues);
      console.log(response.data);
      if (response) {
        // setOpen(false);
        setActiveTab(0);
        // setShowForm(true);
      }
    } catch (err) {
      // toast.error("User already exists");
      console.log("error: ", err);
    }
  }

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // const handleEditToggle = () => {
  //   dispatch(toggleEdit());
  // };

  const handleSaveAddress = () => {
    dispatch(
      setAddress({
        name,
        mobileNumber,
        city,
        state,
        address: addressText,
      })
    );
    handleAddress();
  };

  const placeorder = async () => {
    const orderesponse = await orderConfirm();
    if (orderesponse) {
      navigate(`/home/MyCart/Checkout`);
    }
  };
  const increaseQuantity = () => {
    if (item.quantity < 10) {
      const newQuantity = item.quantity + 1;

      dispatch(updateCart({ id: item.id, quantity: newQuantity }));
      //   console.log("Cart Items:", CartItems);
    }
  };
  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      dispatch(updateCart({ id: item.id, quantity: newQuantity }));
      //   console.log("Cart Items:", CartItems);
    }
  };

  const handlePlaceOrder = () => {
    if (!localStorage.getItem("access")) {
      setOpen(true);
    } else {
      setShowForm(true);
    }
  };
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddress = () => {
    // setEditAddress(true);
    setEditAddress((prev) => !prev);
  };
  // const handledoneAddress = () => {
  //   setDoneAddress(true);
  // };
  const handledoneAddress = () => {
    setDoneAddress((prev) => !prev);
  };

  const fetchCart = async (t) => {
    const res = await getCart(t);
    setRes(res.data.items);
    // console.log("All Cart__________________________:", res.data.items);
    syncCartItems(CartItems, res.data.items);
    // dispatch(setAllBooks(response.data.data));
  };

  const syncCartItems = async (CartItems, res) => {
    console.log("Im in");
    if (CartItems.length === 0 && res.length === 0) return;

    const resBookIds = res.map((item) => item.book);
    const cartBooksNotInRes = CartItems.filter(
      (cartItem) => !resBookIds.includes(cartItem.id)
    );

    for (let item of cartBooksNotInRes) {
      const data = {
        book_id: item.id,
        quantity: item.quantity,
      };
      const newItem = await addToCart(data); // Make API call to add book to database
      // setRes((prev) => [...prev, newItem.data.data.items]); // Add the new item to res array in state
      setRes(newItem.data.data.items);
    }

    // const cartItemIds = CartItems.map((item) => item.id);
    // const resBooksNotInCart = res.filter(
    //   (resItem) => !cartItemIds.includes(resItem.book)
    // );

    // for (let item of resBooksNotInCart) {
    //   dispatch(addCart(item)); // Dispatch action to add item to CartItems in Redux store
    // }

    const cartItemIds = CartItems.map((item) => item.id);
    const resBooksNotInCart = res.filter(
      (resItem) => !cartItemIds.includes(resItem.book)
    );

    // Loop through resBooksNotInCart and find the matching item in AllBooks
    for (let resItem of resBooksNotInCart) {
      // Find the matching book in AllBooks based on id
      const matchingBook = AllBooks.find((book) => book.id === resItem.book);

      // If a match is found, dispatch addCart with the matching book
      if (matchingBook) {
        const bookQuantity = { ...matchingBook, quantity: resItem.quantity };
        dispatch(addCart(bookQuantity));
      }
    }

    CartItems.forEach((cartItem) => {
      const matchingResItem = res.find(
        (resItem) => resItem.book === cartItem.id
      );
      if (matchingResItem && matchingResItem.quantity !== cartItem.quantity) {
        dispatch(
          updateCart({ ...cartItem, quantity: matchingResItem.quantity })
        );
      }
    });
  };

  const fetchWish = async (t) => {
    const res = await getWishlist(t);
    setWish(res.data);
    syncWishlist(wishlistItems, res.data, t);
  };
  // const syncWishlist = async (wishlist, wishListDatabase, t) => {
  //   if (wishlist.length == 0 && wishListDatabase.length == 0) return;

  //   const wishListDatabase = wishListDatabase.map((item) => item.book.id);
  //   const bookNotInWish = wishlist.filter(
  //     (book) => !wishListDatabase.includes(book.id)
  //   );
  //   for (let item of bookNotInWish) {
  //     const newItem = await addToWish(item.id, t);
  //     setWish(newItem.data.data);
  //   }
  // };
  const syncWishlist = async (wishlist, res, t) => {
    console.log("Synchronizing wishlist items...");

    // Step 1: Check if both lists are empty and return if true
    if (wishlist.length === 0 && res.length === 0) return;

    // Step 2: Find wishlist items that are in Redux but not in the database
    const resBookIds = res.map((item) => item.book.id);
    const wishlistBooksNotInRes = wishlist.filter(
      (wishItem) => !resBookIds.includes(wishItem.id)
    );

    // For each book missing in the database, call an API to add it
    for (let item of wishlistBooksNotInRes) {
      const data = { book_id: item.id };
      try {
        const newItem = await addToWish(data, t); // API call to add to wishlist in the database
        setWish((prev) => [...prev, newItem.data]); // Add new item to res array
      } catch (error) {
        console.error(
          `Failed to add book with ID ${item.id} to wishlist:`,
          error
        );
      }
    }

    // Step 3: Find wishlist items that are in the database but not in Redux
    const wishlistItemIds = wishlist.map((item) => item.id);
    const resBooksNotInWishlist = res.filter(
      (resItem) => !wishlistItemIds.includes(resItem.book.id)
    );

    // Loop through resBooksNotInWishlist and add them to Redux if not present
    for (let resItem of resBooksNotInWishlist) {
      const bookData = {
        id: resItem.book.id,
        name: resItem.book.name,
        author: resItem.book.author,
        description: resItem.book.description,
        price: resItem.book.price,
        stock: resItem.book.stock,
      };
      dispatch(addBookToWishlist(bookData)); // Add the missing book to the Redux wishlist
    }

    // Step 4: Update any mismatched data between Redux and database if necessary
    // wishlist.forEach((wishItem) => {
    //     const matchingResItem = res.find(
    //         (resItem) => resItem.book.id === wishItem.id
    //     );
    //     if (matchingResItem && matchingResItem.someField !== wishItem.someField) {
    //         dispatch(updateWishlistItem({ ...wishItem, someField: matchingResItem.someField }));
    //     }
    // });
  };

  const fetchordered = async (t) => {
    try {
      const res = await getordered(t);
      console.log("res from ordered list", res.data); // Assuming getordered is your API call function
      if (res.data) {
        dispatch(setOrderedlistItems(res.data)); // Dispatch to store response in Redux state
      }
    } catch (error) {
      console.error("Failed to fetch ordered items:", error);
    }
  };

  useEffect(() => {
    // console.log("CartItems:", CartItems);
    // console.log("wishlist from database", wish);
    // console.log("wishlist", wishlistItems);
    console.log("Ordered List", orderedlistItems);
    // console.log("Item:", item);
    // console.log("Address:", address);
    // console.log("res:", res);
  }, [CartItems, item, res, wish, orderedlistItems]);
  // CartItems, item, address, res

  return (
    <>
      <div
        style={{
          display: "flex",
          border: "1px solid black",
          height: "90px",
          width: "75%",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        hii
      </div>
      <Box
        sx={{
          // display: "flex",
          // width: "100%",
          // flexDirection: "column",
          // alignItems: "center", // Center content if desired
          // gap: 3, // This will add spacing between the items
          color: "1px solid red",
          width: "100%",
        }}
      >
        {/* first div */}
        <Box
          sx={{
            padding: "20px",
            maxWidth: "900px",
            margin: "auto",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            color: "1px solid red",
            mt: 3,
          }}
        >
          <Typography variant="h6" gutterBottom mb={5}>
            My cart (1)
          </Typography>

          <Grid container spacing={2} sx={{ border: "" }}>
            {/* Left side with book image and details */}
            <Grid item xs={12} sm={3} sx={{ border: "" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 180 }}
                  image={img1}
                  alt="Don't Make Me Think"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={5} sx={{ border: "", textAlign: "left" }}>
              <Box>
                {/* <Typography component="div" variant="subtitle1"> */}
                <Typography variant="h6">{item?.name}</Typography>
                <Typography variant="body1" color="text.secondary">
                  by {item?.author}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ marginTop: "10px", fontweight: "bold" }}
                >
                  Rs. {item?.price}{" "}
                  <Typography
                    component="span"
                    sx={{
                      textDecoration: "line-through",
                      color: "grey",
                      marginLeft: "8px",
                    }}
                  >
                    Rs. {Math.round(item?.price * (100 / 80))}
                  </Typography>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }} mt={7}>
                <IconButton
                  onClick={decreaseQuantity}
                  sx={{
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#DBDBDB",
                  }}
                  size="small"
                >
                  <RemoveIcon />
                </IconButton>
                {/* <TextField
                value={quantity}
                size="small"
                sx={{ width: "50px", textAlign: "center", mx: 1 }}
                inputProps={{ style: { textAlign: "center" } }}
              /> */}
                <Typography
                  variant="body1"
                  sx={{
                    //   margin: "0 10px",
                    mx: 1,
                    textAlign: "center",
                    width: "10%",
                  }}
                >
                  {item.quantity}
                </Typography>
                <IconButton
                  onClick={increaseQuantity}
                  sx={{
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#DBDBDB",
                  }}
                  size="small"
                >
                  <AddIcon fontSize="small" />
                </IconButton>
                <Button
                  variant="text"
                  color="error"
                  sx={{ marginLeft: "10px" }}
                >
                  Remove
                </Button>
              </Box>
            </Grid>

            {/* Right side with location dropdown */}
            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Use current location"
                defaultValue="current-location"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <LocationOnIcon sx={{ marginRight: "8px" }} />
                  ),
                }}
              >
                <MenuItem value="current-location">
                  Use current location
                </MenuItem>
                <MenuItem value="enter-address">
                  Enter address manually
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>

          {/* Quantity controls and actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Box></Box>

            <Button
              variant="contained"
              color="primary"
              sx={{ padding: "10px 20px" }}
              onClick={handlePlaceOrder}
            >
              PLACE ORDER
            </Button>
          </Box>
        </Box>

        {/* second div */}
        <Box
          sx={{
            // marginTop: "30px",
            padding: "20px",
            maxWidth: "900px",
            margin: "auto",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            mt: 3,
          }}
        >
          {!showForm ? (
            <Typography variant="h6" align="center">
              Address details
            </Typography>
          ) : (
            <>
              <Grid container spacing={2}>
                {/* First row */}
                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    Address Details
                  </Typography>
                </Grid>

                {/* Second row with Name and Mobile Number fields */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Mobile Number"
                    variant="outlined"
                    fullWidth
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  // mt={7}
                >
                  <Typography variant="h6" align="center">
                    Address
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    // display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  // mt={7}
                >
                  {!editAddress ? (
                    <>
                      <Box>
                        <Typography variant="body1" sx={{ marginTop: "10px" }}>
                          {address?.name} {" - "}
                          {address?.mobileNumber}
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: "10px" }}>
                          {address?.address}
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: "10px" }}>
                          {address?.city}
                          {" - "}
                          {address?.state}
                        </Typography>
                        <Button
                          variant="text"
                          color="error"
                          sx={{ marginLeft: "10px" }}
                          onClick={handleAddress}
                        >
                          Edit address
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box>
                        <TextField
                          label="Address"
                          // variant="outlined"
                          fullWidth
                          multiline
                          rows={2}
                          value={addressText}
                          onChange={(e) => setAddressText(e.target.value)}
                          // value={review}
                          // onChange={handleReviewChange}
                          // backgroundColor="white"
                          sx={{ backgroundColor: "white", borderRadius: "5px" }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            marginTop: "10px",
                            maxWidth: "100%",
                            border: "1px solid red",
                            gap: "4%",
                          }}
                        >
                          <TextField
                            label="City"
                            // variant="outlined"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            // value={review}
                            // onChange={handleReviewChange}
                            // backgroundColor="white"
                            sx={{
                              width: "48%",
                              backgroundColor: "white",
                              borderRadius: "5px",
                            }}
                          />
                          <TextField
                            label="State"
                            // variant="outlined"

                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            // value={review}
                            // onChange={handleReviewChange}
                            // backgroundColor="white"
                            sx={{
                              width: "48%",
                              backgroundColor: "white",
                              borderRadius: "5px",
                            }}
                          />
                        </Box>

                        <Button
                          variant="text"
                          color="error"
                          sx={{ marginLeft: "10px" }}
                          onClick={handleSaveAddress}
                        >
                          save address
                        </Button>
                      </Box>
                    </>
                  )}
                </Grid>
              </Grid>
              {/* button */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Box></Box>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ padding: "10px 20px" }}
                  onClick={handledoneAddress}
                >
                  Continue
                </Button>
              </Box>
            </>
          )}
        </Box>
        {/* last box */}
        <Box
          sx={{
            padding: "20px",
            maxWidth: "900px",
            margin: "auto",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            // color: "1px solid red",
            mt: 3,
          }}
        >
          {!doneAddress ? (
            <Typography variant="h6" align="center">
              Address Details
            </Typography>
          ) : (
            <>
              <Typography variant="h6" gutterBottom mb={5}>
                Order Summary
              </Typography>

              <Grid container spacing={2} sx={{ border: "" }}>
                {/* Left side with book image and details */}
                <Grid item xs={12} sm={3} sx={{ border: "" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 120, height: 180 }}
                      image={img1}
                      alt="Don't Make Me Think"
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={5}
                  sx={{ border: "", textAlign: "left" }}
                >
                  <Box>
                    {/* <Typography component="div" variant="subtitle1"> */}
                    <Typography variant="h6">{item?.name}</Typography>
                    <Typography variant="body1" color="text.secondary">
                      by {item?.author}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ marginTop: "10px", fontweight: "bold" }}
                    >
                      Rs. {item?.price * item?.quantity}{" "}
                      <Typography
                        component="span"
                        sx={{
                          textDecoration: "line-through",
                          color: "grey",
                          marginLeft: "8px",
                        }}
                      >
                        Rs.{" "}
                        {Math.round(item?.price * (100 / 80)) * item?.quantity}
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>

                {/* Right side with location dropdown */}
                <Grid item xs={12} sm={4}>
                  {/* <TextField
                    select
                    label="Use current location"
                    defaultValue="current-location"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <LocationOnIcon sx={{ marginRight: "8px" }} />
                      ),
                    }}
                  >
                    <MenuItem value="current-location">
                      Use current location
                    </MenuItem>
                    <MenuItem value="enter-address">
                      Enter address manually
                    </MenuItem>
                  </TextField> */}
                </Grid>
              </Grid>

              {/* Quantity controls and actions */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Box></Box>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ padding: "10px 20px" }}
                  onClick={placeorder}
                >
                  PLACE ORDER
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="LOGIN" />
            <Tab label="SIGNUP" />
          </Tabs>

          {activeTab === 0 ? (
            <form>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Login
              </Typography>
              <TextField
                label="Email Id"
                name="email"
                onChange={handleInput}
                type="email"
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Password"
                name="password"
                onChange={handleInput}
                type="password"
                fullWidth
                required
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSignIn}
              >
                Login
              </Button>
            </form>
          ) : (
            <form>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Signup
              </Typography>
              <TextField
                label="First Name"
                name="first_name"
                onChange={handleRegInput}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Last Name"
                name="last_name"
                onChange={handleRegInput}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Email Id"
                name="email"
                onChange={handleRegInput}
                type="email"
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                onChange={handleRegInput}
                fullWidth
                required
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSignUp}
              >
                Signup
              </Button>
            </form>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default MyCart;
