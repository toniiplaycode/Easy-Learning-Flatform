import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showTrailer: false,
  videoUrl: "",
};

const modalTrailer = createSlice({
  name: "modalTrailer",
  initialState,
  reducers: {
    toggleTrailer(state) {
      state.showTrailer = !state.showTrailer;
    },
    saveUrl(state, action) {
      state.videoUrl = action.payload;
    },
  },
});

export const { toggleTrailer, saveUrl } = modalTrailer.actions;

export default modalTrailer.reducer;
