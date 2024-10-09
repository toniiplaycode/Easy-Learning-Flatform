import { configureStore } from "@reduxjs/toolkit";
import apiLoginLogout, { fetchInforUser } from "./reducers/apiLoginLogout";
import apiSignup from "./reducers/apiSignup";
import apiCourse, { fetchCourse } from "./reducers/apiCourse";

const reduxStore = configureStore({
  reducer: {
    apiLoginLogout: apiLoginLogout,
    apiSignup: apiSignup,
    apiCourse: apiCourse,
  },
});

reduxStore.dispatch(fetchCourse()); // tự động fetch khi ứng dụng chạy

export default reduxStore;
