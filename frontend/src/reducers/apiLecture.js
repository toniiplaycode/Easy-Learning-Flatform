import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";
import { toast } from "react-toastify";

const initialState = {
  lectures: [],
  statusAddLecture: "idle",
};

export const addLecture = createAsyncThunk(
  "apiLecture/addLecture",
  async (obj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().apiLoginLogout.token; // lấy token bên apiLoginLogout
      const inforUser = thunkAPI.getState().apiLoginLogout.inforUser; // lấy inforUser bên apiLoginLogout

      const response = await axios.post(`${url}/api/lecture/addLecture`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Đã thêm bài giảng!");
      //   thunkAPI.dispatch(fetchCartEachUser());
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
      });
  },
});

export default apiLecture.reducer;
