// import React from "react";
// import { Box, Typography, IconButton, Grid, Divider } from "@mui/material";
// import img from "../Home/img8a.png";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useSelector } from "react-redux";

// const OrderedListItem = ({ item, handleRemoveFav }) => {
//   const AllBooks = useSelector((state) => state.book.AllBooks);

//   // Helper function to get book details by ID
//   const getBookDetails = (bookId) => {
//     return AllBooks.find((book) => book.id === bookId);
//   };

//   return (
//     <>
//       <Box flex={2} mb={2}>
//         <Typography variant="h6" fontWeight="bold">
//           Order #{item.id}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           Total Price: Rs. {item.total_price}
//         </Typography>
//         <Typography variant="body2" color="textSecondary" mb={2}>
//           Total Quantity: {item.total_quantity}
//         </Typography>
//       </Box>
//       <Divider sx={{ my: 3 }} />
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={12}></Grid>

//         {/* <Grid
//         item
//         xs={12}
//         sm={2}
//         sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}
//       >
//         <IconButton color="error" aria-label="delete" onClick={handleRemoveFav}>
//           <DeleteIcon />
//         </IconButton>
//       </Grid> */}
//       </Grid>

//       {/* <Typography variant="h6" fontWeight="bold">
//             Order #{item.id}
//           </Typography>
//           <Typography variant="body2" color="textSecondary">
//             Total Price: Rs. {item.total_price}
//           </Typography>
//           <Typography variant="body2" color="textSecondary" mb={2}>
//             Total Quantity: {item.total_quantity}
//           </Typography> */}

//       {/* List each book in this order */}
//       {item.items.map((orderItem) => {
//         const bookDetails = getBookDetails(orderItem.book);
//         if (!bookDetails) return null; // Skip if book details not found
//         return (
//           <>
//             <Grid container spacing={2} sx={{ border: "1px solid red" }}>
//               <Grid item xs={12} sm={4}>
//                 <Box
//                   component="img"
//                   src={img}
//                   alt={`Order ${item.id}`}
//                   sx={{
//                     width: 80,
//                     height: 120,
//                     borderRadius: 1,
//                     mr: 2,
//                     objectFit: "cover",
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={8}>
//                 <Box flex={2}>
//                   <Box
//                     key={orderItem.id}
//                     mb={2}
//                     sx={{ borderTop: "1px solid #ddd", pb: 1 }}
//                   >
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       {bookDetails.name}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       by {bookDetails.author}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       Quantity: {orderItem.quantity}
//                     </Typography>
//                     <Typography variant="h6" color="primary">
//                       Rs. {orderItem.price}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       color="textSecondary"
//                       sx={{ textDecoration: "line-through" }}
//                     >
//                       Rs. {Math.round(orderItem.price * (100 / 80))}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Grid>
//             </Grid>
//           </>
//         );
//       })}
//     </>
//   );
// };

// export default OrderedListItem;

import React from "react";
import { Box, Typography, IconButton, Grid, Divider } from "@mui/material";
import img from "../Home/img8a.png";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";

const OrderedListItem = ({ item, handleRemoveFav }) => {
  const AllBooks = useSelector((state) => state.book.AllBooks);

  // Helper function to get book details by ID
  const getBookDetails = (bookId) => {
    return AllBooks.find((book) => book.id === bookId);
  };

  return (
    <>
      {/* Order Summary */}
      <Box mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Order #{item.id}
        </Typography>
        <Typography variant="h6" color="Primary">
          Total Price: Rs. {item.total_price}
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Total Quantity: {item.total_quantity}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* List each book in this order */}
      {item.items.map((orderItem, index) => {
        const bookDetails = getBookDetails(orderItem.book);
        if (!bookDetails) return null; // Skip if book details not found

        return (
          <React.Fragment key={orderItem.id}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={2}>
                <Box
                  component="img"
                  src={img}
                  alt={`Book cover of ${bookDetails.name}`}
                  sx={{
                    // width: 80,
                    // height: 120,
                    width: "50%",
                    height: "auto",
                    borderRadius: 1,
                    borderRadius: 1,
                    objectFit: "cover",
                  }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={10}
                sx={{
                  textAlign: "left",
                  paddingLeft: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {bookDetails.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  by {bookDetails.author}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Quantity: {orderItem.quantity}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h6" color="primary">
                    Rs. {orderItem.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ textDecoration: "line-through",ml:1 }}
                  >
                    Rs. {Math.round(orderItem.price * (100 / 80))}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            {index < item.items.length - 1 && <Divider sx={{ my: 2 }} />}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default OrderedListItem;
