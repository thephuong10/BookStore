import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Base from "./Base";
import { createPageableRequestFromLocation } from "../../../../../utils/handleUrl";

import salesApi from "../../../../../apis/salesApi";

const Sales = () => {
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
          key: "sale",
          type: "a+b",
          value: routeMatch.params.key,
          attr: "slug",
        },
      ],
    },
  });
  useEffect(() => {
    (async () => {
      const data = await salesApi.getNameBySlug(routeMatch.params.key);
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
      key: "sale",
      type: "a+b",
      value: routeMatch.params.key,
      attr: "slug",
    });
    setState(() => ({ ..._state }));
  }, [history.location.search]);
  return <Base {...state} />;
};

export default Sales;
