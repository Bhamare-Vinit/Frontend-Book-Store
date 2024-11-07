// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import CardActionArea from "@mui/material/CardActionArea";
import img1 from "./img8a.png";

// export default function ActionAreaCard() {
//   return (
//     <Card sx={{ maxWidth: "90%" }}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height="140"
//           image={img1}
//           alt="green iguana"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             Lizard
//           </Typography>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>
//             Lizards are a widespread group of squamate
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }

import * as React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const OldPrice = styled("span")({
  textDecoration: "line-through",
  color: "#9e9e9e",
  fontSize: "14px",
  marginLeft: "8px",
});

export default function ActionAreaCard({ bookData }) {
  const navigate = useNavigate();

  const { name, author, price } = bookData;
  console.log("bookData:", bookData.name);
  const handleBook = (bookId) => {
    navigate(`/home/${bookId}`);
  };

  return (
    <Card
      onClick={() => handleBook(bookData.id)}
      sx={{
        maxWidth: "90%",
        boxShadow: 3,
        padding: "0px",
        backgroundColor: "#F5F5F5",
      }}
    >
      <CardActionArea>
        {/* Book Image */}
        <CardMedia
          component="img"
          height="150"
          image={img1}
          alt="Book Image"
          sx={{
            objectFit: "contain",
            marginTop: "10px",
            marginBottom: "10px",
            backgroundColor: "#F5F5F5",
          }}
        />

        <CardContent sx={{ backgroundColor: "#FFFFFF" }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
              textAlign: "left",
              marginLeft: "8px",
            }}
          >
            {name}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: "12px",
              fontColor: "#878787",
              marginLeft: "8px",
              textAlign: "left",
            }}
          >
            {author}
          </Typography>

          {/* Rating Section */}
          <Stack direction="row" alignItems="center" sx={{ marginTop: "8px" }}>
            {/* <Rating name="read-only" value={4.5} precision={0.5} readOnly /> */}
            <Typography
              variant="body2"
              sx={{
                marginLeft: "8px",
                backgroundColor: "#388E3C",
                color: "white",
                padding: "4px 4px",
                borderRadius: "4px",
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
              marginTop: "8px",
              display: "flex",
              marginLeft: "8px",
              alignItems: "center",
            }}
          >
            <Typography
              //   variant="h6"
              sx={{ color: "black", fontWeight: "bold" }}
            >
              {price}
            </Typography>
            <OldPrice>Rs. {Math.round(price * (100 / 80))}</OldPrice>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
