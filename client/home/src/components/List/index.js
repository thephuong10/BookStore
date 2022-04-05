import React from "react";
import { ListItemStyled, ListStyled } from "./styles";

const List = ({ children = "", className = "", css = "" }) => {
  return (
    <ListStyled className={className} css={css}>
      {children}
    </ListStyled>
  );
};

export const ListItem = ({
  children = "",
  className = "",
  css = "",
  hover = true,
  ...rest
}) => {
  return (
    <ListItemStyled className={className} css={css} hover={hover} {...rest}>
      {children}
    </ListItemStyled>
  );
};

export default List;
