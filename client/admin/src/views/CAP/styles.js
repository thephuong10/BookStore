import { makeStyles } from "@mui/styles";

export default makeStyles({
  wrapper: {},
  inner: {
    padding: "10px 0",
    maxHeight: "500px",
    overflow: "hidden",
    "&-top": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 16px",
    },
  },
  form: {
    width: "450px",
    height: "260px",
    margin: "auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: 0,
    padding: "20px 25px",
    "& form": {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
  },
});
