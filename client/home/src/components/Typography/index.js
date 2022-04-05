import React from "react";
import { Wrapper } from "./styles";
const Typography = ({
  children = "",
  className = "",
  noWrap = false,
  align = "inherit",
  size = "small",
  fullWidth = false,
  css = "",
  ...rest
}) => {
  return (
    <Wrapper
      size={size}
      className={className}
      nowrap={noWrap}
      align={align}
      fullwidth={fullWidth}
      css={css}
      {...rest}
    >
      {children}
    </Wrapper>
  );
};

export default Typography;
