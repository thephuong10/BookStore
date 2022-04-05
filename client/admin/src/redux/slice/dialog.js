import { createSlice } from "@reduxjs/toolkit";

const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    open: false,
    duration: 1000,
    message: "Nội dung thông báo",
    title: "Thông báo",
    cancelAction: {
      callback: null,
    },
    confirmAction: {
      callback: null,
    },
  },
  reducers: {
    showDialog: (state, action) => {
      const { payload } = action;
      state.open = true;
      state.duration = payload.duration || state.duration;
      state.message = payload.message || state.message;
      state.title = payload.title || state.title;
      state.cancelAction = payload.cancelAction || null;
      state.confirmAction = payload.confirmAction || null;
    },
    hideDialog: (state) => {
      state.open = false;
    },
  },
});

const { reducer: DialogReducer } = dialogSlice;

export const { actions: dialogActions } = dialogSlice;
export default DialogReducer;
