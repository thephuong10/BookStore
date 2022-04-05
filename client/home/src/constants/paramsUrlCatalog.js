const filters = {
  rating: {
    key: "star",
    value: null,
    type: "a>=b",
  },
  price: {
    key: "price",
    value: null,
    type: "a<=c&&c<=b",
  },
  author: {
    key: "author",
    value: null,
    type: "a==b",
  },
  publichCompany: {
    key: "publichCompany",
    value: null,
    type: "a==b",
  },
  categories: {
    key: "categories",
    type: "a+b",
    value: null,
  },
};
const classfy = {
  ["pho-bien"]: {
    title: "Phổ biến",
    key: "popular",
    value: {
      filters: [
        {
          key: "type",
          value: "popular",
          type: "a=b",
        },
      ],
    },
  },
  ["xu-huong"]: {
    title: "Xu hướng",
    key: "trend",
    value: {
      filters: [
        {
          key: "type",
          value: "trend",
          type: "a=b",
        },
      ],
    },
  },
  ["ban-chay"]: {
    title: "Bán chạy",
    key: "top_seller",
    value: {
      sorter: {
        sortBy: "seller",
        orderBy: "desc",
      },
    },
  },
};

const paramsUrlCatalog = {
  filters: filters,
  classfy: classfy,
};
export default paramsUrlCatalog;
