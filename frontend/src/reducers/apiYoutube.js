import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";
import { toast } from "react-toastify";

const initialState = {
  apiVideoYoutube: {},
  statusGetApiVideoYoutube: "idle",
};

export const getApiVideoYoutube = createAsyncThunk(
  "apiYoutube/getApiVideoYoutube",
  async (id) => {
    const res = await axios.get(`${url}/api/youtube/video/${id}`);
    return res.data;
  }
);

const apiYoutube = createSlice({
  name: "apiYoutube",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApiVideoYoutube.pending, (state) => {
        state.statusGetApiVideoYoutube = "loading";
      })
      .addCase(getApiVideoYoutube.fulfilled, (state, action) => {
        if (action.payload.items.length == 0) {
          toast.warning("Video này không tồn tại !");
          return;
        }
        state.apiVideoYoutube = action.payload;
        state.statusGetApiVideoYoutube = "succeeded";
      })
      .addCase(getApiVideoYoutube.rejected, (state, action) => {
        state.statusGetApiVideoYoutube = "failed";
      });
  },
});

export default apiYoutube.reducer;
