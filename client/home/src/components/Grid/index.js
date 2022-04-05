import React from "react";
import Container from "../../customs/components/Container";
import { GridItemStyled, GridStyled } from "./styles";

const Grid = ({
  className = "",
  children = "",
  alignItems = "",
  justifyContent = "",
  flexWrap = true,
  css = "",
}) => {
  return (
    <Container>
      <GridStyled
        alignitems={alignItems}
        className={className}
        justifycontent={justifyContent}
        flexwrap={flexWrap}
        css={css}
      >
        {children}
      </GridStyled>
    </Container>
  );
};

export default Grid;

export const GridItem = ({
  className = "",
  children = "",
  alignSelf = "",
  justifySelf = "",
  col = null,
  tabletCol = null,
  mobileCol = null,
  spacing = null,
  css = "",
}) => {
  return (
    <GridItemStyled
      className={className}
      alignself={alignSelf}
      justifyself={justifySelf}
      col={col}
      tabletcol={tabletCol}
      mobilecol={mobileCol}
      spacing={spacing}
      css={css}
    >
      {children}
    </GridItemStyled>
  );
};
