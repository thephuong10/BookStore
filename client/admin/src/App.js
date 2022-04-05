import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Notfound from "./components/Notfound";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
import { useSelector, useDispatch } from "react-redux";
import accountSelector from "./redux/selectors/accountSelector";
import PrivateRoute from "./custom/Route/PrivateRoute";
import { AccountActions } from "./redux/slice/account";
let store = null;
export const injectAppStore = (_store) => {
  store = _store;
};
function App() {
  const token = useSelector(accountSelector.getToken);
  //const token = true;
  const dispatch = useDispatch();
  useEffect(() => {
    const _token = sessionStorage.getItem("token");
    if (_token != null) {
      dispatch(AccountActions.setToken(_token));
    }
    const setToken = () => {
      const { account } = store.getState();
      account.token && sessionStorage.setItem("token", account.token);
    };
    sessionStorage.removeItem("token");
    window.addEventListener("unload", setToken);
    return () => {
      window.removeEventListener("unload", setToken);
    };
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          component={Auth}
          path="/auth/signin"
          exact
          authenticated={!Boolean(token || sessionStorage.getItem("token"))}
          redirect="/"
        />
        <PrivateRoute
          component={Admin}
          authenticated={Boolean(token || sessionStorage.getItem("token"))}
          redirect="/auth/signin"
          path="/"
        />
        <Route component={Notfound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
