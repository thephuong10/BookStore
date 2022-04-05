import styled from "styled-components";
import variables from "../../utils/styles/variables";

export const ModalWrapStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalPaperStyled = styled.div`
  position: relative;
  min-width: 400px;
  min-height: 200px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  transform: scale(0);
  transition: transform ${variables.ease.elastic} 1s;
  &.show {
    transform: scale(1);
  }
  ${(props) => props.css || ""}
`;

export const ModalCloseIconStyled = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: translate(50%, -50%);
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 25px;
  background-color: ${variables.ui.colors.disable};
  color: #000000;
  transition: ease 0.3s;
  &:hover {
    background-color: ${variables.ui.colors.primary};
    color: #ffffff;
  }
  z-index: 10;
  cursor: pointer;
`;
