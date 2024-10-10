import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";

const initialState = {
  categories: [],
  statusFetch: "idle",
};

export const fetchCategory = createAsyncThunk(
  "apiCategory/fetchCategory",
  async () => {
    const response = await axios.get(`${url}/api/category/getAllCategory`);
    return response.data;
  }
);

const apiCategory = createSlice({
  name: "apiCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.statusFetch = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.statusFetch = "succeeded";
        state.categories = action.payload.categories;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.statusFetch = "failed";
      });
  },
});

export default apiCategory.reducer;
