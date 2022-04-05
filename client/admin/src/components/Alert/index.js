import React, { useState, useRef, useEffect } from "react";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import alertSelector from "../../redux/selectors/alertSelector";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import CloseIcon from "@mui/icons-material/Close";
import { AlertActions } from "../../redux/slice/alert";
import variables from "../../utils/styles/variables";

const LOG0_CASE = {
  success: CheckCircleIcon,
  info: InfoIcon,
  warn: WarningIcon,
  danger: ReportIcon,
};
const TITLE_CASE = {
  success: "Thành công",
  info: "Thông tin",
  warn: "Cảnh báo",
  danger: "Thất bại",
};
let classes;
const Alert = () => {
  const alerts = useSelector(alertSelector.getAll);
  classes = useStyles();
  return (
    <div className={classes["wrapper"]}>
      {alerts.map((item, index) => (
        <AlertItem key={index} entity={item} />
      ))}
    </div>
  );
};

export default Alert;

const AlertItem = ({ entity }) => {
  const dispatch = useDispatch();
  const alertRef = useRef();
  const [height, setHeight] = useState(0);
  const intervalId = useRef(null);

  const close = useRef(false);
  useEffect(() => {
    alertRef.current.classList.add("show");
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
    if (close.current) {
      alertRef.current.classList.remove("show");
      setTimeout(() => {
        console.log(entity.id);
        dispatch(AlertActions.removeById(entity.id));
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
    alertRef.current.classList.remove("show");
    setTimeout(() => {
      dispatch(AlertActions.removeById(entity.id));
    }, 1000);
  };
  return (
    <Box
      className={classes["alertItem"]}
      sx={{
        backgroundColor: variables.colors[entity.status],
      }}
      onMouseEnter={handleCleanTimer}
      onMouseLeave={handleCreateTimer}
      ref={alertRef}
    >
      <Box
        className={classes["alertItemCountDown"]}
        component="span"
        sx={{
          backgroundColor: variables.colors[entity.status],
          "&:after": {
            height: `${height}%`,
          },
        }}
      />
      <div>
        <Box
          component={LOG0_CASE[entity.status]}
          sx={{
            width: "22px",
            height: "22px",
            color: variables.colors[entity.status],
            cursor: "default !important",
          }}
        ></Box>
        <Typography
          sx={{
            padding: "0 8px",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            fontSize: "15px",
            lineHeight: 1.2,
            gap: "5px",
          }}
        >
          <strong>{TITLE_CASE[entity.status]}</strong>
          <span>{entity.message}</span>
        </Typography>
        <CloseIcon
          onClick={handleOnClose}
          sx={{
            color: variables.colors.text,
            "&:hover": {
              color: "#000",
            },
          }}
        />
      </div>
    </Box>
  );
};
