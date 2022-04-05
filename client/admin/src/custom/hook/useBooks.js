import React, { useEffect, useState } from "react";
import bookApi from "../../api/bookApi";

const fetBooks = async (pageable) => {
  return await bookApi.getAll(pageable);
};

const Usebooks = ({ pageable = {} }) => {
  const [state, setState] = useState({
    entities: [],
    paging: null,
  });
  const [pageableState, setPageableState] = useState({
    paging: {
      page: 1,
      limit: 5,
    },
    ...pageable,
  });
  // useEffect(() => {
  //   (async () => {
  //     const data = await fetBooks(pageableState);
  //     setState((oldValue) => ({
  //       ...oldValue,
  //       entities: [...data.data],
  //       paging: data.paging,
  //     }));
  //   })();
  // }, []);
  useEffect(() => {
    (async () => {
      const data = await fetBooks(pageableState);
      setState((oldValue) => ({
        ...oldValue,
        entities: [...data.data],
        paging: data.paging,
      }));
    })();
  }, [pageableState]);
  const setPageable = (_pageable) => {
    setPageableState(() => ({ ..._pageable }));
  };
  return { state, setPageable };
};

export default Usebooks;
