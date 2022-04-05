import React from "react";
import { Paper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import useStyles from "./styles";
const Loading = ({ sx = {}, className = "" }) => {
  const classes = useStyles();
  return (
    <Paper sx={sx} className={`${classes["loading"]} ${className}`}>
      <CircularProgress />
    </Paper>
  );
};

export default Loading;
