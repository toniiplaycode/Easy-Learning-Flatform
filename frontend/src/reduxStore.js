import { configureStore } from "@reduxjs/toolkit";
import apiLoginLogout, { fetchInforUser } from "./reducers/apiLoginLogout";
import apiSignup from "./reducers/apiSignup";

const reduxStore = configureStore({
  reducer: {
    apiLoginLogout: apiLoginLogout,
    apiSignup: apiSignup,
  },
});

export default reduxStore;
