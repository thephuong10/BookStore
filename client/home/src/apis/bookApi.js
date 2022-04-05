import apiUrl from "../constants/apiUrl";
import axiosClient from "./axiosClient";

const bookApi = {
  getAll: (pageable) =>
    axiosClient.get(apiUrl.book.getAll, {
      params: {
        pageable: JSON.stringify(pageable),
      },
    }),
  getOneById: (id) => axiosClient.get(`${apiUrl.book.getOneById}/${id}`),
  getMinMaxPriceByKey: (key, value) =>
    axiosClient.get(apiUrl.book.getMinMaxPriceByKey, {
      params: {
        key,
        value,
      },
    }),
  getReviewsByBook: (pageable) =>
    axiosClient.get(apiUrl.book.getReviewsByBook, {
      params: {
        pageable: JSON.stringify(pageable),
      },
    }),
};

export default bookApi;
