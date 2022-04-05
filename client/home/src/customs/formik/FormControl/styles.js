import styled from "styled-components";
import variables from "../../../utils/styles/variables";

export const FormControlStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
  .form-input {
    border-width: 1px;
    ${(props) => {
      console.log("error", props.error);
      return (
        props.error &&
        `
      border-color:${variables.ui.colors.danger}`
      );
    }}
  }
`;
