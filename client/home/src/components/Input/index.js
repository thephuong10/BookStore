import React, { useRef, useState } from "react";
import { EndIcon, InputWrap, StartIcon } from "./styles";
const regexCheckNumber = /^[0-9\b]+$/;
const Input = ({
  type = "",
  css = "",
  number = "",
  value = "",
  placeholder = "",
  icon = null,
  name = "",
  className = "",
  ...rest
}) => {
  number = number && (NUMBER_CASE[number] || NUMBER_CASE["integer"]);
  const valueRef = useRef(
    number ? getNumber(value || "", number) : value || ""
  );
  const inputRef = useRef();
  const [typeInput, setTypeInput] = useState(
    () => TYPE_CASE[type] || TYPE_CASE["text"]
  );
  const handleOnClick = () => {
    const inputWrap = inputRef.current.closest(InputWrap);
    inputWrap && inputWrap.classList.add("focus");
  };
  const handleOnBlur = (e) => {
    const { onBlur } = rest;
    const inputWrap = inputRef.current.closest(InputWrap);
    inputWrap && inputWrap.classList.remove("focus");
    if (number) {
      handleRounding(inputRef, valueRef, number);
      onBlur && onBlur(e, getNumber(valueRef.current, number));
    } else {
      onBlur && onBlur(e, valueRef.current);
    }
  };
  const handleOnInput = () => {
    const { onChange } = rest;
    if (number) {
      handleNumber(inputRef, valueRef, number);
      onChange && onChange(getNumber(valueRef.current, number));
    } else {
      valueRef.current = inputRef.current.value;
      onChange && onChange(valueRef.current);
    }
  };

  const handleChangeType = () => {
    typeInput === TYPE_CASE["password"]
      ? setTypeInput(TYPE_CASE["text"])
      : setTypeInput(TYPE_CASE["password"]);
  };

  return (
    <InputWrap css={css} className={className}>
      {icon && <StartIcon>{icon}</StartIcon>}
      <input
        type={typeInput}
        onClick={handleOnClick}
        ref={inputRef}
        onBlur={handleOnBlur}
        onInput={handleOnInput}
        placeholder={placeholder}
        name={name}
        value={value}
      />
      {type === TYPE_CASE["password"] ? (
        <EndIcon
          className={`${typeInput === TYPE_CASE["password"] ? "hide" : "show"}`}
          onClick={handleChangeType}
        >
          <i className="bx bx-hide"></i>
          <i className="bx bx-show-alt"></i>
        </EndIcon>
      ) : (
        <></>
      )}
    </InputWrap>
  );
};

export default Input;

const handleNumber = (elmRef, valRef, type) => {
  let val = elmRef.current.value;
  elmRef.current.value = valRef.current;
  if (type === NUMBER_CASE["decimal"]) {
    if (val === "" || !isNaN(val)) {
      valRef.current = val;
      console.log(valRef.current);
      elmRef.current.value = valRef.current;
    }
  } else {
    if (val === "" || isNumber(val)) {
      valRef.current = val;
      elmRef.current.value = valRef.current;
    }
  }
};

const handleRounding = (elmRef, valRef, type) => {
  if (valRef.current) {
    const val =
      type === NUMBER_CASE["decimal"]
        ? parseFloat(valRef.current)
        : parseInt(valRef.current);
    elmRef.current.value = val;
    valRef.current = elmRef.current.value;
  } else if (elmRef.current.value && isNaN(elmRef.current.value)) {
    elmRef.current.value = valRef.current;
  }
};

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
