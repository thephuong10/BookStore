import styled from "styled-components";
import mixin from "../../../../utils/styles/mixin";
import variables from "../../../../utils/styles/variables";

export const FooterStyled = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${mixin.colorRgba(variables.ui.colors.primary, 0.2)};
  padding: 50px 0;
`;
