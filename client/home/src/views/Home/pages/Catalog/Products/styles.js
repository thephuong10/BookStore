import styled from "styled-components";

export const ProductsSorterStyled = styled.div`
  display: flex;
  margin: 10px 20px 20px 20px;
  align-items: center;
  padding: 10px 0;
  gap: 16px;
`;

export const ProductEmptyStyled = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 300px;
  img {
    width: 250px;
    height: 250px;
    object-fit: cover;
  }
`;
