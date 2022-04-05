import React, { useRef, useState } from "react";
import {
  Dialog as DialogBase,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "../Button";
import useStyles from "./styles";
import { useEffect } from "react";

const Dialog = ({
  open = false,
  duration = 1000,
  confirmCallback = null,
  cancelCallback = null,
  message = "Nội dung thông báo",
  title = "Thông báo",
  onclose = null,
}) => {
  const dialogRef = useRef();
  const classes = useStyles({ duration: parseInt(duration) || 1000 });
  const handleOnClose = (type) => () => {
    const dialogElm =
      dialogRef.current && dialogRef.current.querySelector(".MuiDialog-paper");
    dialogElm && dialogElm.classList.remove("show");
    setTimeout(() => {
      const action = type === "confirm" ? confirmCallback : cancelCallback;
      action && action();
      onclose && onclose();
    }, duration);
  };
  useEffect(() => {
    setTimeout(() => {
      const dialogElm =
        dialogRef.current &&
        dialogRef.current.querySelector(".MuiDialog-paper");
      dialogElm && dialogElm.classList.toggle("show", open);
    }, 0);
  }, [open]);
  return (
    <DialogBase className={classes["dialog"]} open={open} ref={dialogRef}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="overlay" onClick={handleOnClose("confirm")}>
          Xác nhận
        </Button>
        <Button
          variant="overlay"
          onClick={handleOnClose("cancel")}
          bgColor="danger"
        >
          Hủy
        </Button>
      </DialogActions>
    </DialogBase>
  );
};

export default Dialog;
