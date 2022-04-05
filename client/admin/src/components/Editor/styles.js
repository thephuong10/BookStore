import { makeStyles } from "@mui/styles";
import variables from "../../utils/styles/variables";

export default makeStyles({
  editor: {
    padding: "1rem 0.625rem",
    border: "2px solid #cbced5",
    borderRadius: "5px",
    "&.focus": {
      borderColor: `${variables.colors.primary} !important`,
    },
    "& .editorClassName": {
      backgroundColor: "white",
      maxHeight: "500px",
      overflowY: "auto",
      minHeight: "200px",
      padding: "0 0.625rem",
    },
    "& .rdw-emoji-modal,& .rdw-embedded-modal": {
      left: "100%",
      transform: "translateX(-100%)",
    },
    "& .rdw-image-modal": {
      left: 0,
    },
    "& .rdw-image-modal-upload-option": {
      padding: "15px",
    },
    "& .rdw-image-modal-upload-option-label": {
      overflow: "hidden",
      display: "-webkit-box",
      wordBreak: "break-word",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      padding: 0,
    },
  },
});
