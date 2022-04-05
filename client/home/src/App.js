import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./layouts/Home";
import Auth from "./layouts/Auth";
import { userActions } from "./redux/slice/UserSlice";
import Profile from "./layouts/Profile";
import Toast from "./components/Toast";
let store = null;
export const injectAppStore = (_store) => {
  store = _store;
};

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const _token = sessionStorage.getItem("token");
    if (_token != null) {
      dispatch(userActions.setToken(_token));
    }
    const setToken = () => {
      const { user } = store.getState();
      user.auth.token && sessionStorage.setItem("token", user.auth.token);
    };
    sessionStorage.removeItem("token");
    window.addEventListener("unload", setToken);
    return () => {
      window.removeEventListener("unload", setToken);
    };
  }, []);
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path={"/xac-thuc"} component={Auth} />
          <Route path={"/"} component={Home} />
        </Switch>
        <Toast />
      </BrowserRouter>
    </>
  );
}

export default App;
