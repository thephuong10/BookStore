import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountApi from "../../api/accountApi";
import { flattenObject } from "../../utils/utils";
export const fetchSignin = createAsyncThunk(
  "account/signin",
  async (entity) => await accountApi.signin(entity)
);
export const fetchUserInfo = createAsyncThunk(
  "account/info",
  async () => await accountApi.info()
);

const fetchSigninAction = {
  [fetchSignin.pending]: (state) => {
    state.loading = true;
  },
  [fetchSignin.rejected]: (state) => {
    state.loading = false;
    state.error = true;
  },
  [fetchSignin.fulfilled]: (state, action) => {
    state.loading = false;
    state.error = false;
    state.token = action.payload.token;
  },
};
const fetchUserInfoAction = {
  [fetchUserInfo.pending]: (state) => {
    state.loading = true;
  },
  [fetchUserInfo.rejected]: (state) => {
    state.loading = false;
    state.token = null;
  },
  [fetchUserInfo.fulfilled]: (state, action) => {
    state.loading = false;
    state.info = { ...flattenObject(action.payload) };
  },
};

const accountSlice = createSlice({
  name: "account",
  initialState: {
    token: null,
    loading: false,
    error: false,
    info: null,
  },
  reducers: {
    isLoading: (state, action) => {
      state.loading = action.payload || state.loading;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setInfo: (state, action) => {
      state.info = { ...state.info, ...action.payload };
    },
  },
  extraReducers: {
    ...fetchSigninAction,
    ...fetchUserInfoAction,
  },
});

export const { actions: AccountActions } = accountSlice;
const { reducer: AccountReducer } = accountSlice;

export default AccountReducer;
