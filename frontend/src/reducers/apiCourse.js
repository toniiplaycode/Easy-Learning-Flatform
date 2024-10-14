import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";

const initialState = {
  courses: [],
  detailCourse: {},
  courseInstructor: [],
  statusFetch: "idle",
  statusFetchDetail: "idle",
  statusFetchCourseInstructor: "idle",
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

export const fetchCourseInstructor = createAsyncThunk(
  "apiCourse/fetchCourseInstructor",
  async (_, thunkAPI) => {
    const inforUser = thunkAPI.getState().apiLoginLogout.inforUser; //lấy inforUser bên apiLoginLogout

    const response = await axios.get(`${url}/api/course/getCourseInstructor`, {
      params: {
        instructor_id: inforUser.id,
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
      })

      .addCase(fetchCourseInstructor.pending, (state) => {
        state.statusFetchCourseInstructor = "loading";
      })
      .addCase(fetchCourseInstructor.fulfilled, (state, action) => {
        state.statusFetchCourseInstructor = "succeeded";
        state.courseInstructor = action.payload.course;
      })
      .addCase(fetchCourseInstructor.rejected, (state, action) => {
        state.statusFetchCourseInstructor = "failed";
      });
  },
});

export default apiCourse.reducer;
