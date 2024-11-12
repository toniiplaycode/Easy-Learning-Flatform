import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";
import { toast } from "react-toastify";

const initialState = {
  enrollmentEachUser: [],
  enrollmentAllUser: [],
  enrollmentAllCourse: [],
  statusFetchEnrollmentEachUser: "idle",
  statusPostEnrollment: "idle",
  statusFetchEnrollmentAllCourse: "idle",
  statusDeleteUserEnrollment: "idle",
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

export const fetchEnrollmentAllUser = createAsyncThunk(
  "apiEnrollment/fetchEnrollmentAllUser",
  async (course_id, thunkAPI) => {
    const response = await axios.get(
      `${url}/api/enrollment/getEnrollmentAllUser`,
      {
        params: {
          course_id: course_id,
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

export const fetchEnrollmentAllCourse = createAsyncThunk(
  "apiEnrollment/fetchEnrollmentAllCourse",
  async (instructor_id, thunkAPI) => {
    const response = await axios.get(
      `${url}/api/enrollment/getEnrollmentAllCourse`,
      {
        params: {
          instructor_id,
        },
      }
    );
    return response.data;
  }
);

export const deleteUserEnrollment = createAsyncThunk(
  "apiEnrollment/deleteUserEnrollment",
  async (obj, thunkAPI) => {
    console.log(obj);
    const token = thunkAPI.getState().apiLoginLogout.token; //lấy token bên apiLoginLogout
    const config = {
      params: {
        id: obj.id_enrollment,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.delete(
      `${url}/api/enrollment/deleteEnrollment`,
      config
    );
    thunkAPI.dispatch(fetchEnrollmentAllUser(obj.course_id));
    toast.success("Xóa người dùng khỏi khóa học thành công !");
    return res.data;
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

      .addCase(fetchEnrollmentAllUser.pending, (state) => {
        state.statusFetchEnrollmentEachUser = "loading";
      })
      .addCase(fetchEnrollmentAllUser.fulfilled, (state, action) => {
        state.statusFetchEnrollmentEachUser = "succeeded";
        state.enrollmentAllUser = action.payload.enrollments;
      })
      .addCase(fetchEnrollmentAllUser.rejected, (state, action) => {
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
      })

      .addCase(fetchEnrollmentAllCourse.pending, (state) => {
        state.statusFetchEnrollmentAllCourse = "loading";
      })
      .addCase(fetchEnrollmentAllCourse.fulfilled, (state, action) => {
        state.statusFetchEnrollmentAllCourse = "succeeded";
        state.enrollmentAllCourse = action.payload.enrollments;
      })
      .addCase(fetchEnrollmentAllCourse.rejected, (state, action) => {
        state.statusFetchEnrollmentAllCourse = "failed";
      })

      .addCase(deleteUserEnrollment.pending, (state) => {
        state.statusDeleteUserEnrollment = "loading";
      })
      .addCase(deleteUserEnrollment.fulfilled, (state, action) => {
        state.statusDeleteUserEnrollment = "succeeded";
      })
      .addCase(deleteUserEnrollment.rejected, (state, action) => {
        state.statusDeleteUserEnrollment = "failed";
      });
  },
});

export default apiEnrollment.reducer;
