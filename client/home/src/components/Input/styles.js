import styled from "styled-components";
import variables from "../../utils/styles/variables";

export const StartIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 40px;
  font-size: 20px;
  border-right: inherit;
  color: currentcolor;
`;
export const EndIcon = styled.span`
  position: relative;
  display: inline-block;
  border-left: inherit;
  color: currentcolor;
  height: 100%;
  width: 40px;
  font-size: 20px;
  cursor: pointer;
  & > i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
  &.show > .bx-show-alt,
  &.hide > .bx-hide {
    opacity: 1;
  }
`;

export const InputWrap = styled.div`
  border: 2px solid;
  border-color: #b8b8b8;
  border-radius: 5px;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  color: ${variables.text.colors.primary};
  height: 40px;
  font-size: 15px;
  line-height: 1.3;
  font-weight: 400;
  ${StartIcon},${EndIcon} {
    border-color: inherit;
  }
  & > input {
    flex: 1;
    border: none;
    height: 100%;
    padding: 3px 5px;
    color: currentcolor;
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    &::placeholder {
      color: ${variables.ui.colors.disable};
    }
  }
  &.focus {
    border-color: #1a94ff !important;
    ${StartIcon},${EndIcon} {
      border-color: #1a94ff !important;
    }
  }
  ${(props) => props.css || ""}
`;
