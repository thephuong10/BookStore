import { configureStore } from "@reduxjs/toolkit";
import AlertReducer from "./slice/alert";

import DialogReducer from "./slice/dialog";
import AccountReducer from "./slice/account";
import { injectAPIStore } from "../api/axiosClient";
import { injectAppStore } from "../App";
const store = configureStore({
  reducer: {
    alert: AlertReducer,
    dialog: DialogReducer,
    account: AccountReducer,
  },
});
injectAPIStore(store);
injectAppStore(store);
export default store;
