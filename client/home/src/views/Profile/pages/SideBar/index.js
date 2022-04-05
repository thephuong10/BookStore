import React from "react";
import { Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "../../../../components/Avatar";
import List, { ListItem } from "../../../../components/List";
import Typography from "../../../../components/Typography";
import variables from "../../../../utils/styles/variables";
import { AccountStyled, SidebarStyled } from "./styles";
import userSelector from "../../../../redux/selector/userSelector";

const sidebars = [
  {
    title: "Thông tin tài khoản",
    link: "thong-tin-tai-khoan",
    icon: <i className="bx bxs-user"></i>,
  },
  {
    title: "Quản lý đơn hàng",
    link: "quan-ly-don-hang",
    icon: <i className="bx bxs-book-content"></i>,
  },
  {
    title: "Địa chỉ",
    link: "dia-chi",
    icon: <i className="bx bxs-map"></i>,
  },
];

const Sidebar = () => {
  const info = useSelector(userSelector.getInfo);
  return (
    <SidebarStyled>
      <AccountStyled>
        <Avatar />
        <Typography
          css={`
            margin-left: 8px;
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: center;
            gap: 3px;
            & > span {
              font-size: 14px;
              font-weight: 400;
              line-height: 1.2;
            }
            & > strong {
              font-size: 15px;
              font-weight: 600;
              line-height: 1.2;
            }
          `}
        >
          <span>Tài khoản của</span>
          <strong>{info.fullname}</strong>
        </Typography>
      </AccountStyled>
      <SidebarMenu />
    </SidebarStyled>
  );
};

export default Sidebar;

const SidebarMenu = () => {
  const history = useHistory();
  const handleChangeTab = (link, active) => () => {
    !active && history.replace(link);
  };
  return (
    <List>
      {sidebars.map((item, index) => (
        <Route
          key={index}
          path={`/trang-ca-nhan/${item.link}`}
          exact
          children={({ match }) => (
            <ListItem
              onClick={handleChangeTab(
                `/trang-ca-nhan/${item.link}`,
                Boolean(match)
              )}
              css={`
                border-radius: 5px;
                ${match
                  ? `background-color: ${variables.ui.colors.primary};
                     color: ${variables.ui.colors.white};
                    `
                  : ""}
                & > span {
                  font-size: 25px;
                  display: inline-flex;
                  justify-content: center;
                  align-items: center;
                  margin-right: 5px;
                }
                & > * {
                  color: currentcolor;
                }
              `}
            >
              <span>{item.icon}</span>
              <Typography>{item.title}</Typography>
            </ListItem>
          )}
        />
      ))}
    </List>
  );
};
