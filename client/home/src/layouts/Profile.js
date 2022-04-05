import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import Typography from "../components/Typography";
import Button from "../components/Button";
import Container from "../customs/components/Container";
import userSelector from "../redux/selector/userSelector";
import variables from "../utils/styles/variables";
import Address from "../views/Profile/pages/Address";
import Info from "../views/Profile/pages/Info";
import Orders from "../views/Profile/pages/Orders";
import Sidebar from "../views/Profile/pages/SideBar";

const sidebars = [
  {
    title: "Thông tin tài khoản",
    link: "thong-tin-tai-khoan",
    component: Info,
  },
  {
    title: "Quản lý đơn hàng",
    link: "quan-ly-don-hang",
    component: Orders,
  },
  {
    title: "Số địa chỉ",
    link: "dia-chi",
    component: Address,
  },
];

const Profile = () => {
  const history = useHistory();
  const token = useSelector(userSelector.getToken);
  const pathInvalid = sidebars.find(
    (item) => item.link === history.location.pathname.split("/").pop()
  );

  return (
    <>
      <Container>
        {!token ? (
          <ProfileUnthorizedStyled>
            <Typography
              css={`
                font-size: 18px;
                font-weight: 600;
              `}
            >
              Bạn cần đăng nhập có thể theo dõi thông tin cá nhân
            </Typography>
            <Button>
              <Typography>
                <Link to={"/xac-thuc/dang-nhap"}>Đăng nhập</Link>
              </Typography>
            </Button>
          </ProfileUnthorizedStyled>
        ) : (
          <WrapperStyled>
            <Sidebar />
            <WrapperMain>
              <MainTitle />
              {!pathInvalid ? (
                <Redirect to={`/trang-ca-nhan/${sidebars[0].link}`} />
              ) : (
                <Switch>
                  {sidebars.reverse().map((item, index) => (
                    <Route
                      key={index}
                      path={`/trang-ca-nhan/${item.link}`}
                      component={item.component}
                    />
                  ))}
                </Switch>
              )}
            </WrapperMain>
          </WrapperStyled>
        )}
      </Container>
    </>
  );
};

export default Profile;

const MainTitle = () => {
  const history = useHistory();
  const pathInvalid = sidebars.find(
    (item) => item.link === history.location.pathname.split("/").pop()
  );
  return (
    <>
      <Typography
        size="mid"
        css={`
          color: ${variables.ui.colors.primary};
          font-weight: bold;
          margin-bottom: 20px;
        `}
      >
        {!pathInvalid ? sidebars[0].title : pathInvalid.title}
      </Typography>
    </>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  background-color: ${variables.ui.colors.white};
  border-radius: 10px;
  box-shadow: ${variables.boxShadow};
  padding: 20px 10px;
`;

const WrapperMain = styled.div`
  flex: 1;
  padding: 0 20px;
`;

const ProfileUnthorizedStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 350px;
  box-shadow: ${variables.boxShadow};
  border-radius: 5px;
  gap: 10px;
`;
