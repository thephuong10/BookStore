import apiUrl from "../constants/apiUrl";
import axiosClient from "./axiosClient";

const categoriesApi = {
  getAll: () => axiosClient.get(apiUrl.categories.getAll),
  getNameBySlug: (slug) =>
    axiosClient.get(`${apiUrl.categories.getName}/${slug}`),
  //getOneById: (id) => axiosClient.get(apiUrl.book.getOneById(id)),
};

export default categoriesApi;
