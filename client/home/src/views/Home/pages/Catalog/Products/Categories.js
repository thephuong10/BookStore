import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Base from "./Base";
import {
  createPageableRequestFromLocation,
  addParamsLocation,
} from "../../../../../utils/handleUrl";
import categoriesApi from "../../../../../apis/categoriesApi";

const Categories = () => {
  const routeMatch = useRouteMatch();
  const history = useHistory();
  const [state, setState] = useState({
    title: "Thể loại",
    params: {
      paging: {
        page: 1,
        limit: 6,
      },
      sorter: {
        sortBy: "createDate",
        orderBy: "desc",
      },
      filters: [
        {
          key: "categories",
          type: "a+b",
          value: routeMatch.params.key,
          attr: "slug",
        },
      ],
    },
  });
  useEffect(() => {
    (async () => {
      const data = await categoriesApi.getNameBySlug(routeMatch.params.key);
      setState((old) => ({
        ...old,
        title: data,
      }));
    })();
  }, []);
  useEffect(() => {
    const _state = {
      ...state,
      params: {
        ...createPageableRequestFromLocation(history.location.search),
      },
    };
    _state.params.filters.push({
      key: "categories",
      type: "a+b",
      value: routeMatch.params.key,
      attr: "slug",
    });
    setState(() => ({ ..._state }));
  }, [history.location.search]);
  return <Base {...state} />;
};

export default Categories;
