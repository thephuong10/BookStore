import { makeStyles } from "@mui/styles";
import variables from "../../utils/styles/variables";
import mixin from "../../utils/styles/mixin";

export default makeStyles({
  imageUploadWrap: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "5px",
    color: variables.colors.border,
    border: "2px solid",
    borderColor: "currentcolor",
    padding: 0,
    overflow: "hidden",
    height: "54px",
    minWidth: "300px",
  },
  uploadNames: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  uploadName: {
    "& + &": {
      marginLeft: "8px",
    },
    "& > svg": {
      marginLeft: "5px",
      cursor: "pointer",
      transition: "ease 0.3s",
      position: "relative",
      zIndex: 1,
      "&:hover": {
        color: variables.colors.blue,
      },
    },
    "&:after": {
      ...mixin.pesudo(),
      inset: 0,
      backgroundColor: "currentcolor",
      opacity: 0.15,
    },
  },
  uploadBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "60px",
    height: "100%",
    cursor: "pointer",
    backgroundColor: variables.colors.primary,
    color: variables.colors.white,
    position: "relative",
    userSelect: "none",
    transition: "ease 0.3s",
    "&:hover": {
      backgroundColor: variables.colors.blue,
    },
    "& > input": {
      display: "none",
    },
  },
});
