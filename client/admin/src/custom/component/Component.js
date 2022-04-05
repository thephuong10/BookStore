import React from "react";

const Component = ({ element: Element, ...rest }) => {
  return <Element {...rest} />;
};

export default Component;
