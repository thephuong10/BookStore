import {
  Box,
  ClickAwayListener,
  Zoom,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import React, { useState } from "react";
import useStyles from "./styles";
import variables from "../../utils/styles/variables";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { classnames } from "../../utils/handleClassnames";
const SelectBase = ({
  values = [],
  placeholder = "Chọn...",
  onChange,
  onClick,
  disable = false,
  defaultValue = null,
  sx = {},
  className = "",
  position = "bottom",
}) => {
  const classes = useStyles();
  const [options, setOptions] = useState(() =>
    values.map((item, index) => ({
      id: index,
      active: false,
      disable: false,
      title: `Lựa chọn ${index + 1}`,
      ...item,
    }))
  );
  const [show, setShow] = useState(false);
  const handleOnChange = (id) => () => {
    const currentElm = options.find((i) => i.id === id);
    if (!currentElm.disable) {
      const activeElm = options.find((i) => i.active);
      if (!currentElm.active) {
        activeElm && (activeElm.active = false);
        currentElm.active = true;
        setOptions(() => [...options]);
        onChange && onChange(options.find((i) => i.active));
      }
    }
    setShow(() => false);
  };

  return (
    <>
      <ClickAwayListener onClickAway={() => show && setShow(() => false)}>
        <Box
          className={classnames(`${classes["select"]} ${className}`, {
            disable: disable,
          })}
          sx={sx}
        >
          <>
            <Typography
              onClick={() => setShow((oldValue) => !oldValue)}
              noWrap
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minWidth: 0,
                flex: 1,
                color: options.find((i) => i.active)
                  ? ""
                  : variables.colors.border,
                "& > span": {
                  padding: "0 0.625rem",
                },
              }}
            >
              <span> {options.find((i) => i.active)?.name || placeholder}</span>
              <ArrowDropDownIcon
                sx={{
                  margin: "0 8px 0 5px",
                  width: "30px",
                  height: "30px",
                }}
              />
            </Typography>
            <Zoom in={show}>
              <Box
                className={classes["selectDropdown"]}
                sx={{
                  top: position === "bottom" ? "100%" : "0%",
                  transform: `${
                    position === "bottom"
                      ? "translateY(10px)"
                      : "translateY(-105%)"
                  } !important`,
                }}
              >
                <List>
                  {options.map((item) => (
                    <ListItem
                      onClick={handleOnChange(item.id)}
                      key={item.id}
                      className={classnames({
                        active: item.active || false,
                        disable: item.disable || false,
                      })}
                    >
                      <Typography noWrap>{item.name}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Zoom>
          </>
        </Box>
      </ClickAwayListener>
    </>
  );
};

export default SelectBase;
