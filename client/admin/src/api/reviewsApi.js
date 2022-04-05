import axiosClient from "./axiosClient";
import apiUrl from "../constants/apiUrl";
const reviewsApi = {
  getAll: (pageable) =>
    axiosClient.get(apiUrl.reviews.getAll, {
      params: {
        pageable: JSON.stringify(pageable),
      },
    }),
  update: (id, status) =>
    axiosClient.patch(apiUrl.reviews.CRUD, null, {
      params: {
        id,
        status,
      },
    }),
};

export default reviewsApi;
