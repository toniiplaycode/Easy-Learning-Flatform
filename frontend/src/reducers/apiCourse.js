import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";
import { toast } from "react-toastify";

const initialState = {
  courses: [],
  detailCourse: {},
  courseInstructor: [],
  statusFetch: "idle",
  statusFetchDetail: "idle",
  statusFetchCourseInstructor: "idle",
  statusAddCourse: "idle",
};

export const fetchCourse = createAsyncThunk(
  "apiCourse/fetchCourse",
  async () => {
    const response = await axios.get(`${url}/api/course/getAllCourse`);
    return response.data;
  }
);

export const fetchDetailCourse = createAsyncThunk(
  "apiCourse/fetchDetailCourse",
  async (id) => {
    const response = await axios.get(`${url}/api/course/detailCourse`, {
      params: {
        id: id,
      },
    });
    return response.data;
  }
);

export const fetchCourseInstructor = createAsyncThunk(
  "apiCourse/fetchCourseInstructor",
  async (_, thunkAPI) => {
    const inforUser = thunkAPI.getState().apiLoginLogout.inforUser; //lấy inforUser bên apiLoginLogout

    const response = await axios.get(`${url}/api/course/getCourseInstructor`, {
      params: {
        instructor_id: inforUser.id,
      },
    });
    return response.data;
  }
);

export const addCourse = createAsyncThunk(
  "apiCourse/addCourse",
  async (obj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().apiLoginLogout.token; // lấy token bên apiLoginLogout

      const response = await axios.post(`${url}/api/course/addCourse`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      thunkAPI.dispatch(fetchCourseInstructor());
      thunkAPI.dispatch(fetchCourse());
      if (response.data.message == "OK")
        toast.success("Bạn đã thêm khóa học thành công !");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCourse = createAsyncThunk(
  "apiCourse/updateCourse",
  async (obj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().apiLoginLogout.token; // lấy token bên apiLoginLogout

      const response = await axios.put(`${url}/api/course/updateCourse`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      thunkAPI.dispatch(fetchCourseInstructor());
      thunkAPI.dispatch(fetchCourse());
      if (response.data.message == "OK")
        toast.success("Bạn đã cập nhật khóa học !");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "apiCourse/deleteCourse",
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
    const res = await axios.delete(`${url}/api/course/deleteCourse`, config);

    thunkAPI.dispatch(fetchCourseInstructor());
    thunkAPI.dispatch(fetchCourse());
    return res.data;
  }
);

const apiCourse = createSlice({
  name: "apiCourse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourse.pending, (state) => {
        state.statusFetch = "loading";
      })
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.statusFetch = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourse.rejected, (state, action) => {
        state.statusFetch = "failed";
      })

      .addCase(fetchDetailCourse.pending, (state) => {
        state.statusFetchDetail = "loading";
      })
      .addCase(fetchDetailCourse.fulfilled, (state, action) => {
        state.statusFetchDetail = "succeeded";
        state.detailCourse = action.payload;
      })
      .addCase(fetchDetailCourse.rejected, (state, action) => {
        state.statusFetchDetail = "failed";
      })

      .addCase(fetchCourseInstructor.pending, (state) => {
        state.statusFetchCourseInstructor = "loading";
      })
      .addCase(fetchCourseInstructor.fulfilled, (state, action) => {
        state.statusFetchCourseInstructor = "succeeded";
        state.courseInstructor = action.payload.course;
      })
      .addCase(fetchCourseInstructor.rejected, (state, action) => {
        state.statusFetchCourseInstructor = "failed";
      })

      .addCase(addCourse.pending, (state) => {
        state.statusAddCourse = "loading";
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.statusAddCourse = "succeeded";
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.statusAddCourse = "failed";
      });
  },
});

export default apiCourse.reducer;
