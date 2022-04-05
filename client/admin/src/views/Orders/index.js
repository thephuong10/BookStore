import React, { useEffect, useState } from "react";
import { Box, Typography, Modal } from "@mui/material";
import Loading from "../../components/Loading";
import Table from "../../components/Table";
import SelectBase from "../../components/SelectBase";
import { useDispatch } from "react-redux";
import { AlertActions } from "../../redux/slice/alert";
import { formatPrice, isArray } from "../../utils/utils";
import orderApi from "../../api/orderApi";
import mixin from "../../utils/styles/mixin";
import variables from "../../utils/styles/variables";
import OrderDetail from "./OrderDetail";

const ORDER_STATUS = {
  pending: "PENDING",
  confirmed: "CONFIRMED",
  delivery: "DELIVERY",
  successful: "SUCCESSFUL",
  cancel: "CANCEL",
};

const ORDER_STATUS_COLORS = {
  [ORDER_STATUS["pending"]]: variables.colors.danger,
  [ORDER_STATUS["confirmed"]]: variables.colors.info,
  [ORDER_STATUS["delivery"]]: variables.colors.warn,
  [ORDER_STATUS["successful"]]: variables.colors.success,
  [ORDER_STATUS["cancel"]]: variables.colors.BgDisable,
};

const ORDER_STATUS_VI = {
  [ORDER_STATUS["pending"]]: "Chờ xác nhận",
  [ORDER_STATUS["confirmed"]]: "Đã xác nhận",
  [ORDER_STATUS["delivery"]]: "Đang giao hàng",
  [ORDER_STATUS["successful"]]: "Đã nhận hàng",
  [ORDER_STATUS["cancel"]]: "Đã hủy",
};

const headData = [
  "Khách hàng",
  "Số điện thoại",
  "Tổng tiền",
  "Tình trạng đơn hàng",
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
const Orders = () => {
  const dispatch = useDispatch();
  const [modal, setModel] = useState({
    open: false,
    id: null,
  });
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
  const handleChangePage = (page) => {
    setParams((oldValue) => ({
      ...oldValue,
      paging: {
        page: page,
        limit: 5,
      },
    }));
  };
  const handleUpdateStatus = (id, selected) => {
    setState((old) => ({
      ...old,
      loading: true,
    }));
    setTimeout(() => {
      (async () => {
        try {
          const data = await orderApi.update(id, selected.code);
          // const _order = state.pageable.entities.find((i) => i.id === id);
          // _order && (_order.status = selected.code);
          setState((old) => ({
            ...old,
            // pageable: {
            //   ...old.pageable,
            //   entities: [...state.pageable.entities],
            // },
            loading: false,
          }));
          dispatch(
            AlertActions.showAlert({
              message: "Cập nhật thành công",
              status: "success",
            })
          );
        } catch (error) {
          setState((old) => ({
            ...old,
            loading: false,
          }));
          const { response } = error;
          let message = "Cập nhật không thành công";
          if (response.data.status === 403) {
            message = "Bạn không có quyền thực hiện thao này này";
          }
          dispatch(
            AlertActions.showAlert({
              message: message,
              status: "danger",
            })
          );
        }
      })();
    }, 500);
  };
  useEffect(() => {
    setState((oldValue) => ({ ...oldValue, loading: true }));
    setTimeout(() => {
      (async () => {
        try {
          const data = await orderApi.getAll(params);
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
    <>
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
            bodyData: createbodyData(
              state.pageable.entities,
              handleUpdateStatus
            ),
            editRow: true,
            onEditRow: (id) =>
              setModel(() => ({
                open: true,
                id: id,
              })),
            paging: {
              ...state.pageable.paging,
              onChange: handleChangePage,
            },
            sx: {
              overflow: "visible",
            },
          }}
          sx={{
            overflow: "visible !important",
          }}
        />
      </Box>
      <Modal
        open={modal.open}
        onClose={() =>
          setModel(() => ({
            open: false,
            id: null,
          }))
        }
      >
        <OrderDetail id={modal.id} />
      </Modal>
    </>
  );
};

export default Orders;

const createbodyData = (arr, callback) =>
  arr.map((item) => ({
    id: item.id,
    rows: [
      {
        field: "customer",
        renderCell: <ContentElm content={item.customer.user.fullname} />,
      },
      {
        field: "phone",
        renderCell: <ContentElm content={item.customer.user.phone} />,
      },
      {
        field: "totalMoney",
        renderCell: <ContentElm content={`${formatPrice(item.totalMoney)}đ`} />,
      },
      {
        field: "status",
        renderCell: (
          <SelectBase
            sx={{
              width: "200px",
            }}
            onChange={(selected) => callback(item.id, selected)}
            values={Object.keys(ORDER_STATUS_VI).map((key, index) => ({
              id: index,
              name: ORDER_STATUS_VI[key],
              active: key == item.status,
              code: key,
              disable: key === ORDER_STATUS["cancel"],
            }))}
          />
        ),
      },
    ],
  }));
