import styled, { keyframes } from "styled-components";
import variables from "../../../../utils/styles/variables";

const showToRight = keyframes`
  100% {
    transform: translateX(0);
  }
`;
const hideFromRight = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const SignupFormStyled = styled.div`
  width: 60%;
  height: 100%;
  background-color: ${variables.ui.colors.white};
  border-bottom-left-radius: 80px;
  transform: translateX(100%);
  animation: ${showToRight} 1s ${variables.ease.quickly} forwards;
  animation-delay: 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &.hide-from-right {
    animation: ${hideFromRight} 1s ${variables.ease.quickly} forwards;
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
export const SignupFormTitleStyled = styled.div`
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 5px 0;
  color: ${variables.ui.colors.primary};
  & > * {
    color: currentcolor;
  }
`;

export const SignupWrapStyled = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  height: 100%;
  width: 100%;
  //padding: 0 30px;
  position: relative;
`;

export const SignupButtonsStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 15px;
`;
export const SignupButtonAuthsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
export const SignupButtonAuthStyled = styled.a`
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

export const SignupContentStyled = styled.div`
  position: relative;
  z-index: 2;
  flex: 1;
  //box-shadow: 0 0 0 2px white;
`;
