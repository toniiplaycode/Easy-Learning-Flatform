import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";

const initialState = {
  courses: [],
  statusFetch: "idle",
};

export const fetchCourse = createAsyncThunk(
  "apiCourse/fetchCourse",
  async () => {
    const response = await axios.get(`${url}/api/course/getAllCourse`);
    return response.data;
  }
);

const apiCourse = createSlice({
  name: "apiCourse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourse.pending, (state) => {
        state.statusFetch = "loading";
      })
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.statusFetch = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourse.rejected, (state, action) => {
        state.statusFetch = "failed";
      });
  },
});

export default apiCourse.reducer;
