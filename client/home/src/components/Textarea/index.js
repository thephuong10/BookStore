import React, { useRef } from "react";
import { TextareaStyled } from "./styles";

const Textarea = ({
  css = "",
  value = "",
  placeholder = "",
  name = "",
  className = "",
  ...rest
}) => {
  const textaraeRef = useRef();
  const hanldOnChange = () => {
    const { onChange } = rest;
    onChange && onChange(textaraeRef.current.value);
  };
  const handleOnBlur = (e) => {
    const { onBlur } = rest;
    const textareaWrap = textaraeRef.current.closest(TextareaStyled);
    textareaWrap && textareaWrap.classList.remove("focus");
    onBlur && onBlur(e, textaraeRef.current.value);
  };
  const handleOnClick = () => {
    const textareaWrap = textaraeRef.current.closest(TextareaStyled);
    textareaWrap && textareaWrap.classList.add("focus");
  };
  return (
    <TextareaStyled className={className} css={css}>
      <textarea
        ref={textaraeRef}
        name={name}
        placeholder={placeholder}
        onChange={hanldOnChange}
        onBlur={handleOnBlur}
        onClick={handleOnClick}
        value={value}
      ></textarea>
    </TextareaStyled>
  );
};

export default Textarea;
