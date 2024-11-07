import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderedlistItems: [],
};

const orderedSlice = createSlice({
  name: "orderedlist",
  initialState,
  reducers: {
    setOrderedlistItems: (state, action) => {
      state.orderedlistItems = action.payload;
    },
    addToOrderdlist: (state, action) => {
      const order = action.payload;
      state.orderedlistItems.push(order);

      //   const existingBook = state.wishlistItems.find(
      //     (item) => item.id === newBook.id
      //   );
      //   if (!existingBook) {
      //     state.wishlistItems.push(newBook);
      //   }
    },
    // removeBookFromWishlist: (state, action) => {
    //   const bookId = action.payload;
    //   state.wishlistItems = state.wishlistItems.filter(
    //     (item) => item.id !== bookId
    //   );
    // },
  },
});

export const { setOrderedlistItems, addToOrderdlist } = orderedSlice.actions;
export default orderedSlice.reducer;
