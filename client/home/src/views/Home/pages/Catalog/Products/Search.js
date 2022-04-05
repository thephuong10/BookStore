import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Base from "./Base";
import { createPageableRequestFromLocation } from "../../../../../utils/handleUrl";

const Search = () => {
  const routeMatch = useRouteMatch();
  const history = useHistory();
  const [state, setState] = useState({
    title: `Kết quả tìm kiếm cho ' ${routeMatch.params.key} ' `,
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
          key: "name",
          type: "%s%",
          value: routeMatch.params.key,
        },
      ],
    },
  });
  useEffect(() => {
    const _state = {
      ...state,
      title: `Kết quả tìm kiếm cho ' ${routeMatch.params.key} ' `,
      params: {
        ...createPageableRequestFromLocation(history.location.search),
      },
    };
    _state.params.filters.push({
      key: "name",
      type: "%s%",
      value: routeMatch.params.key,
    });
    setState(() => ({ ..._state }));
  }, [history.location.search, routeMatch.params.key]);
  return <Base {...state} />;
};

export default Search;
