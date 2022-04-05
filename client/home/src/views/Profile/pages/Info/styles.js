import styled from "styled-components";
import variables from "../../../../utils/styles/variables";
export const InfoStyled = styled.div`
  display: flex;
`;

export const InfoLeftStyled = styled.div`
  width: 50%;
  padding: 10px 16px;
  border-right: 1px solid ${variables.ui.colors.disable};
  form {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
`;
export const InfoRightStyled = styled.div`
  width: 50%;
  padding: 10px 16px;
`;

export const InfoRightMenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
`;

export const InfoRightMenuItemStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > p {
    display: inline-flex;
    align-items: center;
    font-size: 15px;
    & > i {
      font-size: 20px;
      margin-right: 5px;
    }
  }
  & > button {
    height: 30px;
    margin-left: 5px;
    p {
      padding: 0;
      font-size: 14px;
    }
  }
`;
