import { configureStore } from "@reduxjs/toolkit";
import apiLoginLogout from "./reducers/apiLoginLogout";
import apiSignup from "./reducers/apiSignup";
import apiCourse, { fetchCourse } from "./reducers/apiCourse";
import apiCategory, { fetchCategory } from "./reducers/apiCategory";
import apiEnrollment from "./reducers/apiEnrollment";
import modalTrailer from "./reducers/modalTrailer";
import apiCart from "./reducers/apiCart";
import search from "./reducers/search";
import apiCoupon, { fetchCoupon } from "./reducers/apiCoupon";

const reduxStore = configureStore({
  reducer: {
    apiLoginLogout: apiLoginLogout,
    apiSignup: apiSignup,
    apiCourse: apiCourse,
    apiCategory: apiCategory,
    apiEnrollment: apiEnrollment,
    modalTrailer: modalTrailer,
    apiCart: apiCart,
    search: search,
    apiCoupon: apiCoupon,
  },
});

reduxStore.dispatch(fetchCourse()); // tự động fetch khi ứng dụng chạy
reduxStore.dispatch(fetchCategory()); // tự động fetch khi ứng dụng chạy
reduxStore.dispatch(fetchCoupon()); // tự động fetch khi ứng dụng chạy

export default reduxStore;
