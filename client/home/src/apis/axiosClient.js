import axios from "axios";
import queryString from "query-string";
import apiUrl from "../constants/apiUrl";

let store;
export const injectAPIStore = (_store) => {
  store = _store;
};

const axiosClient = axios.create({
  baseURL: apiUrl.base,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config) => {
    const { user } = store.getState();
    user.auth.token &&
      (config.headers.Authorization = `Bearer ${user.auth.token}`);
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  (response) => {
    return response.data || response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
