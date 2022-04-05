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
    padding: "0 0.625rem",
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
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
    borderRadius: "5px",
    padding: "1rem 0.625rem",
    backgroundColor: variables.colors.white,
    maxHeight: "400px",
    overflowX: "hidden",
    overflowY: "auto",
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
