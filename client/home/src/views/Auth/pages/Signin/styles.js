import styled, { keyframes } from "styled-components";
import variables from "../../../../utils/styles/variables";

const showToLeft = keyframes`
  100% {
    transform: translateX(0);
  }
`;
const hideFromLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;
export const SigninFormStyled = styled.div`
  width: 60%;
  height: 100%;
  background-color: ${variables.ui.colors.white};
  border-top-right-radius: 80px;
  transform: translateX(-100%);
  animation: ${showToLeft} 1s ${variables.ease.quickly} forwards;
  animation-delay: 0.5s;
  transition: 0.8s ${variables.ease.quickly};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &.hide-from-left {
    animation: ${hideFromLeft} 1s ${variables.ease.quickly} forwards;
  }
  form {
    display: flex;
    justify-content: center;
    padding: 30px 20px;
    flex-direction: column;
    width: 100%;
    max-width: 420px;
    border-radius: 5px;
    .form-input {
      border-width: 1px;
    }
  }
`;
export const SigninFormTitleStyled = styled.div`
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 5px 0;
  color: ${variables.ui.colors.primary};
  & > * {
    color: currentcolor;
  }
`;

export const SigninWrapStyled = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  //padding: 0 30px;
  position: relative;
`;

export const SigninButtonsStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 15px;
`;
export const SigninButtonAuthsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
export const SigninButtonAuthStyled = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  transition: ease 0.3s;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 25px;
  ${(props) =>
    props.bgcolor &&
    `
    background-color:${props.bgcolor};
    &:hover {
      background-color:${props.bgcolorhover};
    }
  `}
`;

export const SigninContentStyled = styled.div`
  position: relative;
  z-index: 2;
  flex: 1;
  //box-shadow: 0 0 0 2px white;
`;
