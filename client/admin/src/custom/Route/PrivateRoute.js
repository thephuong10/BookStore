import React from "react";
import { Redirect, Route } from "react-router-dom";

const Privateroute = ({
  component: Component,
  authenticated,
  redirect,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: redirect,
            }}
          />
        )
      }
    />
  );
};

export default Privateroute;
