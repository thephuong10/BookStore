import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/slice/UserSlice";

const Oauth2redirecthandler = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const params = queryString.parse(history.location.search);
    if (params.token) {
      dispatch(userActions.setToken(params.token));
      history.replace("/");
    } else {
      history.replace(`/xac-thuc/dang-nhap?err=${params.error}`, {
        err: params.error,
      });
    }
  }, []);
  return <></>;
};

export default Oauth2redirecthandler;
