import styled from "styled-components";
import variables from "../.././../../utils/styles/variables";
export const OrderWrapStyled = styled.div`
  padding: 30px 20px;
  box-shadow: ${variables.boxShadow};
  border-radius: 5px;
  & > div:last-child {
    margin-top: 30px;
    & > form {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    }
  }
`;

export const ConfirmOrderStyled = styled.div`
  padding: 0 30px;
  position: relative;

  & > div:last-child {
    display: flex;
    align-items: center;
    margin-top: 30px;
    & > div:last-child {
      width: 50%;
      padding: 0 20px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
    }
  }
`;
