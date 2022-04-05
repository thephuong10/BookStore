import { makeStyles } from "@mui/styles";

export default makeStyles({
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "200px",
    "& > .MuiCircularProgress-root": {
      width: "50px !important",
      height: "50px !important",
    },
  },
});
