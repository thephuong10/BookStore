import styled from "styled-components";
import mixin from "../../utils/styles/mixin";
import variables from "../../utils/styles/variables";
import Spinner from "../Spinner";
const styleVariant = (variant, bgColor) => {
  let style;
  switch (variant) {
    case "contained":
      style = `
        background-color:${variables.ui.colors[bgColor]};
        color:${variables.ui.colors.white};
        &:hover {
          background-color:${variables.ui.colors[`${bgColor}Hover`]};
        }
      `;
      break;
    case "outlined":
      style = `
       border: 2px solid;
       color:${variables.ui.colors[bgColor]};
       border-color: currentColor;
        &:hover {
          background-color:${variables.ui.colors[bgColor]};
          color:${variables.ui.colors.white};
        }
      `;
      break;
    case "overlay":
      style = `
        color:${variables.ui.colors[bgColor]};
        background-color:${mixin.colorRgba(variables.ui.colors[bgColor], 0.15)};
        &:hover {
          background-color:${variables.ui.colors[bgColor]};
          color:${variables.ui.colors.white};
        }
      `;
      break;
    default:
      break;
  }
  return style;
};

const styleDisable = (disable) =>
  !disable
    ? ""
    : `
cursor: not-allowed;
background-color: ${variables.ui.colors.disable} !important;
color: ${variables.text.colors.disable} !important;
`;

export const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  outline: 0px;
  margin: 0px;
  cursor: pointer;
  height: 40px;
  padding: 0 16px;
  user-select: none;
  min-width: 64px;
  border: none;
  background-color: ${variables.ui.colors.white};
  border-radius: ${variables.borderRadius};
  transition: 0.3s ease;
  ${(props) => styleVariant(props.variant, props.bgColor)}
  ${(props) => styleDisable(props.disable)}
  ${(props) =>
    props.active &&
    `
  background-color:${variables.ui.colors[props.bgColor]};
  border-color:${variables.ui.colors[props.bgColor]};
  color:${variables.ui.colors.white};
  `}
  &  p {
    color: currentcolor;
  }
  ${(props) => props.css || ""}
`;

export const ButtonLoadingStyled = styled(Spinner)`
  width: 25px;
  height: 25px;
  margin-left: 15px;
`;

export const ButtonEndIconStyled = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
`;
