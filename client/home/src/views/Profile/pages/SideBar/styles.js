import styled from "styled-components";
import variables from "../../../../utils/styles/variables";

export const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  padding: 0 25px;
  border-right: 1px solid ${variables.ui.colors.disable};
`;
export const AccountStyled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;
