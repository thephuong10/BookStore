import styled from "styled-components";
export const ForgotPasswordWrapStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  & > div {
    width: 100%;
    max-width: 600px;
    border-radius: 10px;
    padding: 30px 20px;
    background-color: #ffffff;
  }
`;

export const ChangePasswordWrapStyled = styled.div`
  & > form {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
  }
`;
