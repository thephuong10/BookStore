import styled from "styled-components";
import ReactSlider from "react-slider";
import variables from "../../../../../utils/styles/variables";

export const SidebarStyled = styled.div`
  border-right: 1px solid #f7f7f7;
`;

export const SidebarItemStyled = styled.div`
  padding: 10px;
  border-bottom: 1px solid #f7f7f7;
`;

export const ReactSliderStyled = styled(ReactSlider)`
  &.horizontal-slider {
    height: 3px;
    background-color: ${variables.ui.colors.disable};
    margin: 8px 0 16px 0;
  }
  .thumb-slider {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${variables.ui.colors.primary};
    top: 50%;
    transform: translateY(-50%);
    outline: 0;
    cursor: pointer;
  }
  .thumb-track {
    top: 0;
    height: 100%;
    background-color: ${variables.ui.colors.primary};
    &-0,
    &-2 {
      background-color: ${variables.ui.colors.disable};
    }
  }
`;
