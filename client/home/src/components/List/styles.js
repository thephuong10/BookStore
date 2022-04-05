import styled from "styled-components";
import variables from "../../utils/styles/variables";

export const ListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  overflow: hidden;
  ${(props) => props.css || ""}
`;

export const ListItemStyled = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  color: #4b5d68;
  line-height: 1.6;
  font-size: 16px;
  font-weight: 500;
  transition: ease 0.5s;
  ${(props) =>
    props.hover &&
    `
  &:hover {
    background-color: ${variables.ui.colors.primary};
    color: ${variables.ui.colors.white};
  }
  `}
  ${(props) => props.css || ""}
`;
