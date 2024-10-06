import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { url } from "../utils/common";

const initialState = {
  token:
    localStorage.getItem("token") != undefined
      ? localStorage.getItem("token")
      : "",
  idRoleUser: {},
  inforUser:
    localStorage.getItem("inforUser") != undefined
      ? localStorage.getItem("token")
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
    const res = await axios.get(
      `https://website-booking-ticket-movie-render.onrender.com/api/user/getDetailUser?id=${id}`,
      {
        headers: {
          token: `${token}`,
        },
      }
    );
    return res.data.data[0];
  }
);

const apiLoginLogout = createSlice({
  name: "apiLoginLogout",
  initialState,
  reducers: {
    handleLogout(state, action) {
      state.statusLogout = "logout";
      state.idRoleUser = {};
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
        if (action.payload.status == "OK") {
          state.statusPostLogin = "succeeded";
          state.idRoleUser = jwtDecode(action.payload.access_token);
          state.token = action.payload.access_token;
          localStorage.setItem("token", action.payload.access_token);
          state.statusLogout = "logged";
        }
        if (action.payload.status == "ERR") {
          state.statusPostLogin = "login failed";
        }
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.statusPostLogin = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchInforUser.pending, (state) => {
        state.statusFetchLogin = "loading";
      })
      .addCase(fetchInforUser.fulfilled, (state, action) => {
        state.statusFetchLogin = "succeeded";
        if (action.payload) {
          // Kiểm tra xem action.payload có giá trị không
          state.inforUser = action.payload;
          localStorage.setItem("inforUser", JSON.stringify(action.payload));
        }
      })
      .addCase(fetchInforUser.rejected, (state, action) => {
        state.statusFetchLogin = "failed";
        state.error = action.error.message;
      });
  },
});

export const { handleLogout } = apiLoginLogout.actions;

export default apiLoginLogout.reducer;
