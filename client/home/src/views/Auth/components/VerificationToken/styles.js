import styled, { keyframes } from "styled-components";
import variables from "../../../../utils/styles/variables";

export const VerificationTokenPaperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
  justify-self: center;
  & > svg {
    width: 60px;
    height: 60px;
    color: ${variables.ui.colors.primary};
    margin-bottom: 10px;
    & * {
      color: currentColor;
      fill: currentColor;
    }
  }
`;

export const VerificationTokenInputStyled = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 10px;
  & > span {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
    color: ${variables.text.colors.disable};
    border: 1px solid;
    border-color: currentColor;
    overflow: hidden;
    &.focus,
    &.active {
      color: ${variables.ui.colors.lightBlue};
    }
    &.focus::after {
      bottom: 5px;
    }
    border-radius: 5px;
    & > input {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      opacity: 0;
      width: 100%;
      height: 100%;
      outline: 0;
    }
    & > span {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
      color: currentColor;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transition: ${variables.ease.quickly} 0.3s;
      transform: translateY(-100%);
      &.show {
        transform: translateY(0);
      }
    }
    &::after {
      position: absolute;
      content: "";
      width: 60%;
      height: 3px;
      background-color: currentColor;
      left: 50%;
      transform: translateX(-50%);
      transition: ${variables.ease.quickly} 0.3s;
      bottom: -5px;
      z-index: 2;
      border-radius: 3px;
    }
  }
`;

const show = keyframes`
  0% {
    opacity: 1;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`;

export const VerificationTokenTimerStyled = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  & > div {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 10px;
    margin-bottom: 8px;
    &.timer-warning > span {
      color: ${variables.ui.colors.danger};
    }
    & > span {
      display: inline-block;
      position: relative;
      width: 40px;
      height: 40px;
      color: ${variables.ui.colors.primary};
      border: 1px solid;
      border-color: currentColor;
      overflow: hidden;
      border-radius: 5px;
      & > span {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        color: currentColor;
        height: 100%;
        width: 100%;
        opacity: 1;
        &.hide {
          opacity: 0;
        }
        &.show {
          animation: ${show} ${variables.ease.quickly} forwards 0.8s;
        }
      }
    }
  }
`;
