import React from "react";
import ActionAreaCard from "./Card";
import { useEffect, useState } from "react";

import { getBook } from "../Services/userServices";
import { Grid, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AllBooks = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // const navigate = useNavigate();

  const dispatch = useDispatch();
  const AllBooks = useSelector((state) => state.book.AllBooks);
  console.log("in All books", AllBooks);
  const searchQuery = useSelector((state) => state.normal.searchQuery);
  // const handleBook = (bookId) => {
  //   navigate(`/book/${bookId}`);
  // };
  const filterAllBooks = AllBooks.filter(
    (book) =>
      book.name && book.name.toLowerCase().includes(searchQuery?.toLowerCase())
  );
  const totalPages = Math.ceil(filterAllBooks.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const a = filterAllBooks.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
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
      {/* <div
        style={{
          display: "flex",
          border: "1px solid black",
          //   height: "75px", 
          width: "75%", 
          justifyContent: "center", 
          alignItems: "center", 
          margin: "auto",
        //   flexWrap: "wrap",
        }}
      >
        <Grid container spacing="2" justifyContent="center">
          {books.length > 0 ? (
            books.map((note, index) => (
              <Grid
                item
                key={index}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                style={{ marginBottom: "20px",border:"1px solid black",boxSizing:"border-box" }}

              >
                <ActionAreaCard />
              </Grid>
            ))
          ) : (
            <Typography>No notes to display</Typography>
          )}
        </Grid>
      </div> */}
      <div
        style={{
          display: "flex",
          // border: "1px solid black",
          height: "100vh",
          width: "75%",
          justifyContent: "center",
          alignItems: "left",
          margin: "auto",
          flexWrap: "wrap",
          boxSizing: "border-box",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {a.length > 0 ? (
            a.map((book, index) => (
              <Grid
                item
                key={index}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                style={{
                  marginBottom: "20px",
                  // border: "1px solid black",
                  boxSizing: "border-box",
                }}
              >
                <ActionAreaCard bookData={book} />
              </Grid>
            ))
          ) : (
            <Typography>No books to display</Typography>
          )}
        </Grid>
        <Stack spacing={2} mt={3}>
          <Pagination
            count={totalPages} // Total pages calculated from the books array
            page={page} // Current page
            onChange={handlePageChange}
            color="primary" // You can change the color or variant
          />
        </Stack>
      </div>
    </>
  );
};

export default AllBooks;
