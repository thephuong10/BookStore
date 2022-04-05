import apiUrl from "../constants/apiUrl";
import axiosClient from "./axiosClient";

const authorApi = {
  getAll: () => axiosClient.get(apiUrl.author.getAll),
};

export default authorApi;
