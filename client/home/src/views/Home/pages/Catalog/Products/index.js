import React from "react";
import { Route, Switch } from "react-router-dom";

import Categories from "./Categories";
import Classfy from "./Classfy";
import Sales from "./Sales";
import Search from "./Search";

const Products = () => {
  return (
    <>
      <Switch>
        <Route path="/c/the-loai/:key" component={Categories} />
        <Route path="/c/phan-loai/:key" component={Classfy} />
        <Route path="/c/khuyen-mai/:key" component={Sales} />
        <Route path="/c/tim-kiem/:key" component={Search} />
      </Switch>
    </>
  );
};

export default Products;
