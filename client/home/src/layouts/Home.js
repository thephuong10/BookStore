import React from "react";
import { Route, Switch } from "react-router-dom";

import Footer from "../views/Home/components/Footer";

import Header from "../views/Home/components/Header";
import Catalog from "../views/Home/pages/Catalog";
import Main from "../views/Home/pages/Main";
import Order from "../views/Home/pages/Order";
import ProductDetail from "../views/Home/pages/ProdutDetail";
import ShoppingCart from "../views/Home/pages/ShoppingCart";

import Profile from "./Profile";

const Home = () => {
  return (
    <>
      <Header />
      <main
        style={{
          margin: "30px 0",
        }}
      >
        <Switch>
          <Route path="/san-pham/:key" component={ProductDetail} />
          <Route path="/c/" component={Catalog} />
          <Route path="/gio-hang" component={ShoppingCart} />
          <Route path={"/xac-nhan-don-hang"} component={Order} />
          <Route path={"/trang-ca-nhan"} component={Profile} />
          <Route path="/" component={Main} />
        </Switch>
      </main>

      <Footer />

      {/* <ConfirmToken /> */}
    </>
  );
};

export default Home;
