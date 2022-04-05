import { makeStyles } from "@mui/styles";
import mixin from "../../utils/styles/mixin";
import variables from "../../utils/styles/variables";
export default makeStyles({
  wrapper: {
    minHeight: "100vh",
    overflow: "hiden",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: mixin.colorRgba(variables.colors.primary, 0.15),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& > [class*='formControl']": {
      marginBottom: "1rem",
    },
  },
  paper: {
    minWidth: "450px",
    maxWidth: "500px",
    padding: "25px",
    boxShadow: mixin.important("0 0 5px 0 rgba(0,0,0,0.5)"),
    borderRadius: mixin.important("10px"),
    overflow: "hidden",
    transform: "scale(0)",
    animation: "$showForm 1s forwards",
    willChange: "animation",
  },
  icon: {
    position: "absolute",
    color: mixin.colorRgba(variables.colors.primary, 0.1),
    transform: "scale(0)",
    "& path": {
      fill: "currentColor",
    },
    animation: "$showForm 0.8s forwards",
    willChange: "animation",
    "&:nth-child(1)": {
      animationDelay: "0.3s",
    },
    "&:nth-child(2)": {
      animationDelay: "0.5s",
    },
  },
  "@keyframes showForm": {
    "0%": {
      transform: "scale(1)",
    },
    "1%": {
      transform: "scale(0.5)",
    },
    "45%": {
      transform: "scale(1.05)",
    },
    "80%": {
      transform: "scale(0.95)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
});
