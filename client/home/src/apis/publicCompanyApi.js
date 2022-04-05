import apiUrl from "../constants/apiUrl";
import axiosClient from "./axiosClient";

const publicCompanyApi = {
  getAll: () => axiosClient.get(apiUrl.publicCompany.getAll),
};

export default publicCompanyApi;
