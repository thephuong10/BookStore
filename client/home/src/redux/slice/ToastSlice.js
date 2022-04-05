import { createSlice } from "@reduxjs/toolkit";
// const initialToastItem = {
//   message: "",
//   status: "",
//   duration: 3000,
// };
// const initialValues = [
//   {
//     message: "Thêm thành công",
//     status: "success",
//     duration: 3000,
//   },
//   {
//     message: "Thêm thất bại",
//     status: "danger",
//     duration: 3000,
//   },
//   {
//     message: "Thêm cảnh báo",
//     status: "warn",
//     duration: 3000,
//   },
//   {
//     message: "Thêm thông tin",
//     status: "info",
//     duration: 3000,
//   },
// ];
// ...initialValues.map((item, index) => ({
//   ...item,
//   id: index,
// })),
const ToastSlice = createSlice({
  name: "toast",
  initialState: {
    entites: [],
  },
  reducers: {
    create: (state, action) => {
      state.entites = [
        ...state.entites,
        {
          duration: 5000,
          ...action.payload,
          id: state.entites.length,
        },
      ];
    },
    removeById: (state, action) => {
      state.entites = state.entites.filter((t) => t.id !== action.payload);
    },
  },
});

export const { actions: toastActions } = ToastSlice;

const { reducer: toastReducer } = ToastSlice;

export default toastReducer;
