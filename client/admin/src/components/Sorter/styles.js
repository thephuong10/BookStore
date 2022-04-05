import { makeStyles } from "@mui/styles";
import variables from "../../utils/styles/variables";
import mixin from "../../utils/styles/mixin";
export default makeStyles({
  select: {
    minWidth: "250px",
    borderRadius: "10px",
    padding: "0 1rem",
    display: "inline-block",
    height: "45px",
    backgroundColor: variables.colors.white,
    border: `1px solid ${variables.colors.text}`,
    position: "relative",
  },
  selectSelected: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: "100%",
    cursor: "pointer",
    userSelect: "none",
  },
  selectDropdown: {
    position: "absolute",
    top: "calc(100% + 10px)",
    left: 0,
    width: "100%",
    backgroundColor: "white",
    zIndex: 100,
    boxShadow: variables.boxShadow,
    borderRadius: "inherit",
    padding: 0,
    transition: `height 0.5s ${variables.ease.quickly}`,
    overflow: "hidden",
    height: 0,
    "& > li": {
      padding: "1rem",
      color: variables.colors.text,
      cursor: "pointer",
      ...mixin.menuItemAnimated("top-bottom"),
      "&.active": {
        backgroundColor: variables.colors.primary,
        color: variables.colors.white,
      },
    },
  },
  selectDropdownSorter: {
    display: "flex",
    alignItems: "center",
    marginLeft: "5px",
    "& > svg": {
      transition: "ease 0.3s",
      "&:hover,&.active": {
        color: variables.colors.yellow,
      },
    },
  },
});
