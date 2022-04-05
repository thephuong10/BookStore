import queryString from "query-string";

import paramsProductListPage from "../constants/paramsUrlCatalog";
export const addParamsLocation = (search, params) => {
  const searchObj = queryString.parse(search);
  params.forEach((item) => {
    searchObj[item.key] = item.value;
  });
  searchObj["page"] = searchObj["page"] || 1;
  return queryString.stringify(searchObj);
};

export const removeUrlParam = (history, key) => {
  const searchObj = queryString.parse(history.location.search);
  searchObj["page"] = searchObj["page"] || 1;
  return {
    ...history.location,
    search: queryString.stringify(
      Object.keys(searchObj).reduce(
        (acc, name) =>
          name === key
            ? { ...acc }
            : {
                ...acc,
                [name]: searchObj[name],
              },
        {}
      )
    ),
  };
};

export const setLocation = (history, ...params) => ({
  ...history.location,
  search: addParamsLocation(history.location.search, params),
});

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

  return pageable;
};
