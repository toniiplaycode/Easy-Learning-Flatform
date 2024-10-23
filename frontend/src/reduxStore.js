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
import apiPayment from "./reducers/apiPayment";
import apiSection from "./reducers/apiSection";
import apiLecture from "./reducers/apiLecture";
import apiReview from "./reducers/apiReview";
import apiCertificate from "./reducers/apiCertificate";

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
    apiPayment: apiPayment,
    apiSection: apiSection,
    apiLecture: apiLecture,
    apiReview: apiReview,
    apiCertificate: apiCertificate,
  },
});

// tự động fetch khi ứng dụng chạy
reduxStore.dispatch(fetchCourse());
reduxStore.dispatch(fetchCategory());
reduxStore.dispatch(fetchCoupon());

export default reduxStore;
