import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import bookApi from "../../api/bookApi";
import Loading from "../../components/Loading";
import Table from "../../components/Table";
import SelectBase from "../../components/SelectBase";
import mixin from "../../utils/styles/mixin";
import { useDispatch } from "react-redux";
import { AlertActions } from "../../redux/slice/alert";
import { isArray } from "../../utils/utils";

const headData = [
  "Ảnh bìa",
  "Tên sách",
  "Tên tác giả",
  "Thể loại",
  "Phân loại",
];
const _sortings = [
  {
    title: "Tên sách",
    sortBy: "name",
  },
  {
    title: "Số lượng",
    sortBy: "total",
  },
  {
    title: "Giá",
    sortBy: "price",
  },
];
const ContentElm = ({ content }) => (
  <Typography
    sx={{
      ...mixin.textOverFlowMultiline(2),
    }}
  >
    {content}
  </Typography>
);
const Stall = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    loading: false,
    pageable: {
      paging: {
        page: 0,
        count: 0,
      },
      entities: [],
    },
  });
  const [params, setParams] = useState({
    paging: {
      page: 1,
      limit: 5,
    },
    sorter: {
      sortBy: "createDate",
      orderBy: "desc",
    },
    filters: [],
  });
  const [sortings, setSortings] = useState(() => [..._sortings]);
  const handleChangeType = (id, selected) => {
    setState((oldValue) => ({
      ...oldValue,
      loading: true,
    }));
    setTimeout(() => {
      (async () => {
        try {
          const data = await bookApi.updateType(id, selected.key);
          setState((oldValue) => ({
            ...oldValue,
            loading: false,
          }));
          dispatch(
            AlertActions.showAlert({
              anchorOrigin: "bottom-right",
              message: "Cập nhật thành công",
              status: "success",
            })
          );
        } catch {
          dispatch(
            AlertActions.showAlert({
              anchorOrigin: "bottom-right",
              message: "Cập nhật thất bại",
              status: "danger",
            })
          );
        }
      })();
    }, 800);
  };
  const handleChangePage = (page) => {
    setParams((oldValue) => ({
      ...oldValue,
      paging: {
        page: page,
        limit: 5,
      },
    }));
  };
  const handleSortings = (sort) => {
    if (isArray(state.pageable.entities)) {
      setParams((oldValue) => ({
        ...oldValue,
        paging: {
          page: 1,
          limit: 5,
        },
        sorter: {
          sortBy: sort.sortBy,
          orderBy: sort.orderBy,
        },
      }));
    }
  };
  const handleSearch = (search) => {
    const sorter = params.sorter;
    setParams(() => ({
      paging: {
        page: 1,
        limit: 5,
      },
      sorter: {},
      filters: [
        {
          key: "name",
          value: search,
          type: "%s%",
        },
      ],
    }));
    sorter && setSortings(() => [..._sortings]);
  };
  useEffect(() => {
    setState((oldValue) => ({ ...oldValue, loading: true }));
    setTimeout(() => {
      (async () => {
        try {
          const data = await bookApi.getAll(params);
          setState(() => ({
            loading: false,
            pageable: {
              paging: {
                page: data.paging.page,
                count: data.paging.totalPage,
              },
              entities: [...data.data],
            },
          }));
        } catch {
          setState(() => ({
            loading: false,
            pageable: {
              paging: {
                page: 0,
                count: 0,
              },
              entities: [],
            },
          }));
        }
      })();
    }, 1000);
  }, [params]);

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {state.loading && (
        <Loading
          sx={{
            position: "absolute",
            zIndex: 100,
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        />
      )}
      <Table
        dataGrid={{
          headData: headData.map((item, index) => (
            <ContentElm key={index} content={item} />
          )),
          bodyData: createbodyData(state.pageable.entities, handleChangeType),
          paging: {
            ...state.pageable.paging,
            onChange: handleChangePage,
          },
        }}
        sort={{
          options: sortings,
          onChange: handleSortings,
        }}
        search={{
          onChange: handleSearch,
        }}
      />
    </Box>
  );
};

export default Stall;

const createbodyData = (arr, callback) =>
  arr.map((item) => ({
    id: item.id,
    rows: [
      {
        field: "avatar",
        renderCell: (
          <Box
            component="img"
            sx={{
              width: "62px",
              height: "62px",
              objectFit: "cover",
            }}
            src={item.images[0]}
            //src={item.avatar.url}
          ></Box>
        ),
      },
      {
        field: "name",
        renderCell: <ContentElm content={item.name} />,
      },
      {
        field: "author",
        renderCell: <ContentElm content={item.author.name} />,
      },
      {
        field: "categories",
        renderCell: (
          <ContentElm content={item.categories.map((c) => c.name).join(",")} />
        ),
      },
      {
        field: "type",
        renderCell: (
          <SelectBase
            onChange={(selected) => callback(item.id, selected)}
            values={TYPE_CASE.map((t, index) => ({
              ...t,
              id: index,
              active: t.key == item.type,
            }))}
          />
        ),
      },
    ],
  }));

const TYPE_CASE = [
  {
    name: "Không có",
    key: null,
  },
  {
    name: "Phổ biến",
    key: "popular",
  },
  {
    name: "Xu hướng",
    key: "trend",
  },
];
