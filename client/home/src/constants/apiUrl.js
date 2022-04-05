const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8080";
const outh2RedirectUrl = (registrationId) =>
  `${baseUrl}/oauth2/authorize/${registrationId}?redirect_uri=http://localhost:3000/xac-thuc/oauth2/redirect`;

const apiUrl = {
  base: baseUrl,
  book: {
    getAll: "/api/book/get/all",
    getOneById: `/api/book/get`,
    getMinMaxPriceByKey: `/api/book/get/min-max-price`,
    getReviewsByBook: "/api/reviews/get/all",
  },
  categories: {
    getAll: "/api/category/get/all",
    getName: "/api/category/get/name",
  },
  author: {
    getAll: "/api/author/get/all",
  },
  publicCompany: {
    getAll: "/api/publicCompany/get/all",
  },
  sale: {
    getAll: "/api/sale/get/all",
    getName: "/api/sale/get/name",
  },
  auth: {
    google: outh2RedirectUrl("google"),
    facebook: outh2RedirectUrl("facebook"),
    signin: "/api/customer/signin",
    signup: {
      save: "/api/signup",
      confirmEmail: "/api/signup/confirm/email",
      confirmToken: "/api/signup/confirm/token",
      resendToken: "/api/signup/resend/token",
    },
  },
  user: {
    info: "/auth/api/customer/info",
    handleCart: "/auth/api/customer/carts",
    updateAddress: "/auth/api/customer/update/address",
    updateInfo: "/auth/api/user/update/info",
    getFeeShipping: "/auth/api/fee/shipping",
    createOrder: "/auth/api/customer/order/create",
    getAllOrder: "/auth/api/customer/order/get/all",
    cancelOrder: "/auth/api/customer/order/cacel",
    reviews: "/auth/api/reviews",
    updatePassWord: "/auth/api/user/update/password",
  },
  address: {
    provinces: "/api/address/province",
    districts: "/api/address/district",
    wards: "/api/address/ward",
  },
};
export default apiUrl;
console.log(apiUrl);
