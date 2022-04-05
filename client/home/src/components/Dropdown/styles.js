import styled from "styled-components";

import variables from "../../utils/styles/variables";

export const Inner = styled.div`
  padding: 10px;
  min-width: 200px;
`;
const show = (show, transition) => {
  if (show) {
    return "";
  }
  switch (transition) {
    case "collapse":
      return "height:0;";
    case "fade":
      return "opacity:0;";
    default:
      return "";
  }
};
export const Wrapper = styled.div`
  background-color: ${variables.ui.colors.white};
  border-radius: ${variables.borderRadius};
  box-shadow: ${variables.boxShadow};
  position: relative;
  overflow: hidden;
  transition: 0.6s ${variables.ease.quickly};
  height: ${(props) => props.heightElm}px;
  ${(props) => show(props.show, props.transition)}
  ${(props) => props.css || ""}
`;
