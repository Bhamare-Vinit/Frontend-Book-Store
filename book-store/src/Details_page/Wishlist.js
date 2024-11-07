import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import WishlistItem from "./WishlistItem";
import { getWishlist } from "../Services/userServices";
import { useDispatch, useSelector } from "react-redux";

const Wishlist = () => {
  const [wish, setWish] = useState([]);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  // const fetchWish = async () => {
  //   const res = await getWishlist();
  //   setWish(res.data);
  // };

  // useEffect(() => {
  //   fetchWish();
  //   console.log("wish", wish);
  // }, []);

  // const wishlistItems = [
  //   {
  //     id: 1,
  //     title: "Don't Make Me Think",
  //     author: "Steve Krug",
  //     price: 1500,
  //     originalPrice: 2000,
  //     image: "link_to_image1", // Replace with actual image URL
  //   },
  //   {
  //     id: 2,
  //     title: "React Material-UI",
  //     author: "Cookbook",
  //     price: 780,
  //     originalPrice: 1000,
  //     image: "link_to_image2", // Replace with actual image URL
  //   },
  // ];
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
      <Container maxWidth="lg" sx={{ my: 1 }}>
        <Typography variant="h5" gutterBottom>
          My Wishlist ({wishlistItems.length})
        </Typography>
        {wishlistItems.length < 1 ? (
          <Typography variant="h6" my={5}>
            Your wishlist is empty
          </Typography>
        ) : (
          <>
            {wishlistItems.map((item, index) => (
              <Card
                variant="outlined"
                sx={{
                  my: 2,
                  borderColor: "grey.400", // Adjust to make border darker
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <React.Fragment key={item.id}>
                    <WishlistItem item={item} />
                    {/* {index < wishlistItems.length - 1 && (
                      <Divider sx={{ my: 3 }} />
                    )} */}
                  </React.Fragment>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </Container>
    </>
  );
};

export default Wishlist;
