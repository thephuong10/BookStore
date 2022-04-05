import { makeStyles } from "@mui/styles";
import variables from "../../utils/styles/variables";
import mixin from "../../utils/styles/mixin";

export default makeStyles({
  nav: {
    backgroundColor: "transparent",
    paddingLeft: variables.sidebarWidth,
    boxShadow: "none",
    "&-inner": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: variables.navHeight,
      backgroundColor: variables.colors.primary,
      color: variables.colors.white,
      borderRadius: "0 0 5px 5px",
      // "&.nav-shirk": {
      //   backgroundColor: variables.colors.primary,
      //   color: variables.colors.white,
      //   borderRadius: "0 0 20px 20px",
      // },
    },
    "&-title": {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "unset",
    },
  },
  navAccount: {
    position: "relative",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "none",
    minWidth: "200px",
    "&-inner": {
      display: "flex",
      alignItems: "center",
    },
    "&-avatar": {
      display: "inline-flex",
      alignItems: "center",
      width: "40px",
      height: "40px",
      justifyContent: "center",
      "& > img": {
        width: "30px",
        height: "30px",
      },
    },
    "&-content": {
      display: "flex",
      alignItems: "center",
      marginLeft: "0.625rem",
      flex: 1,
      "& > p": {
        fontSize: "1rem",
        fontWeight: "bold",
      },
    },
    "&:hover > $navAccountMenu": {
      transform: "scaleY(1)",
    },
    "&::after": {
      ...mixin.pesudo(),
      width: "100%",
      height: "15px",
      top: "calc(100% - 5px)",
      left: 0,
    },
  },
  navAccountMenu: {
    position: "absolute",
    width: "100%",
    top: "calc(100% + 10px)",
    left: 0,
    zIndex: 1,
    backgroundColor: "white",
    boxShadow: variables.boxShadow,
    borderRadius: "10px",
    padding: "1rem 0",
    transform: "scaleY(0)",
    transition: "0.3s ease",
    overflow: "hidden",
    "& > li": {
      padding: "1rem",
      transition: "0.3s ease",
      color: variables.colors.text,
      ...mixin.menuItemAnimated("top-bottom"),
    },
    "&-item": {
      display: "flex",
      alignItems: "center",
      width: "100%",
      "& > p": {
        flex: 1,
        minWidth: 0,
      },
    },
  },
});
