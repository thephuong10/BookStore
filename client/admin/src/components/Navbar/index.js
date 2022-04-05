import {
  AppBar,
  Avatar,
  Paper,
  Toolbar,
  Typography,
  List,
  ListItem,
  Box,
} from "@mui/material";
import React, { useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useStyles from "./styles";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, Route } from "react-router-dom";
import initialSidebars from "../../constants/initialData/sidebar";
import accountSelector from "../../redux/selectors/accountSelector";
import { useSelector, useDispatch } from "react-redux";
import { isObject } from "../../utils/utils";
import AccountAvartar from "../../assets/images/avatar-admin.png";
import { AccountActions, fetchUserInfo } from "../../redux/slice/account";
import { useHistory } from "react-router-dom";
const accountMenu = [
  {
    title: "Thông tin cá nhân",
    router: "/trang-ca-nhan",
    icon: ManageAccountsIcon,
  },
];
let classes;
const Navbar = () => {
  classes = useStyles();

  return (
    <AppBar className={classes["nav"]}>
      <Toolbar className={`${classes["nav"]}-inner`}>
        <Route
          path="/"
          children={({ location }) => {
            return (
              <Typography className={`${classes["nav"]}-title`}>
                {
                  [...initialSidebars]
                    .reverse()
                    .find((item) => location.pathname.startsWith(item.router))
                    .title
                }
              </Typography>
            );
          }}
        />
        <AccountNav />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

const AccountNav = () => {
  const userInfo = useSelector(accountSelector.getInfo);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);
  const handleLogout = () => {
    dispatch(AccountActions.setToken(null));
    history.replace("/auth/signin");
  };
  return (
    <Paper className={classes["navAccount"]}>
      {isObject(userInfo) && (
        <>
          <div className={`${classes["navAccount"]}-inner`}>
            <span className={`${classes["navAccount"]}-avatar`}>
              <img src={AccountAvartar} />
            </span>
            <div className={`${classes["navAccount"]}-content`}>
              <Typography>{userInfo.fullname}</Typography>
              <KeyboardArrowDownIcon />
            </div>
          </div>
          <List className={classes["navAccountMenu"]}>
            {accountMenu.map((item, index) => (
              <ListItem key={index}>
                <Link
                  className={`${classes["navAccountMenu"]}-item`}
                  to={item.router}
                >
                  <Box
                    component={item.icon}
                    sx={{
                      marginRight: "10px",
                    }}
                  ></Box>
                  <Typography noWrap>{item.title}</Typography>
                </Link>
              </ListItem>
            ))}
            <ListItem>
              <div
                onClick={handleLogout}
                className={`${classes["navAccountMenu"]}-item`}
              >
                <Box
                  component={LogoutIcon}
                  sx={{
                    marginRight: "10px",
                  }}
                ></Box>
                <Typography noWrap>Đăng xuất</Typography>
              </div>
            </ListItem>
          </List>
        </>
      )}
    </Paper>
  );
};
