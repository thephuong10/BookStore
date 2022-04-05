import axiosClient from "./axiosClient";
import apiUrl from "../constants/apiUrl";
const categoriesApi = {
  getAll: () => axiosClient.get(apiUrl.categories.getAll),
  save: (name) =>
    axiosClient.post(apiUrl.categories.CRUD, null, {
      params: {
        name,
      },
    }),
  update: (categories) =>
    axiosClient.put(apiUrl.categories.CRUD, JSON.stringify(categories)),
  remove: (id) => axiosClient.delete(`${apiUrl.categories.CRUD}/${id}`),
};

export default categoriesApi;
