import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";
import { toast } from "react-toastify";

const initialState = {
  apiVideoYoutube: {},
  statusGetApiVideoYoutube: "idle",
  statusUploadVideoYoutube: "idle", // Status for uploading video
  idVideoUpload: "",
  error: null, // Error tracking
};

export const getApiVideoYoutube = createAsyncThunk(
  "apiYoutube/getApiVideoYoutube",
  async (id) => {
    const res = await axios.get(`${url}/api/youtube/video/${id}`);
    return res.data;
  }
);

export const uploadVideoYoutube = createAsyncThunk(
  "apiYoutube/uploadVideoYoutube",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/api/youtube/uploadVideo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error uploading video:",
        error.response?.data || error.message
      );
      toast.error("Failed to upload video. Please try again.");
      return rejectWithValue(error.response?.data || error.message);
    }
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
      })

      .addCase(uploadVideoYoutube.pending, (state) => {
        state.statusUploadVideoYoutube = "loading";
        state.error = null;
      })
      .addCase(uploadVideoYoutube.fulfilled, (state, action) => {
        state.statusUploadVideoYoutube = "succeeded";
        toast.success("Tải video lên youtube thành công!");
        state.idVideoUpload = action.payload.video.id;
      })
      .addCase(uploadVideoYoutube.rejected, (state, action) => {
        state.statusUploadVideoYoutube = "failed";
        state.error = action.payload;
        toast.error("Tải video lên youtube thất bại!");
      });
  },
});

export default apiYoutube.reducer;
