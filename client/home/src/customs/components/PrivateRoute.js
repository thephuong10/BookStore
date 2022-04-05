import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

const Privateroute = ({ component: Component, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/xac-thuc/dang-nhap",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
};

export default Privateroute;
