import { configureStore } from "@reduxjs/toolkit";
import apiLoginLogout, { fetchInforUser } from "./reducers/apiLoginLogout";

const reduxStore = configureStore({
  reducer: {
    apiLoginLogout: apiLoginLogout,
  },
});

export default reduxStore;
