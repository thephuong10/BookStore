import { configureStore } from "@reduxjs/toolkit";

import { injectAPIStore } from "../apis/axiosClient";
import { injectAppStore } from "../App";
import categoriesReducer from "./slice/CategoriesSlice";
import toastReducer from "./slice/ToastSlice";
import userReducer from "./slice/UserSlice";

import verificationTokenReducer from "./slice/VerificationTokenSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    user: userReducer,
    verificationToken: verificationTokenReducer,
    toast: toastReducer,
  },
});
injectAPIStore(store);
injectAppStore(store);
export default store;
