import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useStyles from "./styles";
const regexCheckNumber = /^[0-9\b]+$/;
const Input = ({
  placeholder = "Nhập nội dung",
  type = "",
  className = "",
  icon = null,
  name = "",
  onBlur = null,
  onChange = null,
  sx = null,
  number = "",
  value = "",
}) => {
  number = number && (NUMBER_CASE[number] || NUMBER_CASE["integer"]);
  const valueRef = useRef(number ? getNumber(value, number) : value);
  const inputRef = useRef();
  const classes = useStyles();

  const [typeInput, setTypeInput] = useState(
    () => TYPE_CASE[type] || TYPE_CASE["text"]
  );

  const handleChangeType = () => {
    if (typeInput === TYPE_CASE["text"]) {
      setTypeInput(() => TYPE_CASE["password"]);
    } else {
      setTypeInput(() => TYPE_CASE["text"]);
    }
  };

  const handleOnInput = () => {
    let val = inputRef.current.value;
    if (number) {
      inputRef.current.value = valueRef.current;
      if (number === NUMBER_CASE["decimal"]) {
        if (val === "" || !isNaN(val)) {
          valueRef.current = val;
          console.log(valueRef.current);
          inputRef.current.value = valueRef.current;
        }
      } else {
        if (val === "" || isNumber(val)) {
          valueRef.current = val;
          inputRef.current.value = valueRef.current;
        }
      }
      onChange && onChange(getNumber(valueRef.current, number));
    } else {
      valueRef.current = val;
      onChange && onChange(valueRef.current);
    }
  };

  const handleChangeNumber = (char) => {
    const val = parseFloat(valueRef.current || 0);
    const result = char === "+" ? val + 1 : val - 1;
    if (result >= 0) {
      valueRef.current = result.toString();
      inputRef.current.value = valueRef.current;
      onChange && onChange(getNumber(valueRef.current, number));
    }
  };

  const hanleOnBlur = (e) => {
    const wrapElm = inputRef.current.closest(`.${classes["inputWrap"]}`);
    wrapElm && wrapElm.classList.remove("focus");
    if (number) {
      if (valueRef.current) {
        const val =
          number === NUMBER_CASE["decimal"]
            ? parseFloat(valueRef.current)
            : parseInt(valueRef.current);
        inputRef.current.value = val;
        valueRef.current = inputRef.current.value;
        onChange && onChange(getNumber(valueRef.current, number));
      } else if (inputRef.current.value && isNaN(inputRef.current.value)) {
        inputRef.current.value = valueRef.current;
      }
      onBlur && onBlur(e, getNumber(valueRef.current, number));
    } else {
      onBlur && onBlur(e, valueRef.current);
    }
  };
  const handleOnClick = () => {
    const wrapElm = inputRef.current.closest(`.${classes["inputWrap"]}`);
    wrapElm && wrapElm.classList.add("focus");
  };
  return (
    <Box
      sx={sx}
      // onClick={onClick}
      className={`${classes["inputWrap"]} ${className}`}
    >
      {icon && (
        <span className={classes["inputIcon"]}>
          <Box component={icon}></Box>
        </span>
      )}
      <input
        ref={inputRef}
        placeholder={placeholder}
        type={typeInput}
        className={classes["input"]}
        onInput={handleOnInput}
        name={name}
        onBlur={hanleOnBlur}
        value={value}
        onClick={handleOnClick}
      />
      {number && (
        <span className={classes["inputActions"]}>
          <ArrowDropUpIcon onClick={() => handleChangeNumber("+")} />
          <ArrowDropDownIcon onClick={() => handleChangeNumber("-")} />
        </span>
      )}
      {type === TYPE_CASE["password"] && (
        <Box
          component="span"
          sx={{
            border: "none !important",
            "& > svg": {
              cursor: "pointer",
              transition: "ease 0.3s",
              width: "25px !important",
              height: "25px !important",
              "&:hover": {
                color: "black",
              },
            },
          }}
          className={classes["inputIcon"]}
        >
          {typeInput === TYPE_CASE["password"] ? (
            <VisibilityOffIcon onClick={handleChangeType} />
          ) : (
            <VisibilityIcon onClick={handleChangeType} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default Input;

const TYPE_CASE = {
  text: "text",
  password: "password",
};
const NUMBER_CASE = {
  integer: "integer",
  decimal: "decimal",
};
const isNumber = (value) => regexCheckNumber.test(value);
const getNumber = (value, type) => {
  value = value || 0;
  return type === NUMBER_CASE["integer"] ? parseInt(value) : parseFloat(value);
};
