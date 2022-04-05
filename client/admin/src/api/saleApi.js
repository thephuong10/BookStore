import axiosClient from "./axiosClient";
import apiUrl from "../constants/apiUrl";

const saleApi = {
  getAll: (pageable) =>
    axiosClient.get(apiUrl.sale.getAll, {
      params: {
        pageable: JSON.stringify(pageable),
      },
    }),
  save: (entity) =>
    axiosClient.post(apiUrl.sale.CRUD, entity, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  update: (entity) =>
    axiosClient.put(apiUrl.sale.CRUD, entity, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  getById: (id) => axiosClient.get(`${apiUrl.sale.getById}/${id}`),
  delete: (entities) =>
    axiosClient.delete(apiUrl.sale.CRUD, {
      data: JSON.stringify(entities),
    }),
};

export default saleApi;
