import { makeStyles } from "@mui/styles";
import variables from "../../../utils/styles/variables";

export default makeStyles({
  formControl: {
    marginBottom: "0.825rem",
    "&.error > *": {
      "&:not(.form-input)": {
        color: variables.colors.danger,
      },
      "&:is(.form-input)": {
        borderColor: variables.colors.danger,
      },
    },
  },
  formLabel: {
    marginBottom: "5px",
    fontWeight: 500,
    fontSize: "1.1rem",
  },
  formMessage: {
    fontSize: "0.9375rem",
    fontWeight: 400,
    padding: "3px 8px",
    margin: 0,
  },
  formInput: {
    "&.focus": {
      borderColor: `${variables.colors.primary} !important`,
    },
  },
});
