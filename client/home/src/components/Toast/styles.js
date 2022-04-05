import styled from "styled-components";
import { keyframes } from "styled-components";
import variables from "../../utils/styles/variables";
export const ToastWrapStyled = styled.div`
  position: fixed;
  top: 5rem;
  right: 3rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const ToastItemCountDownStyled = styled.span`
  display: inline-block;
  position: relative;
  height: 100%;
  width: 5px;
  background-color: ${(props) => variables.ui.colors[props.status]};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    height: ${(props) => props.height}%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    opacity: 1;
  }
`;

export const ToastItemStyled = styled.div`
  display: flex;
  position: relative;
  height: 80px;
  background-color: #fff;
  border-radius: 5px;
  align-items: center;
  max-width: 350px;
  box-shadow: 3px 2px 2px 3px rgb(0 0 0 / 50%);
  transition: all 0.6s ${variables.ease.elastic};
  transform: translateX(200%);
  overflow: hidden;
  cursor: pointer;
  //animation: sideTopRight 0.5s ease forwards
  & > * {
    &:not(${ToastItemCountDownStyled}) {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      padding: 0 16px;
      & > i {
        font-size: 20px;
        color: ${(props) => variables.ui.colors[props.status]};
        &:last-child {
          font-size: 22px;
          font-weight: 500;
          &:hover {
            font-weight: 600;
          }
        }
      }
    }
  }
  &.show {
    transform: translateX(0);
  }
`;
