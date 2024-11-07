import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import bookSlice from "./bookSlice";
import wishlistSlice from "./wishlistSlice";
import addressSlice from "./addressSlice";
import normalSlice from "./normalSlice";
import orderedSlice from "./orderedSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    book: bookSlice,
    wishlist: wishlistSlice,
    address: addressSlice,
    normal: normalSlice,
    orderedlist: orderedSlice,
  },
});

export default store;
