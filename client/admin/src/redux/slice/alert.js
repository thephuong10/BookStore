import { createSlice } from "@reduxjs/toolkit";
// const initialAlertItem = {
//   message: "",
//   status: "",
//   duration: 3000,
// };
const initialValues = [
  // {
  //   id: 1,
  //   message: "Thêm thành công",
  //   status: "success",
  //   duration: 5 * 60 * 1000,
  // },
  // {
  //   id: 2,
  //   message: "Thêm thất bại",
  //   status: "danger",
  //   duration: 3000,
  // },
  // {
  //   id: 3,
  //   message: "Thêm cảnh báo",
  //   status: "warn",
  //   duration: 3000,
  // },
  // {
  //   id: 4,
  //   message: "Thêm thông tin",
  //   status: "info",
  //   duration: 3000,
  // },
];
// ...initialValues.map((item, index) => ({
//   ...item,
//   id: index,
// })),
const AlertSlice = createSlice({
  name: "alert",
  initialState: {
    entites: [...initialValues],
  },
  reducers: {
    showAlert: (state, action) => {
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

export const { actions: AlertActions } = AlertSlice;

const { reducer: AlertReducer } = AlertSlice;

export default AlertReducer;
