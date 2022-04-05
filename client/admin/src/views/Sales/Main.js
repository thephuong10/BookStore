import React, { useCallback, useEffect, useState } from "react";
import Moment from "react-moment";
import { Box, Typography } from "@mui/material";
import saleApi from "../../api/saleApi";
import Loading from "../../components/Loading";
import Table from "../../components/Table";
import mixin from "../../utils/styles/mixin";
import { useDispatch } from "react-redux";
import { AlertActions } from "../../redux/slice/alert";
import ButtonIcon from "../../components/ButtonIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import { isArray } from "../../utils/utils";

const headData = [
  "Ảnh bìa",
  "Tên",
  "Khuyến mãi",
  "Thời gian bắt đầu",
  "Thời gian kết thúc",
  "Thao tác",
];
const _sortings = [
  {
    title: "Khuyến mãi",
    sortBy: "discount",
  },
  {
    title: "Ngày bắt đầu",
    sortBy: "startTime",
  },
  {
    title: "Ngày kết thúc",
    sortBy: "endTime",
  },
];
const Main = ({ rootUrl }) => {
  const history = useHistory();
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
  const [sortings, setSortings] = useState(() => [..._sortings]);
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
  const [form, setForm] = useState({
    open: false,
    entityId: null,
  });

  const handleOnRemove = useCallback(
    (id) => () => {
      setState((oldValue) => ({
        ...oldValue,
        loading: true,
      }));
      (async () => {
        try {
          const data = await saleApi.delete(
            state.pageable.entities.filter((i) => i.id == id)
          );
          setState((oldValue) => ({
            ...oldValue,
            loading: false,
          }));
          setParams((oldValue) => ({
            ...oldValue,
            paging: {
              ...oldValue.paging,
              page: 1,
            },
          }));
          dispatch(
            AlertActions.showAlert({
              anchorOrigin: "bottom-right",
              message: "Xóa thành công",
              status: "success",
            })
          );
        } catch (error) {
          setState((oldValue) => ({
            ...oldValue,
            loading: false,
          }));
          const { response } = error;
          let message = "Xóa không thành công";
          if (response.data.status === 403) {
            message = "Bạn không có quyền thực hiện thao này này";
          }
          dispatch(
            AlertActions.showAlert({
              anchorOrigin: "bottom-right",
              message: message,
              status: "danger",
            })
          );
        }
      })();
    },
    [state.pageable.entities]
  );
  const handleOnEdit = (id) => () => {
    history.replace(`${rootUrl}/add-or-edit/${id}`);
  };
  const handleSortings = (sort) => {
    if (isArray(state.pageable.entities)) {
      setParams((oldValue) => ({
        ...oldValue,
        paging: {
          ...oldValue.paging,
          page: 1,
        },
        sorter: {
          sortBy: sort.sortBy,
          orderBy: sort.orderBy,
        },
      }));
    }
  };
  const handleChangePage = (page) => {
    setParams((oldValue) => ({
      ...oldValue,
      paging: {
        ...oldValue.paging,
        page: page,
      },
    }));
  };
  const handleSearch = (search) => {
    const sorter = params.sorter;
    setParams((oldValue) => ({
      paging: {
        ...oldValue.paging,
        page: 1,
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
          const data = await saleApi.getAll(params);
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
            inset: 0,
          }}
        />
      )}
      <Box
        sx={{
          opacity: state.loading ? 0 : 1,
          backgroundColor: "#fff",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
          padding: "16px 0",
        }}
      >
        <ButtonIcon
          title="Tạo đợt khuyến mãi"
          icon={AddIcon}
          onClick={() => history.replace(`${rootUrl}/add-or-edit/add`)}
          sx={{
            margin: "10px 18px 5px auto",
            display: "flex !important",
          }}
        />
        <Table
          dataGrid={{
            headData: headData.map((item, index) => (
              <ContentElm key={index}>{item}</ContentElm>
            )),
            bodyData: createbodyData(
              state.pageable.entities,
              handleOnEdit,
              handleOnRemove
            ),
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
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        />
      </Box>
    </Box>
  );
};

export default Main;
const ContentElm = ({ children }) => (
  <Typography
    sx={{
      ...mixin.textOverFlowMultiline(2),
    }}
  >
    {children}
  </Typography>
);
const createbodyData = (arr, callbackEdit, callbackRemove) =>
  arr.map((item) => ({
    id: item.id,
    rows: [
      {
        field: "banner",
        renderCell: (
          <Box
            component="img"
            sx={{
              width: "62px",
              height: "62px",
              objectFit: "cover",
            }}
            src={item.banner}
            //src={item.avatar.url}
          ></Box>
        ),
      },
      {
        field: "name",
        renderCell: <ContentElm>{item.name}</ContentElm>,
      },
      {
        field: "discount",
        renderCell: <ContentElm>{item.discount}%</ContentElm>,
      },
      {
        field: "startTime",
        renderCell: (
          <ContentElm>
            <Moment format="DD/MM/YYYY">{item.startTime}</Moment>
          </ContentElm>
        ),
      },
      {
        field: "endTime",
        renderCell: (
          <ContentElm>
            <Moment format="DD/MM/YYYY">{item.endTime}</Moment>
          </ContentElm>
        ),
      },
      {
        field: "actions",
        renderCell: (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <ButtonIcon
              title="Chỉnh sửa"
              icon={EditIcon}
              onClick={callbackEdit(item.id)}
              sx={{
                width: "35px !important",
                height: "35px !important",
                "& > svg": {
                  width: "22px !important",
                  height: "22px !important",
                },
              }}
            />
            <ButtonIcon
              title="Xóa"
              color="danger"
              icon={DeleteIcon}
              onClick={callbackRemove(item.id)}
              sx={{
                width: "35px !important",
                height: "35px !important",
                "& > svg": {
                  width: "22px !important",
                  height: "22px !important",
                },
              }}
            />
          </Box>
        ),
      },
    ],
  }));
