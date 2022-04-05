import React from "react";
import {
  ButtonEndIconStyled,
  ButtonLoadingStyled,
  ButtonStyled,
} from "./styles";

const Button = ({
  children = "",
  className = "",
  variant = "",
  bgColor = "",
  type = "",
  css = "",
  loading = null,
  disable = false,
  endIcon = null,
  active = false,
  ...rest
}) => {
  const variantProp = variants[variant] || variants["contained"];
  const bgColorProp = bgColors[bgColor] || bgColors["primary"];
  const handleOnClick = (e) => {
    if (type === "submit" && loading) {
      loading && e.preventDefault();
    }
    if (!disable) {
      const { onClick } = rest;
      onClick && onClick();
    }
  };
  return (
    <ButtonStyled
      type={type}
      onClick={handleOnClick}
      variant={variantProp}
      bgColor={bgColorProp}
      css={css}
      className={className}
      disable={loading || disable}
      active={active}
    >
      {children}
      {endIcon && <ButtonEndIconStyled>{endIcon}</ButtonEndIconStyled>}
      {loading && <ButtonLoadingStyled css="color:currentcolor;" />}
    </ButtonStyled>
  );
};

export default Button;

const variants = {
  outlined: "outlined",
  contained: "contained",
  overlay: "overlay",
};

const bgColors = {
  success: "success",
  primary: "primary",
  danger: "danger",
};
