import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../apis/userApi";
import { flattenObject, isObject } from "../../utils/fun";
const hanleAsyncThunk = (callback, rejectWithValue) => {
  try {
    return callback();
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error);
  }
};
export const fetchUser = {
  getInfo: createAsyncThunk("user/info", async () => await userApi.getInfo()),
  signin: createAsyncThunk(
    "user/signin",
    async (account) => await userApi.signin(account)
  ),
};

const actionsUser = {
  getInfo: {
    [fetchUser.getInfo.pending]: () => {},
    [fetchUser.getInfo.fulfilled]: (state, action) => {
      state.info = {
        ...flattenObject(action.payload.info),
        totalCart: action.payload.totalCart || 0,
      };
    },
    [fetchUser.getInfo.rejected]: (state) => {
      state.info = {
        totalCart: 0,
      };
      state.auth.token = null;
    },
  },
  signin: {
    [fetchUser.signin.pending]: (state) => {
      state.auth.loading = true;
    },
    [fetchUser.signin.fulfilled]: (state, action) => {
      state.auth.loading = false;
      state.auth.token = action.payload.token;
    },
    [fetchUser.signin.rejected]: (state, action) => {
      state.auth.loading = false;

      state.auth.error = isObject(action.error)
        ? "Tài khoản hoặc mật khẩu không chính xác"
        : null;
    },
  },
};

export default actionsUser;
