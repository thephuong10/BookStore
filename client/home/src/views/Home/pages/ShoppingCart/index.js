import React, { useEffect, useState } from "react";
import Container from "../../../../customs/components/Container";
import Quantity from "../../../../customs/components/Quantity";
import Button from "../../../../components/Button";
import Table from "../../../../components/Table";
import Order from "../Order";
import {
  CartCheckbox,
  ShoppingCartBottomStyled,
  ShoppingCartStyled,
  ShoppingCartEmptyStyled,
} from "./styles";
import Typography from "../../../../components/Typography";
import { CellCustomStyled } from "../../../../components/Table/styles";
import variables from "../../../../utils/styles/variables";
import mixin from "../../../../utils/styles/mixin";
import { isNumber, isArray, formatPrice } from "../../../../utils/fun";
import { useDispatch, useSelector } from "react-redux";
import userSelector from "../../../../redux/selector/userSelector";
import Modal from "../../../../components/Modal";
import UnauthorizedIamge from "../../../../assets/images/unauthorized.png";
import CartEmptyImage from "../../../../assets/images/cart-empty.png";
import { Link } from "react-router-dom";
import userApi from "../../../../apis/userApi";
import { userActions } from "../../../../redux/slice/UserSlice";
import { toastActions } from "../../../../redux/slice/ToastSlice";
const ShoppingCart = () => {
  const token = useSelector(userSelector.getToken);
  const dispatch = useDispatch();
  const [carts, setCarts] = useState([]);
  const [cartsUpdate, setCartsUpdate] = useState([]);
  const [order, setOrder] = useState(false);
  const handleOnChangeCheckAll = (e) => {
    const checked = e.target.checked;
    setCarts((oldValue) =>
      [...oldValue].map((item) => ({
        ...item,
        active: checked,
      }))
    );
  };
  const handleOnCheck = (id) => () => {
    const currentElm = carts.find((i) => i.id === id);
    currentElm.active = !currentElm.active;
    setCarts(() => [...carts]);
  };
  const handleOnChange = (id) => (value) => {
    const currElm = carts.find((i) => i.id === id);
    if (currElm && isNumber(value)) {
      if (value != currElm.total) {
        setCartsUpdate((oldValue) => {
          const updateElm = oldValue.find((i) => i.id === currElm.id);
          if (updateElm) {
            updateElm.total = value;
            return [...oldValue];
          } else {
            return [
              ...oldValue,
              {
                ...currElm,
              },
            ];
          }
        });
      } else {
        setCartsUpdate((oldValue) =>
          [...oldValue].filter((i) => i.id !== currElm.id)
        );
      }
    }
  };
  const handleUpdateCarts = () => {
    (async () => {
      try {
        const data = await userApi.updateCarts(
          cartsUpdate.map((item) => ({
            total: item.total,
            book: {
              id: item.book.id,
            },
          }))
        );
        dispatch(userActions.setTotalCart(data.totalCart));
        cartsUpdate.forEach((item) => {
          const curentElm = carts.find((i) => i.id == item.id);
          curentElm && (curentElm.total = item.total);
        });
        setCartsUpdate(() => []);
        dispatch(
          toastActions.create({
            status: "success",
            message: "Cập nhật thành công",
          })
        );
      } catch {
        dispatch(
          toastActions.create({
            status: "danger",
            message: "Lỗi hệ thống",
          })
        );
      }
    })();
  };
  const handleOnRemoves = () => {
    (async () => {
      try {
        console.log(carts.filter((i) => i.active).map((i) => i.id));
        const data = await userApi.deleteCarts(
          carts.filter((i) => i.active).map((i) => i.id)
        );
        dispatch(userActions.setTotalCart(data.totalCart));
        if (isArray(data.ids)) {
          let _carts = [...carts];
          let _cartsUpdate = [...cartsUpdate];
          data.ids.forEach((id) => {
            _carts = _carts.filter((i) => i.id != id);
            _cartsUpdate = _cartsUpdate.filter((i) => i.id != id);
          });
          setCarts(() => [..._carts]);
          setCartsUpdate(() => [..._cartsUpdate]);
          dispatch(
            toastActions.create({
              status: "success",
              message: "Cập nhật thành công",
            })
          );
        }
      } catch {
        dispatch(
          toastActions.create({
            status: "danger",
            message: "Lỗi hệ thống",
          })
        );
      }
    })();
  };
  useEffect(() => {
    (async () => {
      try {
        const data = await userApi.getAllCart();
        setCarts(() =>
          data.carts.map((item) => ({
            ...item,
            active: false,
          }))
        );
      } catch (error) {
        setCarts(() =>
          bodyData.map((item) => ({
            ...item,
            active: false,
          }))
        );
      }
    })();
  }, []);
  return (
    <>
      {order ? (
        <Order />
      ) : (
        <Container>
          <Typography
            size="mid"
            css={`
              color: ${variables.ui.colors.primary};
              font-weight: bold;
              margin-bottom: 20px;
            `}
          >
            Giỏ Hàng
          </Typography>
          {!token ? (
            <ShoppingCartEmptyStyled>
              <img src={UnauthorizedIamge} alt="" />
              <Typography
                css={`
                  & > a {
                    font-weight: 600;
                    margin-left: 2px;
                    &:hover {
                      color: ${variables.ui.colors.danger};
                    }
                  }
                `}
              >
                Vui lòng đăng nhập để theo dõi giỏ hàng của bạn.
                <Link to={"/xac-thuc/dang-nhap"}>Đăng nhập ở đây</Link>
              </Typography>
            </ShoppingCartEmptyStyled>
          ) : isArray(carts) ? (
            <ShoppingCartStyled>
              <div>
                <Table
                  headData={[
                    <CartCheckbox>
                      <input
                        onClick={handleOnChangeCheckAll}
                        type="checkbox"
                        checked={carts.every((item) => item.active)}
                      />
                    </CartCheckbox>,
                    ...headData.map((item) => (
                      <Typography
                        css={`
                          font-size: 15px;
                          font-weight: 600;
                        `}
                      >
                        {item}
                      </Typography>
                    )),
                  ]}
                  bodyData={carts.map((item) => ({
                    checkbox: (
                      <CartCheckbox onClick={handleOnCheck(item.id)}>
                        <input type="checkbox" checked={item.active} />
                      </CartCheckbox>
                    ),
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
                      <Quantity
                        min={1}
                        defaultValue={item.total}
                        max={item.book.total}
                        css={`
                          height: 35px;
                          & > span {
                            width: 38px;
                          }
                          & > input {
                            width: 45px;
                          }
                        `}
                        onChange={handleOnChange(item.id)}
                      />
                    ),
                    discount: (
                      <Typography css={typographyStyles} fullWidth>
                        {item.book.discount}%
                      </Typography>
                    ),
                  }))}
                />
              </div>
              <ShoppingCartBottomStyled>
                <div>
                  <Button
                    onClick={handleUpdateCarts}
                    css={`
                      padding: 0 30px;
                      justify-self: flex-end;
                    `}
                    disable={!Boolean(cartsUpdate.length)}
                  >
                    <Typography>Cật nhật giỏ hàng</Typography>
                  </Button>
                  {carts.find((item) => item.active) && (
                    <>
                      <Typography
                        css={`
                          display: flex;
                          align-items: center;
                          line-height: normal;
                          & > span {
                            position: relative;
                            font-size: 25px;
                            display: flex;
                            align-items: center;
                            margin-right: 16px;
                            transition: ease 0.3s;
                            cursor: pointer;
                            &:hover {
                              color: ${variables.ui.colors.danger};
                              &:after {
                                display: block;
                              }
                            }
                            &:after {
                              display: none;
                              position: absolute;
                              content: "Xóa các sản đã chọn";
                              white-space: nowrap;
                              padding: 5px 8px;
                              font-size: 13px;
                              color: #ffffff;
                              background-color: rgba(0, 0, 0, 0.5);
                              border-radius: 3px;
                              top: calc(100% + 5px);
                              left: 0;
                              transform: translateX(calc(-50% + 10px));
                            }
                          }
                        `}
                      >
                        <span onClick={handleOnRemoves}>
                          <i className="bx bxs-trash-alt"></i>
                        </span>
                        <strong>
                          ({carts.filter((item) => item.active).length} sản phẩm
                          )
                        </strong>
                      </Typography>
                    </>
                  )}
                </div>
                <div>
                  <Typography
                    css={`
                      font-weight: 600;
                      margin-right: 16px;

                      & > strong {
                        color: ${variables.ui.colors.danger};
                      }
                    `}
                  >
                    Tổng tiền :{" "}
                    <strong>
                      {formatPrice(
                        carts.reduce((a, b) => a + b.book.price * b.total, 0)
                      )}
                      đ
                    </strong>
                  </Typography>
                  <Button
                    css={`
                      padding: 0 30px;
                    `}
                    onClick={() => setOrder(() => true)}
                  >
                    <Typography>Mua hàng</Typography>
                  </Button>
                </div>
              </ShoppingCartBottomStyled>
            </ShoppingCartStyled>
          ) : (
            <ShoppingCartEmptyStyled>
              <img src={CartEmptyImage} />
              <Typography
                css={`
                  & > a {
                    font-weight: 600;
                    margin-left: 2px;
                    &:hover {
                      color: ${variables.ui.colors.danger};
                    }
                  }
                `}
              >
                Bạn chưa có sản phẩm nào trong giỏ hàng.
                <Link to={"/"}>Tiếp tục mua sắm</Link>
              </Typography>
            </ShoppingCartEmptyStyled>
          )}
        </Container>
      )}
    </>
  );
};

export default ShoppingCart;

const headData = ["Sản phẩm", "Giá", "Số lượng", "Giảm giá"];
const bodyData = [
  {
    id: 1,
    total: 1,
    totalMoney: 50000,
    book: {
      images: [
        "https://salt.tikicdn.com/cache/200x200/ts/product/f5/8f/5f/ba4492cd7e42546d128ffffdf9140844.jpg",
      ],
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
      images: [
        "https://salt.tikicdn.com/cache/200x200/ts/product/f5/8f/5f/ba4492cd7e42546d128ffffdf9140844.jpg",
      ],
      name: "Áo nỉ Hoodie Lục Lăng (unisex nam nữ đều mặc được)",
      price: 50000,
      discount: 0,
      priceOriginal: 50000,
      total: 10,
    },
  },
];
const typographyStyles = `
font-size: 14px;
font-weight: 400;
line-height: 1.3;

`;
