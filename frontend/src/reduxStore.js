import { configureStore } from "@reduxjs/toolkit";
import apiLoginLogout from "./reducers/apiLoginLogout";
import apiSignup from "./reducers/apiSignup";
import apiCourse, { fetchCourse } from "./reducers/apiCourse";
import apiCategory, { fetchCategory } from "./reducers/apiCategory";
import apiEnrollment from "./reducers/apiEnrollment";
import modalTrailer from "./reducers/modalTrailer";
import apiCart, { fetchCartEachUser } from "./reducers/apiCart";
import search from "./reducers/search";
import apiCoupon, { fetchCoupon } from "./reducers/apiCoupon";
import apiPayment from "./reducers/apiPayment";
import apiPaymentMethod, {
  fetchAllPaymentMethod,
} from "./reducers/apiPaymentMethod";
import apiSection from "./reducers/apiSection";
import apiLecture from "./reducers/apiLecture";
import apiReview from "./reducers/apiReview";
import apiCertificate from "./reducers/apiCertificate";
import apiYoutube from "./reducers/apiYoutube";

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
    apiPaymentMethod: apiPaymentMethod,
    apiSection: apiSection,
    apiLecture: apiLecture,
    apiReview: apiReview,
    apiCertificate: apiCertificate,
    apiYoutube: apiYoutube,
  },
});

// tự động fetch khi ứng dụng chạy
reduxStore.dispatch(fetchCourse());
reduxStore.dispatch(fetchCategory());
reduxStore.dispatch(fetchCoupon());
reduxStore.dispatch(fetchCartEachUser());
reduxStore.dispatch(fetchAllPaymentMethod());

export default reduxStore;
