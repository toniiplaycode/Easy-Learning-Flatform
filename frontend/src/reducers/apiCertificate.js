import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../utils/common";
import { toast } from "react-toastify";

const initialState = {
  certificateAllCourse: [],
  detailCertificate: {},
  certificateEachUser: [],
  statusFetchCertificateAllCourse: "idle",
  statusAddCertificate: "idle",
  statusDetailCertificate: "idle",
  statusFetchCertificateEachUser: "idle",
};

export const fetchCertificateAllCourse = createAsyncThunk(
  "apiCertificate/fetchCertificateAllCourse",
  async (instructor_id, thunkAPI) => {
    const response = await axios.get(
      `${url}/api/certificate/getCertificateAllCourse`,
      {
        params: {
          instructor_id,
        },
      }
    );
    return response.data;
  }
);

export const addCertificate = createAsyncThunk(
  "apiCertificate/addCertificate",
  async (obj, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; // lấy token bên apiLoginLogout
    const response = await axios.post(
      `${url}/api/certificate/addCertificate`,
      obj,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if ((response.data.message = "OK")) {
      if (obj?.instructor_id)
        thunkAPI.dispatch(fetchCertificateAllCourse(obj.instructor_id));
      thunkAPI.dispatch(fetchCertificateEachUser(user_id));
    }
    return response.data;
  }
);

export const deleteCertificate = createAsyncThunk(
  "apiCertificate/deleteCertificate",
  async (obj, thunkAPI) => {
    const token = thunkAPI.getState().apiLoginLogout.token; // lấy token bên apiLoginLogout
    const response = await axios.delete(
      `${url}/api/certificate/deleteCertificate`,
      {
        params: {
          id: obj.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Đã xóa chứng chỉ !");
    thunkAPI.dispatch(fetchCertificateAllCourse(obj.instructor_id));
    return response.data;
  }
);

export const FetchdetailCertificate = createAsyncThunk(
  "apiCertificate/FetchdetailCertificate",
  async (id, thunkAPI) => {
    const response = await axios.get(
      `${url}/api/certificate/detailCertificate`,
      {
        params: {
          id,
        },
      }
    );
    return response.data;
  }
);

export const fetchCertificateEachUser = createAsyncThunk(
  "apiCertificate/fetchCertificateEachUser",
  async (user_id, thunkAPI) => {
    const response = await axios.get(
      `${url}/api/certificate/getCertificateEachUser`,
      {
        params: {
          user_id,
        },
      }
    );
    return response.data;
  }
);

const apiCertificate = createSlice({
  name: "apiCertificate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificateAllCourse.pending, (state) => {
        state.statusFetchCertificateAllCourse = "loading";
      })
      .addCase(fetchCertificateAllCourse.fulfilled, (state, action) => {
        state.statusFetchCertificateAllCourse = "succeeded";
        state.certificateAllCourse = action.payload.certificates;
      })
      .addCase(fetchCertificateAllCourse.rejected, (state, action) => {
        state.statusFetchCertificateAllCourse = "failed";
      })

      .addCase(addCertificate.pending, (state) => {
        state.statusAddCertificate = "loading";
      })
      .addCase(addCertificate.fulfilled, (state, action) => {
        state.statusAddCertificate = "succeeded";
        toast.success("Đã cấp chứng chỉ thành công !");
      })
      .addCase(addCertificate.rejected, (state, action) => {
        state.statusAddCertificate = "failed";
        toast.success("Chứng chỉ này đã được cấp !", {
          autoClose: 4000,
        });
      })

      .addCase(FetchdetailCertificate.pending, (state) => {
        state.statusDetailCertificate = "loading";
      })
      .addCase(FetchdetailCertificate.fulfilled, (state, action) => {
        state.statusDetailCertificate = "succeeded";
        state.detailCertificate = action.payload.certificate;
      })
      .addCase(FetchdetailCertificate.rejected, (state, action) => {
        state.statusDetailCertificate = "failed";
      })

      .addCase(fetchCertificateEachUser.pending, (state) => {
        state.statusFetchCertificateEachUser = "loading";
      })
      .addCase(fetchCertificateEachUser.fulfilled, (state, action) => {
        state.statusFetchCertificateEachUser = "succeeded";
        state.certificateEachUser = action.payload.certificates;
      })
      .addCase(fetchCertificateEachUser.rejected, (state, action) => {
        state.statusFetchCertificateEachUser = "failed";
      });
  },
});

export default apiCertificate.reducer;
