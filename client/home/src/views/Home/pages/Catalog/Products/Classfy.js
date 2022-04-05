import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Base from "./Base";
import { createPageableRequestFromLocation } from "../../../../../utils/handleUrl";
const TYPE_CASE = {
  ["pho-bien"]: {
    key: "popular",
    name: "Phổ biến",
  },
  ["xu-huong"]: {
    key: "trend",
    name: "Xu hướng",
  },
};
const Classfy = () => {
  const routeMatch = useRouteMatch();
  const history = useHistory();
  const [state, setState] = useState({
    title: TYPE_CASE[routeMatch.params.key]?.name,
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
          key: "type",
          type: "a=b",
          value: TYPE_CASE[routeMatch.params.key]?.key,
        },
      ],
    },
  });
  useEffect(() => {
    const _state = {
      ...state,
      params: {
        ...state.params,
        ...createPageableRequestFromLocation(history.location.search),
      },
    };
    _state.params.filters.push({
      key: "type",
      type: "a=b",
      value: TYPE_CASE[routeMatch.params.key]?.key,
    });
    setState(() => ({ ..._state }));
  }, [history.location.search]);
  return <Base {...state} />;
};

export default Classfy;
