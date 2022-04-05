import React, { useEffect, useState } from "react";
import Typography from "../../../../components/Typography";
import Button from "../../../../components/Button";
import Stars from "../../../../customs/components/Stars";
import Container from "../../../../customs/components/Container";
import Moment from "react-moment";
import {
  RatingEmptyStyled,
  RatingListStyled,
  RatingOverviewStyled,
} from "./styles";
import Avatar from "../../../../components/Avatar";
import { isArray, isObject } from "../../../../utils/fun";
import variables from "../../../../utils/styles/variables";
import RatingEmptyImage from "../../../../assets/images/rating-empty.png";
import bookApi from "../../../../apis/bookApi";
// const reviews = [
//   {
//     id: 1,
//     content:
//       "Áo giá rẻ ghê á, vừa nhận hàng xong.....THời gian vận chuyển rất hợp lí. Tôi đã đặt hàng với tâm thế hào hứng chờ đợi để được trải nghiệm sản phẩm và tôi không hề bị chờ mỏi cổ. Có thể thấy bên vận chuyển không quản ngại thời tiết và đường xá xa xôi để đưa sản phẩm cho tôi trong thời gian ngắn nhất.",
//     star: 5,
//     user: {
//       name: "Lưu Văn A",
//     },
//     createDate: "2022-02-23",
//     images: ["https://cf.shopee.vn/file/a03fc4558229a608434eb672b1a65650_tn"],
//   },
//   {
//     id: 2,
//     content:
//       "Áo shop khá là đẹp luôn, hình in đẹp chắc chắn, form giống mẫu mặc nha. Vải okee không dày cũng không mỏng, giá lại rẻ cơ….. Shop giao hàng nhanh, đóng gói sp chắc chắn đúng mẫu. Lần sau sẽ lại ủng hộ shop tiếp nhá… ",
//     star: 4,
//     user: {
//       name: "Lưu Văn B",
//     },
//     createDate: "2022-02-23",
//     images: [
//       "https://cf.shopee.vn/file/a03fc4558229a608434eb672b1a65650_tn",
//       "https://cf.shopee.vn/file/970cfeac98382c8e39195291151e999b_tn",
//     ],
//   },
//   {
//     id: 3,
//     content:
//       "Áo giá rẻ ghê á, vừa nhận hàng xong ko nghĩ áo nó lại đẹp đến vậy,Áo xinh xẻo lắm ạ. MÀu trắng những vẫn okela, mẫu như hình đẹp lắm nha. Mình mặc trùm mông tay lỡ luôn. Shop giao hàng nhanh với giá tiền này quá là rẻ ổn áp thì chất vải cũng ok. Khuyên mọi người nên mua nha . Sẽ ủng hộ shop thêm nha",
//     star: 4,
//     user: {
//       name: "Lưu Văn C",
//     },
//     createDate: "2022-02-23",
//   },
// ];
const pageable = {
  paging: {
    page: 1,
    limit: 3,
  },
  sorter: {
    sortBy: "createDate",
    orderBy: "desc",
  },
};
const Rating = ({ book = null }) => {
  const [reviews, setReviews] = useState({
    entities: [],
    paging: null,
  });
  console.log(reviews);
  useEffect(() => {
    isObject(book) &&
      (async () => {
        try {
          const data = await bookApi.getReviewsByBook({
            ...pageable,
            filters: [
              {
                key: "book",
                type: "a+b",
                value: book.id + "",
              },
            ],
          });
          setReviews(() => ({
            entities: data.data,
            paging: data.paging,
          }));
        } catch (error) {}
      })();
  }, []);
  return (
    <Container
      css={`
        border-radius: 10px;
        box-shadow: ${variables.boxShadow};
        padding: 20px 30px;
      `}
    >
      <>
        {!isArray(reviews.entities) || !isObject(book) ? (
          <RatingEmptyStyled>
            <img src={RatingEmptyImage} />
            <Typography
              css={`
                font-weight: 600;
                color: ${variables.ui.colors.danger};
              `}
            >
              Chưa có đánh giá nào
            </Typography>
          </RatingEmptyStyled>
        ) : (
          <>
            <Typography
              css={`
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 16px;
              `}
            >
              Đánh giá - Nhận xét của khác hàng
            </Typography>
            <RatingOverviewStyled>
              <div>
                <Typography size="big">{book.rating.ratingStar}/5</Typography>
                <Stars
                  star={book.rating.ratingStar}
                  css={`
                    & > span {
                      width: 18px;
                      height: 18px;
                    }
                  `}
                />
              </div>
              <div>
                <Button
                  variant="outlined"
                  active
                  css={`
                    border-width: 1px;
                  `}
                >
                  <Typography
                    css={`
                      font-size: 15px;
                      padding: 0;
                    `}
                  >
                    Tát cả
                  </Typography>
                </Button>
                {book.rating.ratingList.map((item, index) => (
                  <Button
                    variant="outlined"
                    css={`
                      border-width: 1px;
                    `}
                  >
                    <Typography
                      css={`
                        font-size: 15px;
                        padding: 0;
                      `}
                    >
                      {index + 1} sao <span>({item})</span>
                    </Typography>
                  </Button>
                ))}
              </div>
            </RatingOverviewStyled>
            <RatingListStyled>
              {reviews.entities.map((item, index) => (
                <li key={index}>
                  <span>
                    <Avatar />
                    <Typography
                      css={`
                        font-size: 15px;
                        display: flex;
                        flex-direction: column;
                        gap: 5px 0;
                        padding-left: 0;
                      `}
                    >
                      <strong>{item.user.name}</strong>
                      <Stars
                        star={item.star}
                        css={`
                          margin-left: -3px;
                        `}
                      />
                      <span>
                        <Moment format="DD/MM/YYYY">{item.createDate}</Moment>
                      </span>
                    </Typography>
                  </span>
                  <div>
                    <Typography
                      css={`
                        padding: 8px 0 16px 0;
                        line-height: 1.2;
                      `}
                    >
                      {item.content}
                    </Typography>
                    {isArray(item.images) ? (
                      <>
                        <span>
                          {item.images.map((item, index) => (
                            <img key={index} src={item} />
                          ))}
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </li>
              ))}
            </RatingListStyled>
          </>
        )}
      </>
    </Container>
  );
};

export default Rating;
