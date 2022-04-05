import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import Component from "../../custom/component/Component";
import Add from "./Add";
import Edit from "./Edit";
import Main from "./Main";

const layouts = [
  {
    component: Add,
    router: "/add",
  },
  {
    component: Edit,
    router: "/edit/:bookId",
  },
  {
    component: Main,
    router: "",
  },
];

const Products = () => {
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

export default Products;
