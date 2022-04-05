import React, { useEffect, useRef, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import bookApi from "../../../../apis/bookApi";
import Button from "../../../../components/Button";
import Grid, { GridItem } from "../../../../components/Grid";
import Typography from "../../../../components/Typography";
import Container from "../../../../customs/components/Container";
import Stars from "../../../../customs/components/Stars";
import { isArray, isNumber } from "../../../../utils/fun";
import {
  ProductDetailAvatarStyled,
  ProductDetailInfoStyled,
  ProductDetailReviewStyled,
  ProductDetailAddToCartStyled,
  ProductDetailPriceStyled,
  ProductDetailDescStyled,
} from "./styles";
import variables from "../../../../utils/styles/variables";
import mixin from "../../../../utils/styles/mixin";
import Quantity from "../../../../customs/components/Quantity";
import Table from "../../../../components/Table";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import userSelector from "../../../../redux/selector/userSelector";
import userApi from "../../../../apis/userApi";
import { userActions } from "../../../../redux/slice/UserSlice";
import Modal from "../../../../components/Modal";
import { toastActions } from "../../../../redux/slice/ToastSlice";
const bookTest = {
  id: 50,
  name: "Tam sinh tam thế thập lý đào hoa",
  price: 100000,
  priceOriginal: 200000,
  selled: 10,
  discount: 50,
  total: 20,
  pages: 300,
  author: {
    name: "Hoằng Hỏa",
  },
  publicCompany: {
    name: "Tam Vị Hỏa",
  },
  categories: [
    {
      name: "Lãng Mạn",
    },
    {
      name: "Kỳ Ảo",
    },
    {
      name: "Tiên Hiệp",
    },
  ],
  rating: {
    ratingList: [9, 4, 14, 43, 173],
    ratingStar: 4.5,
  },
  images: [
    "https://upload.wikimedia.org/wikipedia/vi/1/1f/Poster_Tam_Sinh_Tam_The_Thap_Ly_Dao_Hoa.jpg",
  ],
  width: 10,
  height: 20,
  weight: 1,
  description: `<p>Azit Nexin là nhà văn trào phúng nổi tiếng của đất nước Thổ Nhĩ Kỳ. Những chi tiết nhỏ nhặt trong cuộc sống như chuyện uống trà, cưới hỏi, vệ sinh ăn uống... qua con mắt của Nexin đều mang một ý nghĩa hài hước và thú vị bởi ông luôn có những liên tưởng hết sức độc đáo, sáng tạo.</p>\n<p>Chuyện tình đẫm lệ</p>\n<p>Cuộc truy tìm dấu vết cà chua</p>\n<p>Giới quý tộc làng chúng tôi</p>\n<p>Cuộc chiến chống các ngôi sao điện ảnh</p>\n<p>Ẩu đả trong bóng tối</p>\n<p>Tình vỡ mộng tan</p>\n<p>Gửi người ngồi ghế phô-tơi</p>\n<p>Nỗi bất hạnh của chúng ta là ở đó</p>\n<p>Xứ sở của những người ngáp</p>\n<p>Giấc mơ Mỹ</p>\n<p>...</p>\n`,
};
const ProductDetail = () => {
  const [book, setBook] = useState(null);
  const { params } = useRouteMatch();
  useEffect(() => {
    if (params.key && isNumber(params.key)) {
      (async () => {
        try {
          const data = await bookApi.getOneById(params.key);
          setBook(() => data);
        } catch (error) {
          setBook(() => bookTest);
        }
      })();
    }
  }, []);
  return (
    <>
      {book && (
        <>
          <Container
            css={`
              border-radius: 10px;
              box-shadow: ${variables.boxShadow};
              margin-bottom: 50px;
            `}
          >
            <Grid
              css={`
                padding: 20px 0;
              `}
            >
              <GridItem col={5}>
                <ProductImages data={isArray(book.images) ? book.images : []} />
              </GridItem>
              <GridItem col={7}>
                <ProductDetailInfoStyled>
                  <Typography
                    css={`
                      font-size: 22px;
                      padding: 10px 0;
                    `}
                  >
                    {book.name}
                  </Typography>
                  <ProductDetailReviewStyled>
                    <Typography
                      css={`
                        display: flex;
                        gap: 10px;
                        align-items: center;
                        font-size: 14px;
                        font-weight: 400;
                        padding: 0;
                      `}
                    >
                      <Stars star={book.rating.ratingStar} />
                      <span>
                        (
                        {book.rating.ratingList.reduce(
                          (a, b) => a + parseInt(b),
                          0
                        )}{" "}
                        lượt đánh giá)
                      </span>
                    </Typography>
                    <Typography
                      css={`
                        font-size: 14px;
                        font-weight: 400;
                        padding: 0;
                      `}
                    >
                      <span>Đã bán : {book.selled}</span>
                    </Typography>
                  </ProductDetailReviewStyled>
                  <ProductDetailPriceStyled>
                    <Typography
                      size="big"
                      css={`
                        padding: 0;
                        color: ${variables.ui.colors.red};
                        line-height: 1;
                      `}
                    >
                      {book.price}đ
                    </Typography>
                    {book.discount > 0 ? (
                      <>
                        <Typography
                          css={`
                            font-size: 15px;
                            line-height: 1;
                            padding: 0;
                            & > span:first-child {
                              text-decoration: line-through;
                            }
                            & > span:last-child {
                              margin-left: 10px;
                              display: inline-flex;
                              align-items: center;
                              padding: 0 8px;
                              color: ${variables.ui.colors.red};
                              border: 1px solid;
                              border-color: currentcolor;
                              border-radius: 3px;
                              background-color: ${mixin.colorRgba(
                                variables.ui.colors.red,
                                0.15
                              )};
                            }
                          `}
                        >
                          <span>{book.priceOriginal}đ</span>
                          <span>-{book.discount}%</span>
                        </Typography>
                      </>
                    ) : (
                      <></>
                    )}
                  </ProductDetailPriceStyled>
                  <ProductAddToCard total={book.total} bookId={book.id} />
                  <ProductContentTable book={book} />
                  <ProductDesc desc={book.description} />
                </ProductDetailInfoStyled>
              </GridItem>
            </Grid>
          </Container>
          <Rating
            book={{
              id: book.id,
              rating: book.rating,
            }}
          />
        </>
      )}
    </>
  );
};

export default ProductDetail;
const data = {
  ease: 0.05,
  current: 0,
  previous: 0,
};
const smoothScrollingHandler = () => {
  data.current = document.documentElement.scrollTop;
  data.previous += (data.current - data.previous) * data.ease;
  document.documentElement.scrollTop = data.current - data.previous;
  if (data.current > 5) {
    requestAnimationFrame(() => smoothScrollingHandler());
  }
};
const ProductAddToCard = ({ total = 0, bookId = null }) => {
  const totalCart = useRef(1);
  const dispatch = useDispatch();
  const token = useSelector(userSelector.getToken);

  const hanleOnClick = () => {
    if (token) {
      (async () => {
        try {
          const data = await userApi.addToCart({
            total: totalCart.current,
            book: {
              id: bookId,
            },
          });
          dispatch(userActions.setTotalCart(data.totalCart));
          dispatch(
            toastActions.create({
              status: "success",
              message: "Thêm vào giỏ hàng thành công",
            })
          );
        } catch (error) {
          const { response } = error;
          if (response.data && response.data.message) {
            dispatch(
              toastActions.create({
                status: "danger",
                message: response.data.message,
              })
            );
          }
        }
      })();
    } else {
      dispatch(
        toastActions.create({
          status: "info",
          message: "Vui lòng đăng nhập để thêm vào giỏ hàng",
        })
      );
    }
  };
  const handleOnChange = (value) => {
    isNumber(value) && (totalCart.current = value);
  };
  return (
    <>
      <ProductDetailAddToCartStyled>
        <span>
          <label>
            <Typography
              css={`
                font-size: 15px;
                font-weight: 600;
                padding: 0;
              `}
            >
              Số lượng
            </Typography>
          </label>
          <Quantity max={total} min={1} onChange={handleOnChange} />
        </span>
        <Button onClick={hanleOnClick}>
          <Typography
            css={`
              font-size: 15px;
            `}
          >
            Thêm vào giỏ hàng
          </Typography>
        </Button>
      </ProductDetailAddToCartStyled>
    </>
  );
};

const ProductImages = ({ data = [] }) => {
  const [images, setImages] = useState(() =>
    data.map((item, index) => ({
      src: item,
      id: index,
      active: index === 0 ? true : false,
    }))
  );
  const handleChangeImage = (id) => () => {
    const activeElm = images.find((i) => i.active);
    const currentElm = images.find((i) => i.id === id);
    if (!currentElm.active) {
      activeElm && (activeElm.active = false);
      currentElm.active = true;
      setImages(() => [...images]);
    }
  };
  return (
    <>
      {images.length ? (
        <>
          <ProductDetailAvatarStyled>
            <img src={images.find((i) => i.active).src} />
            <div>
              {images.map((item) => (
                <span
                  onClick={handleChangeImage(item.id)}
                  key={item.id}
                  className={`${item.active ? "active" : ""}`}
                >
                  <img src={item.src} alt="" />
                </span>
              ))}
            </div>
          </ProductDetailAvatarStyled>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const ProductContentTable = ({ book }) => {
  return (
    <Table
      css={`
        & > tbody > tr > th {
          & > p {
            font-size: 15px;
            padding: 0;
          }
          &:first-child > p {
            font-weight: bold;
          }
        }
      `}
      bodyData={[
        {
          title: <Typography>Số trang</Typography>,
          content: <Typography>{book.pages}</Typography>,
        },
        {
          title: <Typography>Thể loại</Typography>,
          content: (
            <Typography>
              {book.categories.map((i) => i.name).join(",")}
            </Typography>
          ),
        },
        {
          title: <Typography>Tác giả</Typography>,
          content: <Typography>{book.author.name}</Typography>,
        },
        ,
        {
          title: <Typography>NXB</Typography>,
          content: <Typography>{book.publicCompany.name}</Typography>,
        },
      ]}
    />
  );
};

const ProductDesc = ({ desc }) => {
  const descRef = useRef();
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const content = descRef.current.querySelector(":scope > div > p");
    content.innerHTML = desc;
    setHeight(() => (content ? content.offsetHeight : 0));
  }, []);
  const handleShowDesc = (e) => {
    e.target.classList.toggle("up");
    descRef.current.classList.toggle("show");
  };
  return (
    <ProductDetailDescStyled ref={descRef} heightContent={height}>
      <Typography
        css={`
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          & > i {
            font-size: 27px;
            margin-left: 10px;
            cursor: pointer;
            transition: ease 0.3s;
            &.up {
              transform: rotate(-180deg);
            }
            &:hover {
              color: ${variables.ui.colors.primary};
            }
          }
        `}
      >
        Mô tả ngắn nội dung
        <i className="bx bx-chevron-down" onClick={handleShowDesc}></i>
      </Typography>
      <div>
        <Typography
          css={`
            padding: 8px 16px;
          `}
        ></Typography>
      </div>
    </ProductDetailDescStyled>
  );
};
