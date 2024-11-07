import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import OrderedListItem from "./OrderedListItem";
import { useDispatch, useSelector } from "react-redux";

const OrderedList = () => {
  const orderedlistItems = useSelector(
    (state) => state.orderedlist.orderedlistItems
  );
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
          My Wishlist ({orderedlistItems.length})
        </Typography>
        {orderedlistItems.length < 1 ? (
          <Typography variant="h6" my={5}>
            Your wishlist is empty
          </Typography>
        ) : (
          <>
            {orderedlistItems.map((item, index) => (
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
                    <OrderedListItem item={item} />
                    {/* {index < orderedlistItems.length - 1 && (
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

export default OrderedList;
