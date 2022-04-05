import styled from "styled-components";
export const VerificationWrapStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  & > div {
    width: 100%;
    max-width: 500px;
    border-radius: 10px;
    padding: 30px 20px;
    background-color: #ffffff;
  }
`;

export const CreateAccountWrapStyled = styled.div`
  & > form {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
  }
`;
