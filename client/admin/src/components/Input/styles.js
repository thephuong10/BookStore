import { makeStyles } from "@mui/styles";
import variables from "../../utils/styles/variables";

export default makeStyles({
  inputWrap: {
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: 1.5,
    height: "54px",
    letterSpacing: "0.1px",
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "5px",
    border: `2px solid ${variables.colors.border}`,
    padding: 0,
    overflow: "hidden",
    "&.focus": {
      borderColor: `${variables.colors.primary} !important`,
      "& $inputIcon": {
        borderColor: `${variables.colors.primary} !important`,
      },
    },
  },
  input: {
    flex: 1,
    outline: 0,
    border: "none",
    height: "100%",
    padding: "0 0.5rem",
    color: variables.colors.black,
    background: "none",
    display: "block",
    minWidth: 0,
    fontSize: "1rem",
    "&::placeholder": {
      color: variables.colors.border,
    },
  },
  inputIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    height: "100%",
    borderRight: `2px solid ${variables.colors.border}`,
    "& > svg": {
      width: "30px",
      height: "30px",
      color: variables.colors.text,
    },
  },
  inputActions: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
    width: "25px",
    "& > svg": {
      color: variables.colors.text,
      width: "100%",
      height: "50%",
      cursor: "pointer",
      transition: "ease 0.3s",
      "&:hover": {
        backgroundColor: "#f2f3f7",
        color: variables.colors.black,
      },
    },
  },
});
