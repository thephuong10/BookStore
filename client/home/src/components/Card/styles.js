import styled from "styled-components";

import variables from "../../utils/styles/variables";
export const CardStyled = styled.div`
  background-color: ${variables.ui.colors.white};
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: ${variables.boxShadow};
  padding: 10px 12px;
  cursor: pointer;
  ${(props) => props.css || ""}
`;

export const CardHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  ${(props) => props.css || ""}
`;

export const CardMediaStyled = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  ${(props) => props.css || ""}
`;

export const CardContentStyled = styled.div`
  padding: 12px 0;
  ${(props) => props.css || ""}
`;

export const CardActionsStyled = styled.div`
  display: flex;
  align-items: center;
  ${(props) => props.css || ""}
`;
