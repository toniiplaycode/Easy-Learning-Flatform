import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
  statusFetch: "idle",
};

export const fetchCategory = createAsyncThunk(
  "apiCategory/fetchCategory",
  async () => {
    const response = await axios.get(`${url}/api/category/getAllCategory`);
    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  "apiCategory/addCategory",
  async (obj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().apiLoginLogout.token; // lấy token bên apiLoginLogout

      const response = await axios.post(
        `${url}/api/category/addCategory`,
        obj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Thêm thể loại thành công !");
      thunkAPI.dispatch(fetchCategory());
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const apiCategory = createSlice({
  name: "apiCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.statusFetch = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.statusFetch = "succeeded";
        state.categories = action.payload.categories;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.statusFetch = "failed";
      });
  },
});

export default apiCategory.reducer;
