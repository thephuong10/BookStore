import { makeStyles } from "@mui/styles";

export default makeStyles({
  container: {
    padding: "1rem 2rem",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  heading: {
    padding: "1rem 0",
    width: "100%",
    fontSize: "1.4rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
  },
  productAvatar: {
    display: "flex",
    flexDirection: "column",
    "& > img": {
      height: "400px",
      objectFit: "cover",
      borderRadius: "5px",
      marginBottom: "5px",
    },
  },
  productInfo: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    gap: "20px 0",
    paddingLeft: "10px",
    height: "100%",
  },
  productEmpty: {
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
