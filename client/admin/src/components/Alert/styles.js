import { makeStyles } from "@mui/styles";
import variables from "../../utils/styles/variables";

export default makeStyles(() => ({
  wrapper: {
    position: "fixed",
    top: `calc(${variables.navHeight} + 20px)`,
    right: "30px",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  alertItem: {
    display: "flex",
    position: "relative",
    height: "80px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    alignItems: "center",
    maxWidth: "350px",
    boxShadow: "3px 2px 2px 3px rgb(0 0 0 / 50%)",
    transition: `all 0.6s ${variables.ease.elastic}`,
    transform: "translateX(200%)",
    overflow: "hidden",
    cursor: "pointer",
    "& > *": {
      "&:not($alertItemCountDown)": {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flex: 1,
        padding: "0 16px",
      },
    },
    "&.show": {
      transform: "translateX(0)",
    },
  },
  alertItemCountDown: {
    display: "inline-block",
    position: "relative",
    height: "100%",
    width: "5px",

    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
    "&::after": {
      position: "absolute",
      content: "''",
      top: 0,
      left: 0,

      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      borderTopLeftRadius: "5px",
      borderBottomLeftRadius: "5px",
      opacity: 1,
    },
  },
}));
