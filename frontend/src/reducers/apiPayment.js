import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";

const initialState = {
  paymentAllCourse: [],
  statusPostPayment: "idle",
  statusFetchPaymentAllCourse: "idle",
};

export const addPaymentEachUser = createAsyncThunk(
  "apiPayment/addPaymentEachUser",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; // Lấy token từ redux state
    const inforUser = thunkAPI.getState().apiLoginLogout.inforUser; // Lấy thông tin user từ redux state

    const obj = {
      course_id: data.course_id,
      user_id: inforUser.id,
      amount: data.amount,
      payment_method_id: data.payment_method_id,
      status: "pending", // Thanh toán ban đầu ở trạng thái "pending"
    };

    try {
      // Gửi yêu cầu POST tới backend
      const response = await axios.post(`${url}/api/payment/addPayment`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kiểm tra nếu response chứa `approvalUrl`
      if (response.data.approvalUrl) {
        // Chuyển hướng người dùng đến trang PayPal
        window.location.href = response.data.approvalUrl;
      } else {
        return thunkAPI.rejectWithValue("Approval URL not found in response");
      }
    } catch (error) {
      console.error("Error creating PayPal payment:", error);
      return thunkAPI.rejectWithValue(error.response?.data || "Payment failed");
    }
  }
);

export const fetchAllPaymentAllCourse = createAsyncThunk(
  "apiPayment/fetchAllPaymentAllCourse",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; //lấy token bên apiLoginLogout
    const inforUser = thunkAPI.getState().apiLoginLogout.inforUser; //lấy inforUser bên apiLoginLogout

    const response = await axios.get(
      `${url}/api/payment/getAllPaymentAllCourse`,
      {
        params: {
          instructor_id: inforUser.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const apiPayment = createSlice({
  name: "apiPayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPaymentEachUser.pending, (state) => {
        state.statusPostPayment = "loading";
      })
      .addCase(addPaymentEachUser.fulfilled, (state, action) => {
        state.statusPostPayment = "succeeded";
      })
      .addCase(addPaymentEachUser.rejected, (state, action) => {
        state.statusPostPayment = "failed";
      })

      .addCase(fetchAllPaymentAllCourse.pending, (state) => {
        state.statusFetchPaymentAllCourse = "loading";
      })
      .addCase(fetchAllPaymentAllCourse.fulfilled, (state, action) => {
        state.statusFetchPaymentAllCourse = "succeeded";
        state.paymentAllCourse = action.payload.payments;
      })
      .addCase(fetchAllPaymentAllCourse.rejected, (state, action) => {
        state.statusFetchPaymentAllCourse = "failed";
      });
  },
});

export default apiPayment.reducer;
