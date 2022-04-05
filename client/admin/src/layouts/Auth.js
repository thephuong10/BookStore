import React, { useEffect } from "react";

import Signin from "../views/Signin";

const Auth = () => {
  useEffect(() => {
    document.head.append(...document.querySelectorAll("head [data-jss]"));
  }, []);
  return <Signin />;
};

export default Auth;
