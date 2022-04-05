import { makeStyles } from "@mui/styles";
import variables from "../../utils/styles/variables";
import mixin from "../../utils/styles/mixin";
export default makeStyles({
  sidebar: {
    flexShrink: 0,
    "& > .MuiDrawer-paper": {
      padding: "0 0.75rem",
      width: variables.sidebarWidth,
      backgroundColor: variables.colors.white,
      border: "none",
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 5px grey",
        borderRadius: "5px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: variables.colors.text,
        borderRadius: "5px",
      },
    },
  },
  sidebarLogo: {
    display: "flex",
    alignItems: "center",
    height: variables.navHeight,
    flexShrink: 0,
    "& > img": {
      width: "80px",
      height: "80px",
      objectFit: "cover",
    },
    "& > span": {
      fontWeight: "bold",
      fontSize: "1.25rem",
      display: "inline-block",
      flex: 1,
    },
  },
  sidebarMenuItem: {
    padding: 0,
    borderRadius: "10px",
    overflow: "hidden",
    "& > a": {
      padding: "1rem",
      width: "100%",
      display: "flex",
      alignItems: "center",
      color: variables.colors.text,
      position: "relative",
      transition: "0.3s ease",
      ...mixin.menuItemAnimated("left-right"),
    },
  },
});
