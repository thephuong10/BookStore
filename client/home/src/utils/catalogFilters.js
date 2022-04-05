import queryString from "query-string";
import paramsProductListPage from "../constants/paramsProductListPage";

export const createPageableRequestFromLocation = (search) => {
  const params = queryString.parse(search);
  const pageable = {};
  pageable["paging"] = {
    page: params.page ? parseInt(params.page) : 1,
    limit: 6,
  };
  if (params.sortBy) {
    pageable["sorter"] = {
      sortBy: params.sortBy,
      orderBy: params?.orderBy,
    };
  }

  pageable["filters"] = Object.keys(params)
    .filter((key) => paramsProductListPage.filters[key])
    .map((key) => ({
      ...paramsProductListPage.filters[key],
      value: params[key],
    }));
  console.log("pageable", params);
  return pageable;
};
