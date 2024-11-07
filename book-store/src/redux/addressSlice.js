// addressSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: {
    name: "",
    mobileNumber: "",
    city: "",
    state: "",
    address: "",
  },
  isEditing: false,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    toggleEdit: (state) => {
      state.isEditing = !state.isEditing;
    },
  },
});

export const { setAddress, toggleEdit } = addressSlice.actions;
export default addressSlice.reducer;
