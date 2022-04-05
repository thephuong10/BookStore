import axiosClient from "./axiosClient";
import apiUrl from "../constants/apiUrl";

const provinceApi = {
  getProvinces: () => axiosClient.get(apiUrl.address.provinces),
  getDistricts: (provinceCode) =>
    axiosClient.get(`${apiUrl.address.districts}/${provinceCode}`),
  getWards: (districtsCode) =>
    axiosClient.get(`${apiUrl.address.wards}/${districtsCode}`),
};

export default provinceApi;
