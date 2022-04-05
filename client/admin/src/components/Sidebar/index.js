import { Drawer, Box, ListItem, List, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import initialSidebars from "../../constants/initialData/sidebar";
import useStyles from "./styles.js";
let classes;
let setTitleNavFun;
const Sidebar = () => {
  classes = useStyles();
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <Drawer
      className={classes["sidebar"]}
      open={openSidebar}
      variant="permanent"
      anchor="left"
    >
      <div className={classes["sidebarLogo"]}>
        <img src="https://media.istockphoto.com/vectors/blue-e-book-logo-design-vector-sign-of-electronic-book-library-icon-vector-id1270155083?b=1&k=20&m=1270155083&s=612x612&w=0&h=ObbH3o9sJjhcZZNPFhUviJBLZdXtp4o4Cyk3AJ4scNo=" />
        <span>Shop</span>
      </div>
      <List>
        {initialSidebars
          .filter((i) => i.router !== "/trang-ca-nhan")
          .map((item, index) => (
            <ListItemCustom
              className={classes["sidebarMenuItem"]}
              key={index}
              elm={item}
            />
          ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

const ListItemCustom = ({ elm, className }) => {
  const handleChangeRoute = () => {
    setTitleNavFun && setTitleNavFun(elm.title);
  };
  return (
    <Route
      path={elm.router}
      children={({ match }) => (
        <ListItem className={className}>
          <Link to={elm.router}>
            <Box
              sx={{
                marginRight: "0.625rem",
              }}
              component={elm.icon}
            ></Box>
            <Typography
              noWrap
              sx={{
                flex: 1,
              }}
            >
              {elm.title}
            </Typography>
          </Link>
        </ListItem>
      )}
    />
  );
};
