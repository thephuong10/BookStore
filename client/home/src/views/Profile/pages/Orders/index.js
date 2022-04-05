import React, { useEffect, useState } from "react";
import Typography from "../../../../components/Typography";
import Modal from "../../../../components/Modal";
import Table from "../../../../components/Table";
import * as yup from "yup";
import {
  OrderStyled,
  OrderWrapStyled,
  OrderRowStyled,
  OrderMoneyStyled,
  OrderEmpty,
} from "./styles";
import Form from "../../../../customs/formik/Form";
import Button from "../../../../components/Button";
import variables from "../../../../utils/styles/variables";
import { FastField } from "formik";
import Textarea from "../../../../components/Textarea";
import formErrorMassage from "../../../../utils/formErrorMassage";
import FormControl from "../../../../customs/formik/FormControl";
import Reviews from "./Reviews";
import { isArray } from "../../../../utils/fun";
import OrderEmptyImage from "../../../../assets/images/order-empty.png";
import userApi from "../../../../apis/userApi";

const ORDER_STATUS = {
  pending: "PENDING",
  confirmed: "CONFIRMED",
  delivery: "DELIVERY",
  successful: "SUCCESSFUL",
  cancel: "CANCEL",
};
const ORDER_STATUS_VI = {
  [ORDER_STATUS["pending"]]: "Chờ xác nhận",
  [ORDER_STATUS["confirmed"]]: "Đã xác nhận",
  [ORDER_STATUS["delivery"]]: "Đang giao hàng",
  [ORDER_STATUS["successful"]]: "Đã nhận hàng",
  [ORDER_STATUS["cancel"]]: "Đã hủy",
};

// const orders = [
//   {
//     status: "PENDING",
//     orderDetail: [
//       {
//         total: 1,
//         price: 50000,
//         discount: 0,
//         totalMoney: 50000,
//         book: {
//           avatar:
//             "https://salt.tikicdn.com/cache/200x200/ts/product/f5/8f/5f/ba4492cd7e42546d128ffffdf9140844.jpg",
//           name: "Áo nỉ Hoodie Lục Lăng (unisex nam nữ đều mặc được)",
//         },
//       },
//       {
//         total: 1,
//         price: 50000,
//         discount: 0,
//         totalMoney: 50000,
//         book: {
//           avatar:
//             "https://salt.tikicdn.com/cache/200x200/ts/product/f5/8f/5f/ba4492cd7e42546d128ffffdf9140844.jpg",
//           name: "Áo nỉ Hoodie Lục Lăng (unisex nam nữ đều mặc được)",
//         },
//       },
//     ],
//     shippingCost: 10000,
//     totalMoney: 100000,
//   },
//   {
//     status: "CONFIRMED",
//     orderDetail: [
//       {
//         total: 1,
//         price: 50000,
//         discount: 0,
//         totalMoney: 50000,
//         book: {
//           avatar:
//             "https://salt.tikicdn.com/cache/200x200/ts/product/f5/8f/5f/ba4492cd7e42546d128ffffdf9140844.jpg",
//           name: "Áo nỉ Hoodie Lục Lăng (unisex nam nữ đều mặc được)",
//         },
//       },
//       {
//         total: 1,
//         price: 50000,
//         discount: 0,
//         totalMoney: 50000,
//         book: {
//           avatar:
//             "https://salt.tikicdn.com/cache/200x200/ts/product/f5/8f/5f/ba4492cd7e42546d128ffffdf9140844.jpg",
//           name: "Áo nỉ Hoodie Lục Lăng (unisex nam nữ đều mặc được)",
//         },
//       },
//       {
//         total: 1,
//         price: 50000,
//         discount: 0,
//         totalMoney: 50000,
//         book: {
//           avatar:
//             "https://salt.tikicdn.com/cache/200x200/ts/product/f5/8f/5f/ba4492cd7e42546d128ffffdf9140844.jpg",
//           name: "Áo nỉ Hoodie Lục Lăng (unisex nam nữ đều mặc được)",
//         },
//       },
//     ],
//     shippingCost: 10000,
//     totalMoney: 150000,
//   },
//   {
//     status: "SUCCESSFUL",
//     orderDetail: [
//       {
//         total: 1,
//         price: 50000,
//         discount: 0,
//         totalMoney: 50000,
//         book: {
//           avatar:
//             "https://salt.tikicdn.com/cache/200x200/ts/product/f5/8f/5f/ba4492cd7e42546d128ffffdf9140844.jpg",
//           name: "Áo nỉ Hoodie Lục Lăng (unisex nam nữ đều mặc được)",
//         },
//       },
//     ],
//     shippingCost: 10000,
//     totalMoney: 50000,
//   },
// ];
//const orders = [];
const headData = ["Sản phẩm", "Giá", "Số lượng", "Giảm giá"];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await userApi.getAllOrder();
      setOrders(() => [...data]);
    })();
  }, []);

  return (
    <OrderWrapStyled>
      {isArray(orders) ? (
        <>
          {orders.map((item, index) => (
            <Order key={index} order={item} />
          ))}
        </>
      ) : (
        <OrderEmpty>
          <img src={OrderEmptyImage} />
          <Typography>Chưa có đơn hàng nào</Typography>
        </OrderEmpty>
      )}
    </OrderWrapStyled>
  );
};

