import React from "react";
import styled from "styled-components";
import Card, { CardContent, CardMainMedia } from "../../components/Card";
import Typography from "../../components/Typography";
import variables from "../../utils/styles/variables";
import { ReactComponent as StarHalf } from "../../assets/svg/star-half.svg";
import { formatPrice, overLimitNumber } from "../../utils/fun";
import mixin from "../../utils/styles/mixin";
import Stars from "./Stars";
const bookdata = {
  name: "Lưu Ly Mỹ nhân sát",
  priceOriginal: 120000,
  price: 120000,
  selled: 100,
  discount: 0,
  star: 5,
  avatar:
    "https://kenh14cdn.com/thumb_w/620/2020/8/25/luu-ly-4-1598288996090866492909.jpg",
};
const BookReviewsStyled = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;
const StarHalfStyled = styled(StarHalf)`
  position: absolute;
  width: 100%;
  height: 100%;
  color: ${(props) =>
    props.active
      ? `${variables.ui.colors.yellow}`
      : `${variables.text.colors.disable}`};
`;
const BookRatingsStyled = styled.div`
  display: flex;
  align-items: center;
  & > span {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 14px;
    height: 14px;
    margin-right: 3px;
    & > ${StarHalfStyled} {
      &:last-child {
        transform: rotateY(180deg) translateX(-52%);
      }
    }
  }
`;
const BookPricesStyled = styled.div`
  display: flex;
  align-items: center;
  & > span:last-child {
    display: inline-flex;
    align-items: center;
    margin-left: 10px;
    justify-content: center;
    color: ${variables.ui.colors.danger};
    font-size: 14px;
    padding: 2px 4px;
    border: 1px solid;
    border-color: currentcolor;
    border-radius: 5px;
  }
`;

const Bookcard = ({ book }) => {
  //book = book || bookdata;

  return (
    <Card
      css={`
        height: 100%;
        transition: transform 0.3s ${variables.ease.quickly};
        &:hover {
          transform: translateY(-5px);
        }
      `}
    >
      <CardMainMedia image={book.images[0]} css="border-radius:5px;" />
      <CardContent
        css={`
          display: flex;
          flex-direction: column;
          flex: 1;
        `}
      >
        <Typography
          css={`
            padding: 0 3px;
            line-height: 1.4;
            & > span {
              ${mixin.textOverflowMultipleLines(2)}
            }
          `}
        >
          <span>{book.name}</span>
        </Typography>
        <BookReviewsStyled>
          <BookRatingsStyled>
            <Stars star={book.rating.ratingStar} />
          </BookRatingsStyled>
          <Typography
            noWrap
            css={`
              white-space: nowrap;
              font-size: 14px;
              font-weight: 400;
            `}
          >
            Đã bán : {overLimitNumber(book.selled, 99)}
          </Typography>
        </BookReviewsStyled>
        <BookPricesStyled>
          <Typography
            noWrap
            css={`
              min-width: 0;
              ${book.discount ? `color:${variables.ui.colors.danger};` : ""}
            `}
          >
            {formatPrice(book.price)}đ
          </Typography>
          {book.discount ? <span>-{book.discount}%</span> : null}
        </BookPricesStyled>
      </CardContent>
    </Card>
  );
};

export default Bookcard;
