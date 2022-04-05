import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import Loading from "../../components/Loading";
import Table from "../../components/Table";
import mixin from "../../utils/styles/mixin";
import orderApi from "../../api/orderApi";
import { formatPrice, isNumber, isObject } from "../../utils/utils";
import variables from "../../utils/styles/variables";

const headData = [
  "Hình ảnh",
  "Tên sách",
  "Thể loại",
  "Số lượng",
  "Giá",
  "Giảm giá",
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

const Orderdetail = ({ id }) => {
  const [state, setState] = useState(null);
  useEffect(() => {
    if (isNumber(id)) {
      (async () => {
        const data = await orderApi.getOrderDetailById(id);
        setState(() => ({
          ...data,
        }));
      })();
    }
  }, [id]);
  return (
    <Paper
      sx={{
        position: "absolute",
        width: "100%",
        maxWidth: "1120px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      {isObject(state) ? (
        <>
          <Table
            dataGrid={{
              headData: headData.map((item, index) => (
                <ContentElm key={index} content={item} />
              )),
              bodyData: createbodyData(state.orderDetail),
            }}
            sx={{
              boxShadow: "none",
            }}
          />
          <Grid
            container
            sx={{
              padding: "0px 25px 20px 25px",
            }}
          >
            <Grid item md={6}>
              <Typography
                sx={{
                  " & > span": {
                    display: "block",
                  },
                }}
              >
                <span>
                  Số điện thoại : <strong>{state.customer.user.phone}</strong>
                </span>
                <span>
                  Địa chỉ :{" "}
                  <strong>
                    {createAddressDetail(state.customer.user.address)}
                  </strong>
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              md={6}
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                gap: "20px",
              }}
            >
              <Typography>
                <span>Phí vận chuyển : </span>
                <strong>{formatPrice(state.shippingCost)}đ </strong>
              </Typography>
              <Typography
                sx={{
                  "& strong": {
                    color: variables.colors.danger,
                  },
                }}
              >
                <span>Tổng cộng : </span>
                <strong>
                  {formatPrice(state.totalMoney + state.shippingCost)}đ{" "}
                </strong>
              </Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <></>
      )}
    </Paper>
  );
};

export default React.memo(Orderdetail);

const createbodyData = (arr) =>
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
        field: "categories",
        renderCell: (
          <ContentElm
            content={item.book.categories.map((c) => c.name).join(",")}
          />
        ),
      },
      {
        field: "total",
        renderCell: <ContentElm content={item.total} />,
      },
      {
        field: "price",
        renderCell: <ContentElm content={`${formatPrice(item.price)}đ`} />,
      },
      {
        field: "discount",
        renderCell: <ContentElm content={`${item.discount || 0}%`} />,
      },
    ],
  }));
const createAddressDetail = (address) =>
  `${address.provinceName},${address.districtName},${address.wardName},${address.addressDetail}`;
