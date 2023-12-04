// reducers/subcategoriesReducer.js

import { createSlice } from "@reduxjs/toolkit";

const subcategoriesSlice = createSlice({
  name: "subcategories",
  initialState: [],
  reducers: {
    setSubcategories: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSubcategories } = subcategoriesSlice.actions;

export default subcategoriesSlice.reducer;