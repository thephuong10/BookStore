import { makeStyles } from "@mui/styles";
import variables from "../../utils/styles/variables";

export default makeStyles({
  tablePaper: {
    padding: "1rem",
    overflowY: "auto",
    maxHeight: 700,
    position: "relative",
    "& td,& th": {
      minWidth: "calc(62px + 2rem) !important",
    },
    "& thead th > *": {
      fontSize: "1rem",
      fontWeight: "bold",
    },
  },
  tableSearch: {
    display: "flex",
    alignItems: "center",
    height: "45px",
    padding: "0 1rem",
    backgroundColor: "#f1f1f1",
    boxShadow: "none",
    borderRadius: "10px",
  },
  tableActions: {
    display: "flex",
    margin: "1.8rem 0",
    padding: "0 0.625rem",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "1rem",
    "&-icon": {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      cursor: "pointer",
      color: variables.colors.white,
      "&.primary": {
        backgroundColor: variables.colors.primary,
      },
      "&.danger": {
        backgroundColor: variables.colors.danger,
      },
    },
  },
  tablePaging: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& > ul > li > button": {
      "&.Mui-selected": {
        backgroundColor: variables.colors.primary,
        color: variables.colors.white,
        borderColor: variables.colors.primaryHover,
        "&:hover": {
          backgroundColor: variables.colors.primary,
        },
      },
      "&:hover": {
        backgroundColor: variables.colors.primary,
        color: variables.colors.white,
        borderColor: variables.colors.primaryHover,
      },
    },
  },
  tableEmpty: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "430px",
    "& > img": {
      width: "200px",
      height: "200px",
      objectFit: "cover",
      borderRadius: "50%",
    },
  },
});
