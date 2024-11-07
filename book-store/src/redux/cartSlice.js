import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.CartItems = action.payload;
    },
    updateCart: (state, action) => {
      const { id, quantity } = action.payload;
      state.CartItems = state.CartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    },
    removeCart: (state, action) => {
      const cartId = action.payload;
      state.CartItems = state.CartItems.filter((item) => item.id !== cartId);
    },
    addCart: (state, action) => {
      state.CartItems.unshift(action.payload);
    },
  },
});

export const { setCartItems, updateCart, removeCart, addCart } =
  cartSlice.actions;
export default cartSlice.reducer;
