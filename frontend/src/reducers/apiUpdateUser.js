import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchInforUser } from "./apiLoginLogout";
import { toast } from "react-toastify";
import { url } from "../utils/common";

const initialState = {
  statusUpdateUser: "idle",
};

export const putUpdateUser = createAsyncThunk(
  "apiUpdateUser/putUpdateUser",
  async (obj, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; //lấy token bên apiLoginLogout
    const res = await axios.put(`${url}/api/user/updateUser`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    thunkAPI.dispatch(fetchInforUser(obj.id)); // post xong tự động fetch lại
    if (res.data.message == "OK") {
      toast.success("Đã thay đổi thông tin !");
    }
    return res.data;
  }
);

const apiUpdateUser = createSlice({
  name: "apiUpdateUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(putUpdateUser.pending, (state) => {
        state.statusUpdateUser = "loading";
      })
      .addCase(putUpdateUser.fulfilled, (state, action) => {
        if (action.payload.message == "OK") {
          state.statusUpdateUser = "succeeded";
        }
      })
      .addCase(putUpdateUser.rejected, (state, action) => {
        state.statusUpdateUser = "failed";
      });
  },
});

export default apiUpdateUser.reducer;
