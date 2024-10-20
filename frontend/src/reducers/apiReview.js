import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";
import { toast } from "react-toastify";
import { fetchCourse, fetchDetailCourse } from "./apiCourse";

const initialState = {
  cartEachUser: [],
  statusAddReview: "idle",
};

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

      toast.success("Bạn đánh giá đánh giá !");
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
      .addCase(addReview.pending, (state) => {
        state.statusAddReview = "loading";
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.statusAddReview = "succeeded";
        state.cartEachUser = action.payload.carts;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.statusAddReview = "failed";
      });
  },
});

export default apiReview.reducer;
