import axiosClient from "./axiosClient";
import apiUrl from "../constants/apiUrl";
const authorApi = {
  getAll: () => axiosClient.get(apiUrl.author.getAll),
  save: (name) =>
    axiosClient.post(apiUrl.author.CRUD, null, {
      params: {
        name,
      },
    }),
  update: (author) =>
    axiosClient.put(apiUrl.author.CRUD, JSON.stringify(author)),
  remove: (id) => axiosClient.delete(`${apiUrl.author.CRUD}/${id}`),
};

export default authorApi;
