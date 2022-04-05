import styled from "styled-components";
import variables from "../../../../utils/styles/variables";

export const ProductDetailAvatarStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 10px;
  & > img {
    width: 430;
    max-height: 410px;
    object-fit: cover;
  }
  & > div {
    display: flex;
    margin-top: 20px;
    gap: 0 16px;
    & > span {
      display: block;
      width: 66px;
      height: 66px;
      border: 2px solid ${variables.ui.colors.lightBlue};
      border-radius: 3px;
      overflow: hidden;
      cursor: pointer;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;
export const ProductDetailPriceStyled = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;
  gap: 16px;
`;
export const ProductDetailInfoStyled = styled.div``;
export const ProductDetailReviewStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 16px 0;
`;

export const ProductDetailAddToCartStyled = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 30px;
  margin: 20px 0;
  & > span {
    display: flex;
    flex-direction: column;
    gap: 10px;
    & > label {
      display: inline-block;
      margin-bottom: 5px;
    }
  }
`;

export const ProductDetailDescStyled = styled.div`
  margin-top: 20px;
  & > div {
    height: 0;
    overflow: hidden;
    transition: height 0.5s ease;
  }
  &.show {
    & > div {
      height: ${(props) => props.heightContent || 0}px;
    }
  }
`;

export const RatingListStyled = styled.ul`
  padding: 10px 16px;
  margin-top: 30px;
  li {
    display: flex;
    align-items: flex-start;
    padding: 20px 10px;
    & > span {
      display: inline-block;
      width: 200px;
    }
    & > div:last-child {
      flex: 1;
      & > span {
        display: flex;
        align-items: center;
        gap: 0 16px;
        & > img {
          width: 72px;
          height: 72px;
        }
      }
    }
    & + li {
      border-top: 1px solid #00000017;
    }
  }
`;
export const RatingOverviewStyled = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 10px 16px;
  & > div:first-child {
    width: 200px;
  }
  & > div:last-child {
    flex: 1;
    padding: 0 5px;
    display: flex;
    align-items: center;
    gap: 0 20px;
  }
`;

export const RatingEmptyStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  min-height: 200px;
  & > img {
    width: 70px;
    height: 70px;
    object-fit: cover;
  }
`;
