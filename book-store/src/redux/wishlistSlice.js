import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistItems: (state, action) => {
      state.wishlistItems = action.payload;
    },
    addBookToWishlist: (state, action) => {
      const newBook = action.payload;
      const existingBook = state.wishlistItems.find(
        (item) => item.id === newBook.id
      );
      if (!existingBook) {
        state.wishlistItems.push(newBook);
      }
    },
    removeBookFromWishlist: (state, action) => {
      const bookId = action.payload;
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== bookId
      );
    },
  },
});

export const { setWishlistItems, addBookToWishlist, removeBookFromWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
