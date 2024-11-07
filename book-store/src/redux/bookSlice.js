import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AllBooks: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setAllBooks: (state, action) => {
      state.AllBooks = action.payload;
    },
    // updateBook: (state, action) => {
    //   const { id, updatedBookData } = action.payload;
    //   state.AllBooks = state.AllBooks.map((book) =>
    //     book.id === id ? { ...book, ...updatedBookData } : book
    //   );
    // },
    // removeBook: (state, action) => {
    //   const bookId = action.payload;
    //   state.AllBooks = state.AllBooks.filter((book) => book.id !== bookId);
    // },
    // addBook: (state, action) => {
    //   state.AllBooks.unshift(action.payload); // Add new note to the beginning of the array
    // },
  },
});

// export const { setAllBooks, updateBook, removeBook, addBook } =
//   bookSlice.actions;
export const { setAllBooks } = bookSlice.actions;
export default bookSlice.reducer;
