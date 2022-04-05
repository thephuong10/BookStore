import axiosClient from "./axiosClient";
import apiUrl from "../constants/apiUrl";
const orderApi = {
  getAll: (pageable) =>
    axiosClient.get(apiUrl.order.getAll, {
      params: {
        pageable: JSON.stringify(pageable),
      },
    }),
  update: (id, status) =>
    axiosClient.patch(apiUrl.order.CRUD, null, {
      params: {
        id,
        status,
      },
    }),
  getOrderDetailById: (id) =>
    axiosClient.get(`${apiUrl.order.getOrderDetaiById}/${id}`),
};

export default orderApi;
