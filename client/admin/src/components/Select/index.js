import {
  Box,
  ClickAwayListener,
  Collapse,
  List,
  ListItem,
  OutlinedInput,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import variables from "../../utils/styles/variables";
import Button from "../Button";
import { classnames } from "../../utils/handleClassnames";
import { deleteKey } from "../../utils/utils";
let classes;
const getOptions = (options, values) => {
  return Array.isArray(options)
    ? options.map((item, index) => {
        const elm = {
          id: item.id || index + 1,
          name: item.name,
        };
        elm["active"] = values.find((i) => i.id === elm.id) ? true : false;
        return elm;
      })
    : [];
};
const Select = ({
  className = "",
  sx = {},
  placeholder = "Chọn ...",
  multiple = false,
  options = [],
  onChange = null,
  name = "",
  value = null,
  disable = false,
  //defaultValue = null,
}) => {
  classes = useStyles();
  const [show, setShow] = useState(false);

  const [optionsState, setOptionsState] = useState(() =>
    getOptions(options, Array.isArray(value) ? value : [value])
  );
  useEffect(() => {
    setOptionsState(() =>
      getOptions(options, Array.isArray(value) ? value : [value])
    );
  }, [options]);

  const handleCloseDropdown = (e) => {
    if (!e.target.matches(`.${classes["selectSearch"]} > input`)) {
      show && setShow(false);
    }
  };
  const handleShowDropdown = () => {
    !disable && setShow((show) => !show);
  };
  const handleSelectedOption = async (elm) => {
    let flag = false;
    const activeElm = optionsState.find((item) => item.id === elm.id);
    setShow(false);
    if (multiple) {
      flag = true;
      !elm.active && (activeElm.active = true);
    } else {
      if (!elm.active) {
        flag = true;
        const prevActiveElm = optionsState.find((item) => item.active);
        prevActiveElm && (prevActiveElm.active = false);
        activeElm.active = true;
      }
    }
    const stateNew = [...optionsState];
    await setOptionsState(stateNew);
    flag && onChange && onChange(getValueSelected(stateNew, multiple));
  };
  const handleCancelOption = async (elm) => {
    const activeElm = optionsState.find((item) => item.id === elm.id);
    activeElm.active = false;

    setShow(() => true);

    const stateNew = [...optionsState];
    await setOptionsState(stateNew);
    onChange && onChange(getValueSelected(stateNew, multiple));
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleCloseDropdown}>
        <Box
          sx={sx}
          className={classnames(`${classes["select"]} ${className}`, {
            disable: disable,
          })}
          onClick={handleShowDropdown}
        >
          <>
            {!optionsState.filter((item) => item.active).length ? (
              <Typography
                noWrap
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  minWidth: 0,
                  flex: 1,
                  color: variables.colors.border,
                }}
              >
                {placeholder}
              </Typography>
            ) : (
              <div className={classes["selectSelected"]}>
                {optionsState
                  .filter((item) => item.active)
                  .map((item) => (
                    <Button
                      variant="overlay"
                      key={item.id}
                      className={classes["selectSelectedItem"]}
                      sx={{
                        "& + &": {
                          marginLeft: "8px",
                        },
                      }}
                    >
                      <span>{item.name}</span>
                      <CancelIcon
                        onClick={() => handleCancelOption(item)}
                        sx={{
                          marginLeft: "5px",
                          "&:hover": {
                            opacity: 0.8,
                          },
                        }}
                      />
                    </Button>
                  ))}
              </div>
            )}
            <ArrowDropDownIcon
              sx={{
                marginLeft: "5px",
                width: "30px",
                height: "30px",
              }}
            />
          </>
        </Box>
      </ClickAwayListener>
      <Collapse in={show}>
        <div className={classes["selectDropdown"]}>
          <Search
            stateParent={{
              options: options,
              setOptions: setOptionsState,
            }}
          />
          <List>
            {optionsState.map((item) => (
              <ListItem
                onClick={() => handleSelectedOption(item)}
                key={item.id}
                className={item.active ? "active" : ""}
              >
                <Typography noWrap>{item.name}</Typography>
              </ListItem>
            ))}
          </List>
        </div>
      </Collapse>
    </>
  );
};

const Search = ({ stateParent = {} }) => {
  const handleOnChange = (e) => {
    const val = e.target.value;

    const optionsNew = stateParent.options.filter((item) =>
      item.title.toLowerCase().includes(val.toLowerCase())
    );
    stateParent.setOptions([...optionsNew]);
  };

  return (
    <OutlinedInput
      className={classes["selectSearch"]}
      placeholder="Nhập nội dung cần tìm"
      onChange={handleOnChange}
      endAdornment={<SearchIcon />}
    />
  );
};

export default React.memo(Select);

const getValueSelected = (options, multiple) => {
  return !multiple
    ? deleteKey({ ...options.find((item) => item.active) }, "active")
    : options
        .filter((item) => item.active)
        .map((i) => deleteKey({ ...i }, "active"));
};
