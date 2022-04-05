import React from "react";

const Component = ({ element: Element, ...rest }) => {
  console.log(Element);
  return <Element {...rest} />;
};

export default Component;
