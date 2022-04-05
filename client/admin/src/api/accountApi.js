import axiosClient from "./axiosClient";
import apiUrl from "../constants/apiUrl";
const accountApi = {
  signin: (entity) =>
    axiosClient.post(apiUrl.user.signin, JSON.stringify(entity)),
  info: () => axiosClient.get(apiUrl.user.info),
  logout: () => axiosClient.get(apiUrl.user.logout),
  updatePassword: (passwordOld, passwordNew) =>
    axiosClient.patch(apiUrl.user.updatePassWord, null, {
      params: {
        passwordOld,
        passwordNew,
      },
    }),
  updateInfo: (user) =>
    axiosClient.put(apiUrl.user.updateInfo, JSON.stringify(user)),
};

export default accountApi;
