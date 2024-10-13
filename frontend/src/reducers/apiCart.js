import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";
import { toast } from "react-toastify";

const initialState = {
  cartEachUser: [],
  statusFetchCartEachUser: "idle",
};

export const fetchCartEachUser = createAsyncThunk(
  "apiCart/fetchCartEachUser",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; //lấy token bên apiLoginLogout
    const inforUser = thunkAPI.getState().apiLoginLogout.inforUser; //lấy inforUser bên apiLoginLogout
    const response = await axios.get(`${url}/api/cart/getCartEachUser`, {
      params: {
        user_id: inforUser.id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteCart = createAsyncThunk(
  "apiCart/deleteCart",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; //lấy token bên apiLoginLogout
    const config = {
      params: {
        id: id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.delete(`${url}/api/cart/deleteCart`, config);
    thunkAPI.dispatch(fetchCartEachUser());
    return res.data;
  }
);

export const addCart = createAsyncThunk(
  "apiCart/addCart",
  async (course_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().apiLoginLogout.token; // lấy token bên apiLoginLogout
      const inforUser = thunkAPI.getState().apiLoginLogout.inforUser; // lấy inforUser bên apiLoginLogout
      const obj = {
        user_id: inforUser.id,
        course_id,
      };

      const response = await axios.post(`${url}/api/cart/addCart`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Đã thêm khóa học vào giỏ hàng!");
      thunkAPI.dispatch(fetchCartEachUser());
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error;

        if (errorMessage === "Course already in Cart") {
          toast.warning("Khóa học đã tồn tại trong giỏ hàng!");
        } else if (errorMessage === "You enrollment in course") {
          toast.warning("Bạn đã tham gia khóa học này!");
        }
      }
    }
  }
);

const apiCart = createSlice({
  name: "apiCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartEachUser.pending, (state) => {
        state.statusFetchCartEachUser = "loading";
      })
      .addCase(fetchCartEachUser.fulfilled, (state, action) => {
        state.statusFetchCartEachUser = "succeeded";
        state.cartEachUser = action.payload.carts;
      })
      .addCase(fetchCartEachUser.rejected, (state, action) => {
        state.statusFetchCartEachUser = "failed";
      });
  },
});

export default apiCart.reducer;
