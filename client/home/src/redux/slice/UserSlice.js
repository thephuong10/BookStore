import { createSlice } from "@reduxjs/toolkit";
import { flattenObject } from "../../utils/fun";
import actionsUser from "../thunks/userThunk";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    auth: {
      token: null,
      loading: false,
      error: null,
    },
    info: {
      totalCart: 0,
      fullname: "",
    },
  },
  reducers: {
    setToken: (state, action) => {
      state.auth.token = action.payload;
    },
    setAuthLoading: (state, action) => {
      state.auth.loading = action.payload;
    },
    logout: (state) => {
      state.auth.token = null;
      state.auth.error = null;
    },
    setTotalCart: (state, action) => {
      state.info.totalCart = action.payload;
    },
    setAddress: (state, action) => {
      state.info.address = action.payload;
    },
    setInfo: (state, action) => {
      state.info = { ...state.info, ...action.payload };
    },
  },
  extraReducers: {
    ...flattenObject(actionsUser),
  },
});

export const { actions: userActions } = UserSlice;
const { reducer: userReducer } = UserSlice;

export default userReducer;
