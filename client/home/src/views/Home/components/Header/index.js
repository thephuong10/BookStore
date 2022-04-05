import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "../../../../customs/components/Container";
import Dropdown from "../../../../components/Dropdown";
import List, { ListItem } from "../../../../components/List";
import Typography from "../../../../components/Typography";
import {
  Wrapper,
  Navbar,
  Logo,
  Search,
  SearchIcon,
  UserShortcut,
  UserAccountStyled,
} from "./styles";
import Categories from "./Categories";
import { useDispatch, useSelector } from "react-redux";
import userSelector from "../../../../redux/selector/userSelector";
import { userActions } from "../../../../redux/slice/UserSlice";
import userApi from "../../../../apis/userApi";
import { fetchUser } from "../../../../redux/thunks/userThunk";
import Avatar from "../../../../components/Avatar";
import { useHistory } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <Wrapper>
        <Container>
          <Navbar>
            <Link to="/">
              <Logo>
                <Typography size="mid" noWrap className="header-logo">
                  BOOKIE
                </Typography>
                <Typography noWrap className="header-logo-desc">
                  Sách là kiến thức
                </Typography>
              </Logo>
            </Link>
            <SearchElm />
            <UserShortcutElm />
          </Navbar>
        </Container>
      </Wrapper>
      <Container>
        <Categories />
      </Container>
    </header>
  );
};

export default Header;

const SearchElm = () => {
  const history = useHistory();
  const inputRef = useRef();
  const handleOnSearch = () => {
    inputRef.current.value &&
      history.replace(`/c/tim-kiem/${inputRef.current.value}`);
  };
  return (
    <Search>
      <input
        ref={inputRef}
        type="text"
        placeholder="Nhập tên sản phẩm muốn tìm"
      />
      <SearchIcon onClick={handleOnSearch}>
        <i className="bx bx-search-alt"></i>
      </SearchIcon>
    </Search>
  );
};

const authLink = [
  {
    link: "dang-nhap",
    title: "Đăng nhập",
  },
  {
    link: "dang-ky",
    title: "Đăng ký",
  },
];
const UserShortcutElm = () => {
  const token = useSelector(userSelector.getToken);
  const history = useHistory();
  //const token = true;
  const handleChangePage = (link) => () => {
    history.replace(`/xac-thuc/${link}`);
  };
  return (
    <UserShortcut>
      {!token ? (
        <>
          <span className="user-shortcut-item">
            <i className="bx bx-user"></i>
            <Dropdown
              className="user-shortcut-item-dropdown"
              transition="collapse"
            >
              <List>
                {authLink.map((item, index) => (
                  <ListItem key={index} onClick={handleChangePage(item.link)}>
                    {item.title}
                  </ListItem>
                ))}
              </List>
            </Dropdown>
          </span>
          <Link to="/gio-hang" className="user-shortcut-item">
            <i className="bx bx-cart"></i>
          </Link>
        </>
      ) : (
        <UserAccount />
      )}
    </UserShortcut>
  );
};

const UserAccount = () => {
  // const [account, setAccount] = useState(null);
  const info = useSelector(userSelector.getInfo);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser.getInfo());
  }, []);
  const hanleLogout = () => {
    dispatch(userActions.logout());
    history.replace("/");
  };
  return (
    <>
      <UserAccountStyled>
        <>
          <Avatar
            css={`
              width: 35px;
              height: 35px; ;
            `}
          />
          <Typography
            noWrap
            css={`
              font-size: 14px;
              line-height: 1.1;
              font-weight: 500;
              padding: 0 4px;
            `}
          >
            {info?.fullname}
          </Typography>
          <Dropdown
            css="right:0 !important;"
            className="user-shortcut-item-dropdown"
            transition="collapse"
          >
            <List>
              <ListItem onClick={() => history.replace("/trang-ca-nhan")}>
                Trang cá nhân
              </ListItem>
              <ListItem onClick={hanleLogout}>Đăng xuất</ListItem>
            </List>
          </Dropdown>
        </>
      </UserAccountStyled>
      <Link to="/gio-hang" className="user-shortcut-item">
        <i className="bx bx-cart"></i>
        <span>
          {info?.totalCart
            ? info.totalCart > 99
              ? `${99}+`
              : info.totalCart
            : 0}
        </span>
      </Link>
    </>
  );
};
