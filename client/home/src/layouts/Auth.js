import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import userSelector from "../redux/selector/userSelector";
import variables from "../utils/styles/variables";
import Oauth2redirecthandler from "../views/Auth/Oauth2redirecthandler";
import Verification from "../views/Auth/pages/Signup/Verification";
import Signin from "../views/Auth/pages/Signin";
import Signup from "../views/Auth/pages/Signup";
import ForgotPassword from "../views/Auth/pages/FogotPassword";

const Auth = () => {
  const routeMatch = useRouteMatch();
  const token = useSelector(userSelector.getToken);
  return (
    <>
      {token ? (
        <Redirect to={"/"} />
      ) : (
        <AuthStyled>
          <Switch>
            <Route
              path={`${routeMatch.url}/dang-ky/xac-thuc-ma`}
              component={Verification}
            />
            <Route
              path={`${routeMatch.url}/quen-mat-khau`}
              component={ForgotPassword}
            />
            <Route path={`${routeMatch.url}/dang-nhap`} component={Signin} />
            <Route path={`${routeMatch.url}/dang-ky`} component={Signup} />
          </Switch>
          <Route
            path={`${routeMatch.url}/oauth2/redirect`}
            component={Oauth2redirecthandler}
          />
        </AuthStyled>
      )}
    </>
  );
};

export default Auth;

const AuthStyled = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background-color: ${variables.ui.colors.primary};
`;
