import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toastSelector from "../../redux/selector/toastSelector";
import { toastActions } from "../../redux/slice/ToastSlice";
import Typography from "../Typography";
import {
  ToastItemCountDownStyled,
  ToastItemStyled,
  ToastWrapStyled,
} from "./styles";
const LOG0_CASE = {
  success: "bx bxs-check-circle",
  info: "bx bxs-message-square-error",
  warn: "bx bxs-error",
  danger: "bx bxs-error-circle",
};
const TITLE_CASE = {
  success: "Thành công",
  info: "Thông tin",
  warn: "Cảnh báo",
  danger: "Thất bại",
};
const Toast = () => {
  const toasts = useSelector(toastSelector.getAll);
  return (
    <ToastWrapStyled>
      {toasts.map((item, index) => (
        <ToastItem key={index} entity={item} />
      ))}
    </ToastWrapStyled>
  );
};

export default Toast;

const ToastItem = ({ entity }) => {
  const dispatch = useDispatch();
  const toastRef = useRef();
  const [height, setHeight] = useState(0);
  const intervalId = useRef(null);

  const close = useRef(false);
  useEffect(() => {
    toastRef.current.classList.add("show");
    intervalId.current = setInterval(() => {
      setHeight((heightNew) => {
        if (heightNew >= 100) {
          clearInterval(intervalId.current);
          close.current = true;
        }
        return heightNew + 100 / (entity.duration / 100);
      });
    }, entity.duration / 100);
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);
  useEffect(() => {
    console.log("zo");
    if (close.current) {
      toastRef.current.classList.remove("show");
      setTimeout(() => {
        console.log(entity.id);
        dispatch(toastActions.removeById(entity.id));
      }, 1000);
    }
  }, [close.current]);
  const handleCleanTimer = () => {
    clearInterval(intervalId.current);
  };
  const handleCreateTimer = () => {
    intervalId.current = setInterval(() => {
      setHeight((heightNew) => {
        if (heightNew >= 100) {
          clearInterval(intervalId.current);
          close.current = true;
        }
        return heightNew + 100 / (entity.duration / 100);
      });
    }, entity.duration / 100);
  };

  const handleOnClose = () => {
    toastRef.current.classList.remove("show");
    setTimeout(() => {
      console.log(entity.id);
      dispatch(toastActions.removeById(entity.id));
    }, 1000);
  };
  return (
    <ToastItemStyled
      status={entity.status}
      onMouseEnter={handleCleanTimer}
      onMouseLeave={handleCreateTimer}
      ref={toastRef}
    >
      <ToastItemCountDownStyled status={entity.status} height={height} />
      <div>
        <i className={LOG0_CASE[entity.status]}></i>
        <Typography
          css={`
            padding: 0 8px;
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            font-size: 15px;
            line-height: 1.2;
            //font-weight: 400;
            gap: 5px;
          `}
        >
          <strong>{TITLE_CASE[entity.status]}</strong>
          <span>{entity.message}</span>
        </Typography>
        <i className="bx bx-x-circle" onClick={handleOnClose}></i>
      </div>
    </ToastItemStyled>
  );
};
