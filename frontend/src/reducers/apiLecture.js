import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";
import { toast } from "react-toastify";
import { fetchSectionAllLectureEachCourse } from "./apiSection";

const initialState = {
  lectures: [],
  allLecture: [],
  statusAddLecture: "idle",
  statusAllLecture: "idle",
};

export const addLecture = createAsyncThunk(
  "apiLecture/addLecture",
  async (obj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().apiLoginLogout.token; // lấy token bên apiLoginLogout

      // Lấy hết các trường nhưng bỏ qua `course_id`
      const { course_id, ...rest } = obj;

      const response = await axios.post(`${url}/api/lecture/addLecture`, rest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Đã thêm bài giảng!");
      thunkAPI.dispatch(fetchSectionAllLectureEachCourse(obj.course_id));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteLecture = createAsyncThunk(
  "apiLecture/deleteLecture",
  async (obj, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; //lấy token bên apiLoginLogout
    const config = {
      params: {
        id: obj.id,
        course_id: obj.course_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.delete(`${url}/api/lecture/deleteLecture`, config);
    thunkAPI.dispatch(fetchSectionAllLectureEachCourse(obj.course_id));
    return res.data;
  }
);

export const updateLecture = createAsyncThunk(
  "apiLecture/updateLecture",
  async (obj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().apiLoginLogout.token; // lấy token bên apiLoginLogout

      // Lấy hết các trường nhưng bỏ qua `course_id`
      const { course_id, ...rest } = obj;

      const response = await axios.put(
        `${url}/api/lecture/updateLecture`,
        rest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Đã sửa bài giảng!");
      thunkAPI.dispatch(fetchSectionAllLectureEachCourse(obj.course_id));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAllLecture = createAsyncThunk(
  "apiLecture/fetchAllLecture",
  async () => {
    try {
      const response = await axios.get(`${url}/api/lecture/getAllLecture`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const apiLecture = createSlice({
  name: "apiLecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addLecture.pending, (state) => {
        state.statusAddLecture = "loading";
      })
      .addCase(addLecture.fulfilled, (state, action) => {
        state.statusAddLecture = "succeeded";
      })
      .addCase(addLecture.rejected, (state, action) => {
        state.statusAddLecture = "failed";
      })

      .addCase(fetchAllLecture.pending, (state) => {
        state.statusAllLecture = "loading";
      })
      .addCase(fetchAllLecture.fulfilled, (state, action) => {
        state.allLecture = action.payload.lectures;
        state.statusAllLecture = "succeeded";
      })
      .addCase(fetchAllLecture.rejected, (state, action) => {
        state.statusAllLecture = "failed";
      });
  },
});

export default apiLecture.reducer;
