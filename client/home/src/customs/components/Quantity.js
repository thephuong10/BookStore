import React, { useRef, useState } from "react";
import styled from "styled-components";
import { isNumber } from "../../utils/fun";
import variables from "../../utils/styles/variables";

const Quantity = ({
  min = 0,
  max = 1000,
  css = "",
  defaultValue = 0,
  ...rest
}) => {
  const [value, setValue] = useState(defaultValue || min);
  const handleOnChange = (e) => {
    const { onChange } = rest;
    let val = e.target.value;
    e.target.value = value;
    if (!(val === "" || isNumber(val))) {
      val = "";
    }
    setValue(() => val);
    val && onChange && onChange(parseInt(val));
  };
  const handleOnBlur = (e) => {
    const { onChange } = rest;
    let val = e.target.value;
    if (!isNumber(val)) {
      val = value || min;
      // setValue(() => value || min);
    } else {
      val = parseInt(val);
      if (val > max) {
        val = max;
      } else if (val < min) {
        val = min;
      }
    }
    setValue(() => val);
    onChange && onChange(val);
  };
  const handleUpOrDown = (char) => () => {
    const { onChange } = rest;
    let val = parseInt(value);
    if (char === "+" && value < max) {
      val++;
      setValue(() => val);
      onChange && onChange(val);
    } else if (char === "-" && value > min) {
      val--;
      setValue(() => val);
      onChange && onChange(val);
    }
  };
  return (
    <QuantityStyled css={css} {...rest}>
      <span
        onClick={handleUpOrDown("-")}
        className={`${value == min ? "disable" : ""}`}
      >
        <i className="bx bx-minus"></i>
      </span>
      <input
        type="text"
        onInput={handleOnChange}
        onBlur={handleOnBlur}
        value={value}
      />
      <span
        onClick={handleUpOrDown("+")}
        className={`${value == max ? "disable" : ""}`}
      >
        <i className="bx bx-plus"></i>
      </span>
    </QuantityStyled>
  );
};

export default Quantity;

const QuantityStyled = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 3px;
  border: 2px solid ${variables.ui.colors.disable};
  height: 40px;
  & > input {
    outline: 0;
    border: none;
    width: 50px;
    height: 100%;
    border-width: 0 2px 0 2px;
    border-style: solid;
    border-color: ${variables.ui.colors.disable};
    font-size: 15px;
    color: ${variables.text.colors.primary};
    text-align: center;
  }
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 100%;
    cursor: pointer;
    font-size: 17px;
    transition: ease 0.3s;
    &:hover:not(.disable) {
      background-color: ${variables.ui.colors.primary};
      color: #ffffff;
    }
    &.disable {
      cursor: not-allowed;
      background-color: #ececec;
    }
  }
  ${(props) => props.css || ""}
`;
