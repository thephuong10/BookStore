import { makeStyles } from "@mui/styles";
import colorVariants from "../../constants/variantColorBtn";
import variables from "../../utils/styles/variables";
import mixin from "../../utils/styles/mixin";

export default makeStyles((props) => ({
  buttonIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    cursor: "pointer",
    color: variables.colors.white,
    position: "relative",
    overflow: "hidden",
    "&::after": {
      ...mixin.pesudo(),
      inset: 0,
      transition: "0.5s ease-in",
      borderRadius: "inherit",
      backgroundColor: (props) => {
        switch (props.color) {
          case colorVariants.success:
            return variables.colors[colorVariants.success];
          case colorVariants.danger:
            return variables.colors[colorVariants.danger];
          default:
            return variables.colors[colorVariants.primary];
        }
      },
    },
    "&:hover::after": {
      opacity: 0.5,
    },
  },
}));
