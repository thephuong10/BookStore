import styled from "styled-components";
import variables from "../../../../utils/styles/variables";

export const ShoppingCartBottomStyled = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  & > div {
    width: 60%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:last-child {
      width: 40%;
      justify-content: flex-end;
      display: flex;
      align-items: center;
    }
  }
`;

export const ShoppingCartStyled = styled.div`
  & > div {
    padding: 16px;
    box-shadow: ${variables.boxShadow};
    border-radius: 5px;
    &${ShoppingCartBottomStyled} {
      margin-top: 20px;
    }
  }
`;

export const ShoppingCartEmptyStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: ${variables.boxShadow};
  border-radius: 10px;
  padding: 20px;
  min-height: 300px;
  & > img {
    width: 62px;
    height: 62px;
    object-fit: cover;
  }
`;

export const CartCheckbox = styled.span``;
