import React, { useEffect, useRef, useState } from "react";
import { isObject } from "../../utils/fun";
import Typography from "../Typography";
import { SelectStyled, SelectHeadStyled, SelectDropdownStyled } from "./styles";

const Select = ({
  values = [],
  placeholder = "Chọn...",
  onChange,
  onClick,
  disable = false,
  defaultValue = null,
}) => {
  const selectRef = useRef();
  const [options, setOptions] = useState(() =>
    values.map((item, index) => ({
      id: index,
      active: false,
      title: `Lựa chọn ${index + 1}`,
      ...item,
    }))
  );
  const handleOnChange = (id) => () => {
    const activeElm = options.find((i) => i.active);
    const currentElm = options.find((i) => i.id === id);
    selectRef.current.classList.toggle("show");
    if (!currentElm.active) {
      activeElm && (activeElm.active = false);
      currentElm.active = true;
      setOptions(() => [...options]);
      onChange && onChange(options.find((i) => i.active));
    }
  };
  const handleOnClick = () => {
    if (!disable) {
      selectRef.current.classList.toggle("show");
      onClick && onClick();
    }
  };
  useEffect(() => {
    setOptions(() =>
      values.map((item, index) => ({
        id: index,
        active: false,
        title: `Lựa chọn ${index + 1}`,
        ...item,
      }))
    );
  }, [values]);
  // useEffect(() => {
  //   if (isObject(defaultValue)) {
  //   }
  // }, [defaultValue]);
  return (
    <SelectStyled ref={selectRef} className={`${disable ? "disable" : ""}`}>
      <Typography
        onClick={handleOnClick}
        fullWidth
        css={`
          cursor: pointer;
          display: flex;
          align-items: center;
          font-size: 15px;
          & > span:first-child {
            flex: 1;
          }
          & > span:last-child {
            width: 40px;
            height: 100%;
            font-size: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      >
        <span>
          {
            /*options.find((i) => i.active)?.title*/ defaultValue?.title ||
              placeholder
          }
        </span>
        <span>
          <i className="bx bxs-chevron-down"></i>
        </span>
      </Typography>
      <SelectDropdownStyled>
        <ul>
          {options.map((item) => (
            <li
              key={item.id}
              onClick={handleOnChange(item.id)}
              className={`${item.active ? "active" : ""}`}
            >
              <Typography
                css={`
                  padding: 0;
                  font-size: 15px;
                `}
              >
                {item.title}
              </Typography>
            </li>
          ))}
        </ul>
      </SelectDropdownStyled>
    </SelectStyled>
  );
};

export default Select;
