import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";

const initialState = {
  courses: [],
  detailCourse: {},
  statusFetch: "idle",
  statusFetchDetail: "idle",
};

export const fetchCourse = createAsyncThunk(
  "apiCourse/fetchCourse",
  async () => {
    const response = await axios.get(`${url}/api/course/getAllCourse`);
    return response.data;
  }
);

export const fetchDetailCourse = createAsyncThunk(
  "apiCourse/fetchDetailCourse",
  async (id) => {
    const response = await axios.get(`${url}/api/course/detailCourse`, {
      params: {
        id: id,
      },
    });
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
      })

      .addCase(fetchDetailCourse.pending, (state) => {
        state.statusFetchDetail = "loading";
      })
      .addCase(fetchDetailCourse.fulfilled, (state, action) => {
        state.statusFetchDetail = "succeeded";
        state.detailCourse = action.payload;
      })
      .addCase(fetchDetailCourse.rejected, (state, action) => {
        state.statusFetchDetail = "failed";
      });
  },
});

export default apiCourse.reducer;
