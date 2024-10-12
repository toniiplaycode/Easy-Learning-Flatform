import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";

const initialState = {
  coupons: [],
  statusFetchCoupon: "idle",
};

export const fetchCoupon = createAsyncThunk(
  "apiCoupon/fetchCoupon",
  async () => {
    const response = await axios.get(`${url}/api/coupon/getAllCoupon`);
    return response.data;
  }
);

const apiCoupon = createSlice({
  name: "apiCoupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupon.pending, (state) => {
        state.statusFetchCoupon = "loading";
      })
      .addCase(fetchCoupon.fulfilled, (state, action) => {
        state.statusFetchCoupon = "succeeded";
        state.coupons = action.payload.coupons;
      })
      .addCase(fetchCoupon.rejected, (state, action) => {
        state.statusFetchCoupon = "failed";
      });
  },
});

export default apiCoupon.reducer;
