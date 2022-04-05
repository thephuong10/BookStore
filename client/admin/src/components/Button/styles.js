import { makeStyles } from "@mui/styles";
import variables from "../../utils/styles/variables";
import mixin from "../../utils/styles/mixin";
export default makeStyles({
  disable: {
    cursor: "not-allowed",
    backgroundColor: `${variables.colors.BgDisable} !important`,
    color: `${variables.colors.textDisable} !important`,

    "& $spinner": {
      color: "currentColor",
    },
  },
  spinner: {
    width: "26px !important",
    height: "26px !important",
    marginLeft: "10px",
  },
});

export const stylesBase = (props) => {
  let style = {
    padding: "0.5rem 1rem",
    overflow: "hidden",
    letterSpacing: 0,
    textTransform: "none",
  };
  switch (props.variant) {
    case "contained":
      style = {
        ...style,
        backgroundColor: variables.colors[props.bgColor],
        color: variables.colors.white,
        "&:hover": {
          backgroundColor: variables.colors[`${props.bgColor}Hover`],
        },
      };
      break;
    case "outlined":
      style = {
        ...style,
        color: variables.colors[props.bgColor],
        border: "2px solid",
        borderColor: "currentColor",
        "&:hover": {
          backgroundColor: variables.colors[props.bgColor],
          color: variables.colors.white,
        },
      };
      break;
    case "overlay":
      style = {
        ...style,
        color: variables.colors[props.bgColor],
        backgroundColor: mixin.colorRgba(variables.colors[props.bgColor], 0.15),
        "&:hover": {
          backgroundColor: variables.colors[props.bgColor],
          color: variables.colors.white,
        },
      };
      break;
    default:
      break;
  }
  return style;
};
