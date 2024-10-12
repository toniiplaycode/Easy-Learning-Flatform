import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  searchValue: "",
};

const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchCourse(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { searchCourse } = search.actions;

export default search.reducer;
