import axios from "axios";
import queryString from "query-string";

let store;
export const injectAPIStore = (_store) => {
  store = _store;
};

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config) => {
    const { account } = store.getState();

    account.token && (config.headers.Authorization = `Bearer ${account.token}`);

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
    console.log({ error });
    return Promise.reject(error);
  }
);

export default axiosClient;
