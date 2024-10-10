import { configureStore } from "@reduxjs/toolkit";
import apiLoginLogout from "./reducers/apiLoginLogout";
import apiSignup from "./reducers/apiSignup";
import apiCourse, { fetchCourse } from "./reducers/apiCourse";
import apiCategory, { fetchCategory } from "./reducers/apiCategory";
import apiEnrollment from "./reducers/apiEnrollment";
import modalTrailer from "./reducers/modalTrailer";

const reduxStore = configureStore({
  reducer: {
    apiLoginLogout: apiLoginLogout,
    apiSignup: apiSignup,
    apiCourse: apiCourse,
    apiCategory: apiCategory,
    apiEnrollment: apiEnrollment,
    modalTrailer: modalTrailer,
  },
});

reduxStore.dispatch(fetchCourse()); // tự động fetch khi ứng dụng chạy
reduxStore.dispatch(fetchCategory()); // tự động fetch khi ứng dụng chạy

export default reduxStore;
