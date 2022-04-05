import apiUrl from "../constants/apiUrl";
import axiosClient from "./axiosClient";

const salesApi = {
  getAll: (pageable) =>
    axiosClient.get(apiUrl.sale.getAll, {
      params: {
        pageable: JSON.stringify(pageable),
      },
    }),
  getNameBySlug: (slug) => axiosClient.get(`${apiUrl.sale.getName}/${slug}`),
  //getOneById: (id) => axiosClient.get(apiUrl.book.getOneById(id)),
};

export default salesApi;
