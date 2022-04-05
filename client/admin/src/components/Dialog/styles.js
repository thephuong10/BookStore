import { makeStyles } from "@mui/styles";
import variables from "../../utils/styles/variables";

export default makeStyles((props) => ({
  dialog: (props) => ({
    "& .MuiDialog-paper": {
      transform: "scale(0)",
      transition: `${variables.ease.elastic} ${props.duration / 1000}s`,
      minWidth: "350px",
      "&.show": {
        transform: "scale(1)",
      },
    },
  }),
}));
