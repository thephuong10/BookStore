import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Component from "../../custom/component/Component";
import AddOrEdit from "./AddOrEdit";
import Main from "./Main";
const layouts = [
  {
    component: AddOrEdit,
    router: "/add-or-edit/:saleId",
  },
  {
    component: Main,
    router: "",
  },
];
const Sales = () => {
  const routeMatch = useRouteMatch();
  return (
    <Switch>
      {layouts.map((item, index) => (
        <Route
          key={index}
          path={`${routeMatch.url}${item.router}`}
          render={() => (
            <Component element={item.component} rootUrl={routeMatch.url} />
          )}
        />
      ))}
    </Switch>
  );
};

export default Sales;
