import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";

const initialState = {
  token:
    localStorage.getItem("token") != undefined
      ? localStorage.getItem("token")
      : "",
  inforUser:
    localStorage.getItem("inforUser") != undefined
      ? JSON.parse(localStorage.getItem("inforUser"))
      : {},
  statusPostLogin: "idle",
  statusFetchLogin: "idle",
  statusLogout: "idle",
  error: null,
};

export const postLogin = createAsyncThunk(
  "apiLoginLogout/postLogin",
  async (obj) => {
    const res = await axios.post(`${url}/api/user/loginUser`, obj);
    return res.data;
  }
);

export const fetchInforUser = createAsyncThunk(
  "apiLoginLogout/fetchInforUser",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token;
    const res = await axios.get(`${url}/api/user/detailUser?id=${id}`, {
      headers: {
        token: `${token}`,
      },
    });
    return res.data;
  }
);

const apiLoginLogout = createSlice({
  name: "apiLoginLogout",
  initialState,
  reducers: {
    handleLogout(state, action) {
      state.statusLogout = "logout";
      state.statusPostLogin = "idle";
      state.inforUser = {};
      state.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("inforUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {
        state.statusPostLogin = "loading";
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        if (action.payload.message == "OK") {
          state.statusPostLogin = "succeeded";
          state.token = action.payload.token;
          state.inforUser = action.payload.user;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem(
            "inforUser",
            JSON.stringify(action.payload.user)
          );
          state.statusLogout = "logged";
        }
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.statusPostLogin = "failed";
      })

      .addCase(fetchInforUser.pending, (state) => {
        state.statusFetchLogin = "loading";
      })
      .addCase(fetchInforUser.fulfilled, (state, action) => {
        state.statusFetchLogin = "succeeded";
        if (action.payload.user) {
          state.inforUser = action.payload.user;
          localStorage.setItem(
            "inforUser",
            JSON.stringify(action.payload.user)
          );
        }
      })
      .addCase(fetchInforUser.rejected, (state, action) => {
        state.statusFetchLogin = "failed";
      });
  },
});

export const { handleLogout } = apiLoginLogout.actions;

export default apiLoginLogout.reducer;
