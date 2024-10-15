import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";
import { toast } from "react-toastify";

const initialState = {
  sectionEachCourse: [],
  statusFetchSectionEachCourse: "idle",
};

export const fetchSectionEachCourse = createAsyncThunk(
  "apiSection/fetchSectionEachCourse",
  async (id, thunkAPI) => {
    const response = await axios.get(
      `${url}/api/section/getSectionEachCourse`,
      {
        params: {
          course_id: id,
        },
      }
    );
    return response.data;
  }
);

export const addSection = createAsyncThunk(
  "apiSection/addSection",
  async (obj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().apiLoginLogout.token; // lấy token bên apiLoginLogout

      const response = await axios.post(`${url}/api/section/addSection`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      thunkAPI.dispatch(fetchSectionEachCourse(obj.course_id));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteSection = createAsyncThunk(
  "apiSection/deleteSection",
  async (obj, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; //lấy token bên apiLoginLogout
    const config = {
      params: {
        id: obj.id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.delete(`${url}/api/section/deleteSection`, config);

    thunkAPI.dispatch(fetchSectionEachCourse(obj.course_id));
    return res.data;
  }
);

export const updateSection = createAsyncThunk(
  "apiSection/updateSection",
  async (obj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().apiLoginLogout.token; // lấy token bên apiLoginLogout

      const response = await axios.put(
        `${url}/api/section/updateSection`,
        obj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      thunkAPI.dispatch(fetchSectionEachCourse(obj.course_id));
      if (response.data.message == "OK")
        toast.success("Bạn đã cập nhật chương !");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const apiSection = createSlice({
  name: "apiSection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSectionEachCourse.pending, (state) => {
        state.statusFetchSectionEachCourse = "loading";
      })
      .addCase(fetchSectionEachCourse.fulfilled, (state, action) => {
        state.statusFetchSectionEachCourse = "succeeded";
        state.sectionEachCourse = action.payload.sections;
      })
      .addCase(fetchSectionEachCourse.rejected, (state, action) => {
        state.statusFetchSectionEachCourse = "failed";
      });
  },
});

export default apiSection.reducer;
