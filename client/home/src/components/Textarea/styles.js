import styled from "styled-components";
import variables from "../../utils/styles/variables";
export const TextareaStyled = styled.div`
  border: 2px solid;
  border-color: #b8b8b8;
  border-radius: 5px;
  overflow: hidden;
  color: ${variables.text.colors.primary};
  height: 80px;
  &.focus {
    border-color: #1a94ff !important;
  }
  & > textarea {
    outline: 0;
    border: none;
    height: 100%;
    width: 100%;
    padding: 5px 8px;
    color: currentcolor;
    font-size: 15px;
    line-height: 1.3;
    font-weight: 400;
    ${(props) => props.css || ""}
  }
`;
