import { Box } from "@mui/material";
import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import variables from "../utils/styles/variables";
import Products from "../views/Products";
import { Route, Switch, useRouteMatch } from "react-router";
import Dashboash from "../views/DashBoash";
import Alert from "../components/Alert";
import Dialog from "../components/Dialog";
import Stall from "../views/Stall";
import CAP from "../views/CAP";
import Sales from "../views/Sales";
import Profile from "../views/Profile";
import Orders from "../views/Orders";
import Reviews from "../views/Reviews";

const Admin = () => {
  const match = useRouteMatch();

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Sidebar />
      <Navbar />
      <Box
        component="main"
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          padding: `${variables.navHeight} 0 0 ${variables.sidebarWidth}`,
          backgroundColor: "#fafafb",
        }}
      >
        <Box
          sx={{
            padding: "2rem",
          }}
        >
          <Switch>
            <Route
              path={`${match.url}trang-ca-nhan`}
              render={() => <Profile />}
            />
            <Route path={`${match.url}danh-gia`} render={() => <Reviews />} />
            <Route path={`${match.url}don-hang`} render={() => <Orders />} />
            <Route path={`${match.url}san-pham`} render={() => <Products />} />
            <Route path={`${match.url}khuyen-mai`} render={() => <Sales />} />
            <Route
              path={`${match.url}the-loai/tac-gia/nha-xuat-ban`}
              render={() => <CAP />}
            />
            <Route path={`${match.url}gian-hang`} render={() => <Stall />} />
            <Route path={match.url} render={() => <Dashboash />} />
          </Switch>
        </Box>
      </Box>
      <Alert />
      <Dialog />
    </Box>
  );
};

export default Admin;
