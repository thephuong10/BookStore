import React, { useState, useEffect } from "react";
import Container from "../../../../customs/components/Container";
import Table from "../../../../components/Table";
import Loading from "../../../../components/Loading";
import { CellCustomStyled } from "../../../../components/Table/styles";
import Typography from "../../../../components/Typography";
import Steper from "../../../../components/Steper";
import Formaddress from "../../../Profile/components/FormAddress";
import mixin from "../.././../../utils/styles/mixin";
import variables from "../.././../../utils/styles/variables";
import { OrderWrapStyled, ConfirmOrderStyled } from "./styles";
import Button from "../../../../components/Button";
import userApi from "../../../../apis/userApi";
import {
  deleteKey,
  flattenObject,
  formatPrice,
  isObject,
} from "../../../../utils/fun";
import { useSelector, useDispatch } from "react-redux";
import userSelector from "../../../../redux/selector/userSelector";
import Component from "../../../../customs/components/Component";
import { userActions } from "../../../../redux/slice/UserSlice";
import { toastActions } from "../../../../redux/slice/ToastSlice";
import { useHistory } from "react-router-dom";
const steps = ["Thông tin địa chỉ", "Xác nhận đơn hàng"];
const Order = () => {
  const [tab, setTab] = useState(0);
  console.log(tab);
  return (
    <Container>
      <Typography
        size="mid"
        css={`
          color: ${variables.ui.colors.primary};
          font-weight: bold;
          margin-bottom: 20px;
        `}
      >
        Tạo đơn hàng
      </Typography>
      <OrderWrapStyled>
        <Steper
          steps={steps}
          activeStep={tab}
          css={`
            justify-self: flex-start;
          `}
        />
        <div>
          <Component
            element={tabs.find((item) => item.tabIndex === tab).tab}
            setTab={setTab}
          />
        </div>
      </OrderWrapStyled>
    </Container>
  );
};

export default Order;

const CofirmAddress = ({ setTab }) => {
  const info = useSelector(userSelector.getInfo);
  const dispatch = useDispatch();
  if (info.phone && info.address) {
    setTab(() => 1);
    return <></>;
  }

  const handleOnSubmit = (values, callback) => {
    callback(true);
    setTimeout(() => {
      (async () => {
        try {
          const phone = values.phone;
          const _address = deleteKey(flattenObject(values), "phone");
          const data = await userApi.updateAddress(phone, _address);
          dispatch(userActions.setAddress(_address));
          callback(false);
          setTab(() => 1);
        } catch {
          callback(false);
        }
      })();
    }, 1000);
  };
  return (
    <>
      <Formaddress onSubmit={handleOnSubmit} />
    </>
  );
};

const headData = ["Sản phẩm", "Giá", "Số lượng", "Giảm giá"];
const bodyData = [
  {
    id: 1,
    total: 1,
    totalMoney: 50000,
    book: {
      avatar:
        "https://salt.tikicdn.com/cache/200x200/ts/product/f5/8f/5f/ba4492cd7e42546d128ffffdf9140844.jpg",
      name: "Áo nỉ Hoodie Lục Lăng (unisex nam nữ đều mặc được)",
      price: 50000,
      discount: 0,
      priceOriginal: 50000,
      total: 10,
    },
  },
  {
    id: 2,
    total: 1,
    totalMoney: 50000,
    book: {
      avatar:
        "https://salt.tikicdn.com/cache/200x200/ts/product/f5/8f/5f/ba4492cd7e42546d128ffffdf9140844.jpg",
      name: "Áo nỉ Hoodie Lục Lăng (unisex nam nữ đều mặc được)",
      price: 50000,
      discount: 0,
      priceOriginal: 50000,
      total: 10,
    },
  },
];

