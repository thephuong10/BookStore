import React from "react";
import styled from "styled-components";
import Grid, { GridItem } from "../../../../components/Grid";
import Container from "../../../../customs/components/Container";
import variables from "../../../../utils/styles/variables";
import Products from "./Products";
import Sidebar from "./Sidebar";

const Catalog = () => {
  return (
    <Container>
      <CatalogStyled>
        <Grid>
          <GridItem col={3}>
            <Sidebar />
          </GridItem>
          <GridItem
            col={9}
            css={`
              & > div {
                height: 100%;
              }
            `}
          >
            <Products />
          </GridItem>
        </Grid>
      </CatalogStyled>
    </Container>
  );
};

export default Catalog;

const CatalogStyled = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: ${variables.boxShadow};
`;
