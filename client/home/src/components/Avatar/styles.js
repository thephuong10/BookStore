import styled from "styled-components";

export const AvatarStyled = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  ${(props) => props.css || ""}
`;
