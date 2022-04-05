import { Tooltip, Box } from "@mui/material";
import React from "react";
import colorVariants from "../../constants/variantColorBtn";
import useStyles from "./styles";
const ButtonIcon = ({
  title = "",
  icon = null,
  color = null,
  sx = {},
  onClick = null,
}) => {
  const classes = useStyles({
    color: color
      ? colorVariants[color] || colorVariants["primary"]
      : colorVariants["primary"],
  });
  const handleOnClick = () => {
    onClick && onClick();
  };
  console.log(sx);
  return (
    <Tooltip title={title}>
      <Box onClick={handleOnClick} className={classes["buttonIcon"]} sx={sx}>
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
          }}
          component={icon}
        ></Box>
      </Box>
    </Tooltip>
  );
};

export default React.memo(ButtonIcon);
