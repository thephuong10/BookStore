import styled, { keyframes } from "styled-components";

const CircularAnimatied = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const ProgressAnimatied = keyframes`
  0% {
    stroke-dasharray: 1px,200px;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100px,200px;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100px,200px;
    stroke-dashoffset: -125px;
  }
`;

export const SpinnerStyled = styled.span`
  display: inline-block;
  width: 40px;
  height: 40px;
  color: #000000;
  animation: ${CircularAnimatied} 1.4s linear infinite;
  ${(props) => props.css || ""}
  & > svg {
    color: currentcolor;
    width: 100%;
    height: 100%;
    & > circle {
      stroke: currentcolor;
      stroke-dasharray: 80px, 200px;
      stroke-dashoffset: 0;
      animation: ${ProgressAnimatied} 1.4s ease-in-out infinite;
    }
  }
`;
