import { createSlice } from "@reduxjs/toolkit";
const normalSlice = createSlice({
  name: "normal",
  initialState: {
    searchQuery: "",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = normalSlice.actions;
export default normalSlice.reducer;