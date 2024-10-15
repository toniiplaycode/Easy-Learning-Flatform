import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";
import { toast } from "react-toastify";

const initialState = {
  enrollmentEachUser: [],
  statusFetchEnrollmentEachUser: "idle",
  statusPostEnrollment: "idle",
};

export const fetchEnrollmentEachUser = createAsyncThunk(
  "apiEnrollment/fetchEnrollmentEachUser",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; //lấy token bên apiLoginLogout
    const inforUser = thunkAPI.getState().apiLoginLogout.inforUser; //lấy inforUser bên apiLoginLogout
    const response = await axios.get(
      `${url}/api/enrollment/getEnrollmentEachUser`,
      {
        params: {
          user_id: inforUser.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const addEnrollmentEachUser = createAsyncThunk(
  "apiEnrollment/addEnrollmentEachUser",
  async (listCourseId, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; //lấy token bên apiLoginLogout
    const inforUser = thunkAPI.getState().apiLoginLogout.inforUser; //lấy inforUser bên apiLoginLogout
    const obj = {
      user_id: inforUser.id,
      course_id: listCourseId, // array
    };
    const response = await axios.post(
      `${url}/api/enrollment/addEnrollment`,
      obj,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    thunkAPI.dispatch(fetchEnrollmentEachUser());
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
      })

      .addCase(addEnrollmentEachUser.pending, (state) => {
        state.statusPostEnrollment = "loading";
      })
      .addCase(addEnrollmentEachUser.fulfilled, (state, action) => {
        state.statusPostEnrollment = "succeeded";
        toast.success("Bạn đã tham gia khóa học !");
      })
      .addCase(addEnrollmentEachUser.rejected, (state, action) => {
        state.statusPostEnrollment = "failed";
      });
  },
});

export default apiEnrollment.reducer;