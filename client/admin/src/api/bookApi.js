import axiosClient from "./axiosClient";
import apiUrl from "../constants/apiUrl";

const bookApi = {
  getAll: (pageable) =>
    axiosClient.get(apiUrl.book.getAll, {
      params: {
        pageable: JSON.stringify(pageable),
      },
    }),
  save: (entity) =>
    axiosClient.post(apiUrl.book.CRUD, entity, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  update: (entity) =>
    axiosClient.put(apiUrl.book.CRUD, entity, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  updateType: (id, type) =>
    axiosClient.patch(apiUrl.book.CRUD, null, {
      params: {
        id,
        type,
      },
    }),
  getById: (id) => axiosClient.get(`${apiUrl.book.getById}/${id}`),
  delete: (entities) =>
    axiosClient.delete(apiUrl.book.CRUD, {
      data: JSON.stringify(entities),
    }),
};

export default bookApi;
