import { createSlice } from "@reduxjs/toolkit";
import { flattenObject } from "../../utils/fun";
const initialData = {
  token: null,
  confirm: {
    disable: true,
    expried: false,
  },
  sendTo: {
    disable: true,
    count: 0,
  },
};
const VerificationTokenSlice = createSlice({
  name: "verificationToken",
  initialState: {
    ...initialData,
  },
  reducers: {
    setConfirmDiable: (state, action) => {
      console.log({ a: state.confirm.expried, b: action.payload });
      if (!state.confirm.expried && !action.payload) {
        state.confirm.disable = false;
      } else {
        state.confirm.disable = true;
      }
    },
    setExpriedConfirm: (state, action) => {
      state.confirm.expried = action.payload;
    },
    setSendtoDiable: (state, action) => {
      state.sendTo.disable = action.payload;
    },
    increaseSendtoCount: (state) => {
      state.sendTo.count =
        state.sendTo.count < 3 ? state.sendTo.count++ : state.sendTo.count;
    },
    setToken: (state, action) => {
      if (!state.confirm.expried) {
        state.token = action.payload;
      }
    },
    resetVerificationToken: (state) => {
      state = { ...initialData };
    },
  },
  extraReducers: {},
});

export const { actions: verificationTokenActions } = VerificationTokenSlice;
const { reducer: verificationTokenReducer } = VerificationTokenSlice;

export default verificationTokenReducer;