const CofirmOrder = () => {
  const info = useSelector(userSelector.getInfo);
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [feeShipping, setFeeShipping] = useState(0);
  const [carts, setCarts] = useState([]);
  const handleOrder = () => {
    setLoading(() => true);
    setTimeout(() => {
      (async () => {
        try {
          const data = await userApi.order(feeShipping);
          dispatch(userActions.setTotalCart(0));
          history.replace("/");
          setLoading(() => false);
          dispatch(
            toastActions.create({
              status: "success",
              message: "Mua hàng thành công",
            })
          );
        } catch {
          setLoading(() => false);
          dispatch(
            toastActions.create({
              status: "danger",
              message: "Lỗi hệ thống",
            })
          );
        }
      })();
    }, 1000);
  };
  useEffect(() => {
    (async () => {
      try {
        const [_carts, _fee] = await Promise.all([
          userApi.getAllCart(),
          userApi.getFeeShipping(),
        ]);
        setCarts(() => _carts.carts);
        setFeeShipping(() => _fee.data["service_fee"]);
        setLoading(() => false);
      } catch {
        setLoading(() => false);
      }
    })();
  }, []);
  return (
    <ConfirmOrderStyled>
      {loading && <Loading />}
      <>
        <Table
          headData={headData.map((item) => (
            <Typography
              css={`
                font-size: 15px;
                font-weight: 600;
                padding: 8px 0;
              `}
            >
              {item}
            </Typography>
          ))}
          bodyData={carts.map((item) => ({
            product: (
              <CellCustomStyled
                css={`
                  display: flex;
                  align-items: center;
                  & > img {
                    width: 60px;
                    height: 60px;
                    margin-right: 10px;
                  }
                `}
              >
                <img src={item.book.images[0]} />
                <Typography
                  css={`
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 1.3;
                    ${mixin.textOverflowMultipleLines(2)}
                  `}
                >
                  {item.book.name}
                </Typography>
              </CellCustomStyled>
            ),
            price: (
              <Typography css={typographyStyles} fullWidth>
                {formatPrice(item.book.price)}đ
              </Typography>
            ),
            total: (
              <Typography css={typographyStyles} fullWidth>
                {item.total}
              </Typography>
            ),
            discount: (
              <Typography css={typographyStyles} fullWidth>
                {item.book.discount}%
              </Typography>
            ),
          }))}
        />
        <div>
          <Typography
            css={`
              width: 50%;
              padding-right: 80px;
              display: flex;
              flex-direction: column;
              font-weight: 600;
              gap: 8px;
              & > span strong {
                color: ${variables.ui.colors.danger};
              }
            `}
          >
            {isObject(info) ? (
              <>
                <span>
                  Số điện thoại : <strong>{info.phone}</strong>
                </span>
                <span>
                  Địa chỉ : <strong>{createAddressDetail(info.address)}</strong>
                </span>
              </>
            ) : (
              "Địa chỉ"
            )}
          </Typography>
          <div>
            <Typography
              css={`
                display: flex;
                flex-direction: column;
                gap: 10px;
                font-weight: 600;
                & > span:last-child strong {
                  color: ${variables.ui.colors.danger};
                }
              `}
            >
              <span>
                Tạm tính :{" "}
                <strong>
                  {formatPrice(
                    carts.reduce((a, b) => a + b.total * b.book.price, 0)
                  )}
                  đ
                </strong>
              </span>
              <span>
                Phí vận chuyển : <strong>{formatPrice(feeShipping)}đ</strong>
              </span>
              <span>
                Tổng tiền :{" "}
                <strong>
                  {formatPrice(
                    carts.reduce((a, b) => a + b.total * b.book.price, 0) +
                      feeShipping
                  )}
                  đ
                </strong>
              </span>
            </Typography>
            <Button
              onClick={handleOrder}
              css={`
                padding: 0 30px;
              `}
            >
              <Typography>Mua hàng</Typography>
            </Button>
          </div>
        </div>
      </>
    </ConfirmOrderStyled>
  );
};
const typographyStyles = `
font-size: 14px;
font-weight: 400;
line-height: 1.3;

`;
const tabs = [
  {
    tab: CofirmAddress,
    tabIndex: 0,
  },
  {
    tab: CofirmOrder,
    tabIndex: 1,
  },
];

const createAddressDetail = (address) =>
  `${address.provinceName},${address.districtName},${address.wardName},${address.addressDetail}`;
