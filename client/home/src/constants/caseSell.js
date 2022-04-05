const caseSell = [
  {
    link: "pho-bien",
    title: "Phổ biến",
    filter: {
      key: "type",
      value: "popular",
      type: "a=b",
    },
  },
  {
    link: "xu-huong",
    title: "Xu hướng",
    filter: {
      key: "type",
      value: "trend",
      type: "a=b",
    },
  },
  {
    link: "moi-nhat",
    title: "Mới nhất",
    sorter: {
      sortBy: "createDate",
      orderBy: "desc",
    },
  },
];

export default caseSell;
