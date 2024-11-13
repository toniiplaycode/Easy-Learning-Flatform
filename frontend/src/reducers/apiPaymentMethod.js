import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";
import { toast } from "react-toastify";

const initialState = {
  paymentMethods: [],
  statusFetchPaymentMethod: "idle",
};

export const fetchAllPaymentMethod = createAsyncThunk(
  "apiPaymentMethod/fetchAllPaymentMethod",
  async () => {
    const response = await axios.get(
      `${url}/api/paymentMethod/getAllPaymentMethod`
    );
    return response.data;
  }
);

export const deletePaymentMethod = createAsyncThunk(
  "apiPaymentMethod/deletePaymentMethod",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; //lấy token bên apiLoginLogout
    const config = {
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.delete(
      `${url}/api/paymentMethod/deletePaymentMethod`,
      config
    );
    thunkAPI.dispatch(fetchAllPaymentMethod());
    toast.success("Xóa phương thức thành công !");
    return res.data;
  }
);

export const addPaymentMethod = createAsyncThunk(
  "apiPaymentMethod/addPaymentMethod",
  async (obj, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; //lấy token bên apiLoginLogout
    const response = await axios.post(
      `${url}/api/paymentMethod/addPaymentMethod`,
      obj,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    thunkAPI.dispatch(fetchAllPaymentMethod());
    toast.success("Thêm phương thức thành công !");
    return response.data;
  }
);

const apiPaymentMethod = createSlice({
  name: "apiPaymentMethod",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPaymentMethod.pending, (state) => {
        state.statusFetchPaymentMethod = "loading";
      })
      .addCase(fetchAllPaymentMethod.fulfilled, (state, action) => {
        state.statusFetchPaymentMethod = "succeeded";
        state.paymentMethods = action.payload.paymentMethod;
      })
      .addCase(fetchAllPaymentMethod.rejected, (state, action) => {
        state.statusFetchPaymentMethod = "failed";
      });
  },
});

export default apiPaymentMethod.reducer;
