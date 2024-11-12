import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";
import { toast } from "react-toastify";
import { fetchCourse, fetchDetailCourse } from "./apiCourse";

const initialState = {
  reviewCourse: [],
  statusGetReviewCourse: "idle",
};

export const getReviewCourse = createAsyncThunk(
  "apiReview/getReviewCourse",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/api/review/getReviewCourse`, {
        params: {
          course_id: id,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addReview = createAsyncThunk(
  "apiReview/addReview",
  async (obj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().apiLoginLogout.token; // lấy token bên apiLoginLogout

      const response = await axios.post(`${url}/api/review/addReview`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Bạn đã đánh giá khóa học !");
      thunkAPI.dispatch(fetchDetailCourse(obj.course_id));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "apiReview/deleteReview",
  async (obj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().apiLoginLogout.token; // lấy token bên apiLoginLogout

      const config = {
        params: {
          id: obj.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `${url}/api/review/deleteReview`,
        config
      );

      thunkAPI.dispatch(fetchCourse());
      thunkAPI.dispatch(fetchDetailCourse(obj.course_id));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateReview = createAsyncThunk(
  "apiReview/updateReview",
  async (obj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().apiLoginLogout.token; // lấy token bên apiLoginLogout

      const response = await axios.put(`${url}/api/review/updateReview`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Bạn sửa đánh giá !");
      thunkAPI.dispatch(fetchDetailCourse(obj.course_id));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const apiReview = createSlice({
  name: "apiReview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviewCourse.pending, (state) => {
        state.statusGetReviewCourse = "loading";
      })
      .addCase(getReviewCourse.fulfilled, (state, action) => {
        state.statusGetReviewCourse = "succeeded";
        state.reviewCourse = action.payload.reviews;
      })
      .addCase(getReviewCourse.rejected, (state, action) => {
        state.statusGetReviewCourse = "failed";
      });
  },
});

export default apiReview.reducer;
