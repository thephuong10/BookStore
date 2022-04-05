import axios from "axios";
import apiUrl from "../constants/apiUrl";
import axiosClient from "./axiosClient";

const userApi = {
  getInfo: () => axiosClient.get(apiUrl.user.info),
  signin: (account) =>
    axiosClient.post(apiUrl.auth.signin, JSON.stringify(account)),
  signup: {
    confirmEmail: (email) =>
      axiosClient.post(`${apiUrl.auth.signup.confirmEmail}/${email}`),
    confirmToken: (data) =>
      axiosClient.post(apiUrl.auth.signup.confirmToken, null, {
        params: {
          ...data,
        },
      }),

    resendToken: (email) =>
      axiosClient.post(`${apiUrl.auth.signup.resendToken}/${email}`),
    save: (account) =>
      axiosClient.post(apiUrl.auth.signup.save, JSON.stringify(account)),
  },
  addToCart: (cart) =>
    axiosClient.post(apiUrl.user.handleCart, JSON.stringify(cart)),
  updateCarts: (carts) =>
    axiosClient.put(apiUrl.user.handleCart, JSON.stringify(carts)),
  getAllCart: () => axiosClient.get(apiUrl.user.handleCart),
  deleteCarts: (ids) =>
    axiosClient.delete(apiUrl.user.handleCart, {
      params: {
        ids: JSON.stringify(ids),
      },
    }),
  updateAddress: (phone, address) =>
    axiosClient.put(apiUrl.user.updateAddress, JSON.stringify(address), {
      params: {
        phone,
      },
    }),
  updateInfo: (user) =>
    axiosClient.put(apiUrl.user.updateInfo, JSON.stringify(user)),
  getFeeShipping: () => axiosClient.get(apiUrl.user.getFeeShipping),
  order: (feeShipping) =>
    axiosClient.post(apiUrl.user.createOrder, null, {
      params: {
        feeShipping,
      },
    }),
  getAllOrder: () => axiosClient.get(apiUrl.user.getAllOrder),
  cancelOrder: (id, reasonCancel) =>
    axiosClient.patch(apiUrl.user.cancelOrder, null, {
      params: {
        id,
        reasonCancel,
      },
    }),
  reviews: (entity) =>
    axiosClient.post(apiUrl.user.reviews, entity, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  updatePassword: (passwordOld, passwordNew) =>
    axiosClient.patch(apiUrl.user.updatePassWord, null, {
      params: {
        passwordOld,
        passwordNew,
      },
    }),
};

export default userApi;
