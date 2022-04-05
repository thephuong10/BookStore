import React, { useEffect, useRef, useState } from "react";

import { Inner, Wrapper } from "./styles";

const Dropdown = ({
  children = "",
  className = "",
  transition = "fade",
  open = false,
  css = "",
}) => {
  const [show, setShow] = useState(open);
  const [height, setHeight] = useState(0);
  const innerRef = useRef();
  useEffect(() => {
    setHeight(innerRef.current.offsetHeight);
    const parentElm = innerRef.current.parentNode.parentNode;
    if (parentElm) {
      parentElm.addEventListener("mouseleave", () => {
        setShow(false);
      });
      parentElm.addEventListener("mouseenter", () => {
        setShow(true);
      });
    }
  }, []);
  return (
    <Wrapper
      heightElm={height}
      transition={transition}
      show={show}
      className={className}
      css={css}
    >
      <Inner ref={innerRef}>{children}</Inner>
    </Wrapper>
  );
};

export default Dropdown;
