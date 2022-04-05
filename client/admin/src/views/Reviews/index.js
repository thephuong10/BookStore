import React, { useEffect, useState } from "react";
import { Box, Typography, Modal } from "@mui/material";
import Loading from "../../components/Loading";
import Table from "../../components/Table";
import SelectBase from "../../components/SelectBase";
import { useDispatch } from "react-redux";
import { AlertActions } from "../../redux/slice/alert";
import { formatPrice, isArray } from "../../utils/utils";
import reviewsApi from "../../api/reviewsApi";
import mixin from "../../utils/styles/mixin";

import Reviewsdetail from "./ReviewsDetail";

const headData = [
  "Hình sản phẩm",
  "Sản phẩm đánh giá",
  "Khách hàng",
  "Tình trạng",
];

const REVIEWS_STATUS = {
  pending: "PENDING",
  confirmed: "CONFIRMED",
};
const REVIEWS_STATUS_VI = {
  [REVIEWS_STATUS["pending"]]: "Chờ xác nhận",
  [REVIEWS_STATUS["confirmed"]]: "Đã xác nhận",
};

const ContentElm = ({ content }) => (
  <Typography
    sx={{
      ...mixin.textOverFlowMultiline(2),
    }}
  >
    {content}
  </Typography>
);
const Reviews = () => {
  const dispatch = useDispatch();
  const [modal, setModel] = useState({
    open: false,
    entity: null,
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
          const data = await reviewsApi.update(id, selected.code);
          setState((old) => ({
            ...old,
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
  const handleShowReviewDetail = (id) => {
    setModel(() => ({
      open: true,
      entity: state.pageable.entities.find((i) => i.id === id),
    }));
  };
  useEffect(() => {
    setState((oldValue) => ({ ...oldValue, loading: true }));
    setTimeout(() => {
      (async () => {
        try {
          const data = await reviewsApi.getAll(params);
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
            onEditRow: handleShowReviewDetail,
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
            entity: null,
          }))
        }
      >
        <Reviewsdetail entity={modal.entity} />
      </Modal>
    </>
  );
};

export default Reviews;

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
            src={item.book.images[0]}
            //src={item.avatar.url}
          ></Box>
        ),
      },
      {
        field: "name",
        renderCell: <ContentElm content={item.book.name} />,
      },
      {
        field: "user",
        renderCell: <ContentElm content={item.user.user.fullname} />,
      },
      {
        field: "status",
        renderCell: (
          <SelectBase
            sx={{
              width: "200px",
            }}
            onChange={(selected) => callback(item.id, selected)}
            values={Object.keys(REVIEWS_STATUS_VI).map((key, index) => ({
              id: index,
              name: REVIEWS_STATUS_VI[key],
              active: key == item.status,
              code: key,
            }))}
          />
        ),
      },
    ],
  }));