export default Orders;

const typographyStyles = `
font-size: 14px;
font-weight: 400;
line-height: 1.3;

`;

const Order = ({ order }) => {
  return (
    <>
      <OrderStyled status={order.status}>
        <div>
          <Typography
            css={`
              font-weight: bold;
              padding: 0 16px;
            `}
          >
            <span>Tình trạng đơn hàng : </span>
            <strong>{ORDER_STATUS_VI[order.status]}</strong>
          </Typography>
          {order.status === ORDER_STATUS["pending"] && <OrderCancel />}
        </div>
        <Table
          headData={headData.map((item) => (
            <Typography
              css={`
                font-size: 15px;
                font-weight: 600;
              `}
            >
              {item}
            </Typography>
          ))}
          bodyData={order.orderDetail.map((item) => ({
            product: (
              <OrderRowStyled>
                <img src={item.book.images[0]} />
                <div>
                  <Typography>{item.book.name}</Typography>
                  {order.status === ORDER_STATUS["successful"] && (
                    <Reviews bookId={item.book.id} />
                  )}
                </div>
              </OrderRowStyled>
            ),
            price: (
              <Typography css={typographyStyles} fullWidth align="center">
                {item.price}đ
              </Typography>
            ),
            total: (
              <Typography css={typographyStyles} fullWidth align="center">
                {item.total}
              </Typography>
            ),
            discount: (
              <Typography css={typographyStyles} fullWidth align="center">
                {item.discount || 0}%
              </Typography>
            ),
          }))}
        />
        <OrderMoneyStyled>
          <Typography>
            <span>Phí vận chuyển : </span>
            <strong>{order.shippingCost}đ </strong>
          </Typography>
          <Typography
            css={`
              color: ${variables.ui.colors.danger};
              font-weight: bold;
            `}
          >
            <span>Tổng cộng : </span>
            <strong>{order.totalMoney}đ </strong>
          </Typography>
        </OrderMoneyStyled>
      </OrderStyled>
    </>
  );
};

// order cancel

const fieldsCancel = {
  name: "reason",
  fieldcomponent: Textarea,
  label: "Lý do",
  propschildcomponent: {
    placeholder: "Lý do hủy đơn hàng",
  },
};
const initialValuesCancel = {
  reason: "",
};
const validationCancelSchema = yup.object().shape({
  reason: yup
    .string()
    .required(formErrorMassage.required)
    .min(10, formErrorMassage.minString(10, "kí tự"))
    .max(200, formErrorMassage.minString(200, "kí tự")),
});

const OrderCancel = () => {
  const [open, setOpen] = useState(false);
  const hanleOpenCancel = () => {
    setOpen(() => true);
  };
  const hanleCloseCancel = () => {
    setOpen(() => false);
  };
  return (
    <>
      <Button variant="outlined" onClick={hanleOpenCancel}>
        <Typography
          css={`
            padding: 0;
            font-size: 15px;
          `}
        >
          Hủy đơn hàng
        </Typography>
      </Button>
      <Modal
        open={open}
        onClose={hanleCloseCancel}
        css={`
          & > form {
            display: flex;
            flex-direction: column;
            padding: 10px;
          }
        `}
      >
        <Typography
          css={`
            font-size: 18px;
            font-weight: bold;
            padding: 16px 0;
          `}
        >
          Lý do hủy đơn hàng
        </Typography>
        <Form
          validationSchema={validationCancelSchema}
          initialValues={initialValuesCancel}
        >
          <FastField component={FormControl} {...fieldsCancel} />
          <Button>
            <Typography
              css={`
                padding: 0;
                font-size: 15px;
              `}
            >
              Xác nhận
            </Typography>
          </Button>
        </Form>
      </Modal>
    </>
  );
};
