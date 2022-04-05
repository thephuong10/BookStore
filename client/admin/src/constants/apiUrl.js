const baseUrl = process.env.REACT_APP_BASE_URL;

const apiUrl = {
  base: baseUrl,
  author: {
    getAll: "/api/author/get/all",
    CRUD: "/auth/api/author",
  },
  publicCompany: {
    getAll: "/api/publicCompany/get/all",
    CRUD: "/auth/api/publicCompany",
  },
  book: {
    getAll: "/api/book/get/all",
    getById: "/api/book/get",
    CRUD: "/auth/api/book",
  },
  categories: {
    getAll: "/api/category/get/all",
    CRUD: "/auth/api/category",
  },
  sale: {
    getAll: "/api/sale/get/all",
    getById: "/api/sale/get",
    CRUD: "/auth/api/sale",
  },
  user: {
    signin: "/api/admin/signin",
    info: "/auth/api/admin/info/",
    logout: "/auth/api/user/logout",
    updatePassWord: "/auth/api/user/update/password",
    updateInfo: "/auth/api/user/update/info",
  },
  order: {
    getAll: "/api/order/get/all",
    CRUD: "/auth/api/order",
    getOrderDetaiById: "/api/order/get/detail",
  },
  reviews: {
    getAll: "/api/reviews/get/all",
    CRUD: "/auth/api/reviews",
  },
};
export default apiUrl;
