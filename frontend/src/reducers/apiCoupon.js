import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";
import { toast } from "react-toastify";

const initialState = {
  coupons: [],
  couponEachCourse: [],
  statusFetchCoupon: "idle",
  statusFetchCouponEachCourse: "idle",
};

export const fetchCoupon = createAsyncThunk(
  "apiCoupon/fetchCoupon",
  async () => {
    const response = await axios.get(`${url}/api/coupon/getAllCoupon`);
    return response.data;
  }
);

export const fetchCouponEachCourse = createAsyncThunk(
  "apiCoupon/fetchCouponEachCourse",
  async (course_id, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; //lấy token bên apiLoginLogout
    const response = await axios.get(`${url}/api/coupon/getCouponEachCourse`, {
      params: {
        course_id: course_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
);

export const addCoupon = createAsyncThunk(
  "apiCoupon/addCoupon",
  async (obj, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; //lấy token bên apiLoginLogout
    const response = await axios.post(`${url}/api/coupon/addCoupon`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Thêm mã giảm giá thành công !");
    thunkAPI.dispatch(fetchCouponEachCourse(obj.course_id));
    return response.data;
  }
);

export const deleteCoupon = createAsyncThunk(
  "apiCoupon/deleteCoupon",
  async (obj, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; //lấy token bên apiLoginLogout
    const response = await axios.delete(`${url}/api/coupon/deleteCoupon`, {
      params: {
        id: obj.id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Xóa giảm giá thành công !");
    thunkAPI.dispatch(fetchCouponEachCourse(obj.course_id));
    return response.data;
  }
);

export const updateCoupon = createAsyncThunk(
  "apiCoupon/updateCoupon",
  async (obj, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; //lấy token bên apiLoginLogout
    const response = await axios.put(`${url}/api/coupon/updateCoupon`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Sửa mã giảm giá thành công !");
    thunkAPI.dispatch(fetchCouponEachCourse(obj.course_id));
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
      })

      .addCase(fetchCouponEachCourse.pending, (state) => {
        state.statusFetchCouponEachCourse = "loading";
      })
      .addCase(fetchCouponEachCourse.fulfilled, (state, action) => {
        state.statusFetchCouponEachCourse = "succeeded";
        state.couponEachCourse = action.payload.coupons;
      })
      .addCase(fetchCouponEachCourse.rejected, (state, action) => {
        state.statusFetchCouponEachCourse = "failed";
      });
  },
});

export default apiCoupon.reducer;
