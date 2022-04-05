import styled from "styled-components";
import Typography from "../Typography";
export const SectionStyled = styled.section`
  position: relative;
  margin-bottom: 80px;
  ${(props) => props.css || ""}
`;

export const SectionTitleStyled = styled(Typography)`
  margin-bottom: 20px;
  ${(props) => props.center && "text-align:center;"}
  ${(props) => props.css || ""}
`;

export const SectionFooterStyled = styled.div`
  margin-top: 10px;
  ${(props) => props.css || ""}
`;
