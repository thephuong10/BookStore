import styled from "styled-components";
import mixin from "../../utils/styles/mixin";
import variables from "../../utils/styles/variables";

const STATUS_CASE = {
  active: "active",
  success: "success",
};

const createStatusStep = (status) => {
  switch (status) {
    case STATUS_CASE["active"]:
      return `color:${variables.ui.colors.lightBlue};
      ${StepIconStyled} {
        background-color:${mixin.colorRgba(variables.ui.colors.lightBlue, 0.1)};
      }
    `;
    case STATUS_CASE["success"]:
      return `color:${variables.ui.colors.success};
      ${StepIconStyled} {
        background-color:${mixin.colorRgba(variables.ui.colors.success, 0.1)};
      }
    `;
    default:
      return `color:#d1d1d8;`;
  }
};

export const SteperStyled = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
  padding: 8px 12px;
  justify-content: center;
  ${(props) => props.css || ""}
`;
export const StepIconStyled = styled.span`
  display: inline-flex;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 2px solid;
  border-color: currentColor;
  justify-content: center;
  align-items: center;
  color: currentColor;
  & > span {
    font-size: 15px;
    font-weight: 500;
    color: currentColor;
  }
`;
export const StepStyled = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0;
  padding: 5px 10px;
  ${(props) => createStatusStep(props.status)}
  & + & {
    &::after {
      position: absolute;
      content: "";
      background-color: ${variables.ui.colors.disable};
      flex: 1 1 auto;
      height: 2px;
      top: calc(17px + 2px);
      transform: translateY(-50%);
      left: calc(-50% + 50px);
      right: calc(50% + 50px);
    }
  }
`;
