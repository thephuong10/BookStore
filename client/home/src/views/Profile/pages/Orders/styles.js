import styled from "styled-components";
import { CellCustomStyled } from "../../../../components/Table/styles";
import mixin from "../../../../utils/styles/mixin";
import variables from "../../../../utils/styles/variables";
const ORDER_STATUS = {
  pending: variables.ui.colors.danger,
  confirmed: variables.ui.colors.lightBlue,
  delivery: variables.ui.colors.yellow,
  successful: variables.ui.colors.success,
  cancel: variables.ui.colors.disable,
};
export const OrderWrapStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrderStyled = styled.div`
  & > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > p > strong {
      display: inline-block;
      padding: 8px 16px;
      margin-left: 16px;
      border-radius: 10px;
      font-size: 15px;
      ${(props) =>
        !props.status
          ? ""
          : `
      color:${ORDER_STATUS[props.status.toLowerCase()]};
      background-color:${mixin.colorRgba(
        ORDER_STATUS[props.status.toLowerCase()],
        0.2
      )};
    `}
    }
  }
  & + & {
    padding: 30px 0 16px 0;
    border-top: 1px solid ${variables.ui.colors.primary};
  }
`;

export const OrderRowStyled = styled(CellCustomStyled)`
  display: flex;
  align-items: center;
  & > img {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
  & > div {
    display: flex;
    flex-direction: column;
    & > p {
      font-size: 14px;
      font-weight: 400;
      line-height: 1.3;
      ${mixin.textOverflowMultipleLines(2)}
    }
    & > button {
      height: 30px;
      align-self: flex-start;
      margin-top: 8px;
      p {
        font-size: 14px;
        font-weight: 400;
        padding: 0;
      }
    }
  }
`;

export const OrderMoneyStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 0;
  gap: 0 20px;
`;

export const OrderEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  min-height: 400px;
  & > img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;
