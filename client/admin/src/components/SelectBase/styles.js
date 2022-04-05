import { makeStyles } from "@mui/styles";
import variables from "../../utils/styles/variables";
import mixin from "../../utils/styles/mixin";

export default makeStyles({
  select: {
    position: "relative",
    height: variables.fieldSize,
    border: `2px solid ${variables.colors.border}`,
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&.disable": {
      "&:after": {
        content: "''",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: "inherit",
        backgroundColor: "#f2f2f2",
        cursor: "not-allowed",
        opacity: 0.5,
      },
    },
  },
  selectSearch: {},
  selectDropdown: {
    position: "absolute",
    width: "100%",
    boxShadow: variables.boxShadow,
    left: 0,
    display: "flex",
    flexDirection: "column",
    borderRadius: "5px",
    padding: "1rem 0.625rem",
    backgroundColor: variables.colors.white,
    maxHeight: "400px",
    minWidth: "100px",
    overflowX: "hidden",
    overflowY: "auto",
    zIndex: 10,
    "& > ul": {
      "& > li": {
        padding: "1rem",
        cursor: "pointer",
        overflow: "hidden",
        color: variables.colors.text,
        ...mixin.menuItemAnimated("top-bottom"),
        "&.active": {
          backgroundColor: variables.colors.primary,
          color: variables.colors.white,
          cursor: "not-allowed",
          "&:after": {
            display: "none",
          },
        },
        "&.disable": {
          backgroundColor: `${variables.colors.BgDisable} !important`,
          color: `${variables.colors.text} !important`,
          cursor: "not-allowed",
          "&:after": {
            display: "none",
          },
        },
      },
    },
  },
  selectSelected: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  selectSelectedItem: {},
});
