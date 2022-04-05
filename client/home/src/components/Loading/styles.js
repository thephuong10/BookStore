import styled from "styled-components";
import variables from "../../utils/styles/variables";
import Spinner from "../Spinner";
export const LoadingStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  z-index: 1000;
  ${(props) => props.css || ""}
`;

export const LoadingSpinner = styled(Spinner)`
  width: 50px;
  height: 50px;
  color: ${variables.ui.colors.primary};
`;
