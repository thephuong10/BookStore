import axiosClient from "./axiosClient";
import apiUrl from "../constants/apiUrl";
const publicCompanyApi = {
  getAll: () => axiosClient.get(apiUrl.publicCompany.getAll),
  save: (name) =>
    axiosClient.post(apiUrl.publicCompany.CRUD, null, {
      params: {
        name,
      },
    }),
  update: (publicCompany) =>
    axiosClient.put(apiUrl.publicCompany.CRUD, JSON.stringify(publicCompany)),
  remove: (id) => axiosClient.delete(`${apiUrl.publicCompany.CRUD}/${id}`),
};

export default publicCompanyApi;
