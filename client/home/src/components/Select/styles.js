import styled from "styled-components";
import variables from "../../utils/styles/variables";

export const SelectDropdownStyled = styled.div`
  position: absolute;
  z-index: 10;
  top: calc(100% + 10px);
  border-radius: inherit;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
  transition: 0.5s ${variables.ease.quickly};
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: ${variables.boxShadow};
  ul {
    padding: 10px;
    border-radius: inherit;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;

    li {
      padding: 5px;
      cursor: pointer;
      transition: ease 0.5s;
      border-radius: 3px;
      &:hover,
      &.active {
        background-color: ${variables.ui.colors.primary};
        color: #ffffff;
        & > p {
          color: currentColor;
        }
      }
    }
  }
`;
export const SelectStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 42px;
  border: 1px solid ${variables.ui.colors.disable};
  border-radius: 5px;
  &.show {
    z-index: 10;
    ${SelectDropdownStyled} {
      opacity: 1;
      visibility: visible;
    }
  }
  &.disable {
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: inherit;
      background-color: #f2f2f2;
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;
