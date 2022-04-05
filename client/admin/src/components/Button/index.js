import { Button as ButtonBase, CircularProgress } from "@mui/material";
import React from "react";
import { classnames } from "../../utils/handleClassnames";
import useStyles, { stylesBase } from "./styles";

const Button = ({
  children,
  className = "",
  sx = {},
  variant = "",
  bgColor = "",
  onClick = null,
  type = "",
  loading = false,
  disable = false,
}) => {
  const variantProp = variants[variant] || variants["contained"];
  const bgColorProp = bgColors[bgColor] || bgColors["primary"];

  const classes = useStyles();
  const handleOnClick = (e) => {
    if (type === "submit") {
      loading && e.preventDefault();
    } else {
      e.preventDefault();
    }
    !loading && onClick && onClick();
  };
  return (
    <ButtonBase
      type={type}
      onClick={handleOnClick}
      disableFocusRipple
      disableRipple
      sx={{
        ...stylesBase({
          variant: variantProp,
          bgColor: bgColorProp,
        }),
        ...sx,
      }}
      className={classnames(className, {
        [`${classes["disable"]}`]: disable || loading,
      })}
      endIcon={
        <>{loading && <CircularProgress className={classes["spinner"]} />}</>
      }
    >
      {children}
    </ButtonBase>
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
