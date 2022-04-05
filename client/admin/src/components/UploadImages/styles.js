import { makeStyles } from "@mui/styles";
import variables from "../../utils/styles/variables";
import mixin from "../../utils/styles/mixin";

export default makeStyles({
  wrapper: {
    position: "relative",
    overflow: "hidden",
    minWidth: "500px",
    minHeight: "130px",
    // width: "500px",
    border: `2px dashed ${variables.colors.textDisable}`,
    borderRadius: "5px",
    "& > label": {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "0",
      left: "0",
      cursor: "pointer",
      transition: "ease 0.3s",
      "&:hover": {
        backgroundColor: "#f2f3f7",
      },
    },
  },
  images: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    justifyContent: "center",
    "& > span": {
      position: "relative",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      width: "62px",
      height: "62px",
      overflow: "hidden",
      borderRadius: "5px",
      backgroundColor: "#ffffff",
      "& > img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
      "&:last-child": {
        color: `${variables.colors.textDisable}`,
        border: "1px dashed",
        borderColor: "currentColor",
      },
      "& > span": {
        position: "absolute",
        opacity: 0,
        transition: "0.5s ease",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "22px",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "#ffffff",
      },
      "&:hover > span": {
        opacity: 1,
      },
    },
  },
});
