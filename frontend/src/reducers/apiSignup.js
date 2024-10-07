import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";

const initialState = {
  statusPostSignUp: "idle",
};

export const postSignup = createAsyncThunk(
  "apiSignup/postSignup",
  async (obj) => {
    const res = await axios.post(`${url}/api/user/registerUser`, obj);
    return res.data;
  }
);

const apiSignup = createSlice({
  name: "apiSignup",
  initialState,
  reducers: {
    clearStatusSignUp(state, action) {
      state.statusPostSignUp = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSignup.pending, (state) => {
        state.statusPostSignUp = "loading";
      })
      .addCase(postSignup.fulfilled, (state, action) => {
        if (action.payload.message == "OK") {
          state.statusPostSignUp = "succeeded";
        }
        if (action.payload.message == "email already exist") {
          state.statusPostSignUp = "email exist";
        }
      })
      .addCase(postSignup.rejected, (state, action) => {
        state.statusPostSignUp = "failed";
      });
  },
});

export const { clearStatusSignUp } = apiSignup.actions;

export default apiSignup.reducer;
