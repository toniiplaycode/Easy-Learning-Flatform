import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";

const initialState = {
  enrollmentEachUser: [],
  statusFetchEnrollmentEachUser: "idle",
};

export const fetchEnrollmentEachUser = createAsyncThunk(
  "apiEnrollment/fetchEnrollmentEachUser",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; //lấy token bên apiLoginLogout
    const response = await axios.get(
      `${url}/api/enrollment/getEnrollmentEachUser`,
      {
        params: {
          user_id: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const apiEnrollment = createSlice({
  name: "apiEnrollment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollmentEachUser.pending, (state) => {
        state.statusFetchEnrollmentEachUser = "loading";
      })
      .addCase(fetchEnrollmentEachUser.fulfilled, (state, action) => {
        state.statusFetchEnrollmentEachUser = "succeeded";
        state.enrollmentEachUser = action.payload.enrollments;
      })
      .addCase(fetchEnrollmentEachUser.rejected, (state, action) => {
        state.statusFetchEnrollmentEachUser = "failed";
      });
  },
});

export default apiEnrollment.reducer;
