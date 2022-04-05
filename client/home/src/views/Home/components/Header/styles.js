import styled from "styled-components";
import variables from "../../../../utils/styles/variables";
import mixin from "../../../../utils/styles/mixin";

export const Wrapper = styled.div`
  padding: 20px 0;
  background-color: #f8f8f8;
`;

export const Navbar = styled.div`
  display: flex;
  align-items: center;
  gap: 0 150px;
  ${mixin.breakPoint(
    "tablet",
    `
    justify-content:space-between;
  `
  )}
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
  .header-logo {
    font-size: 30px;
    line-height: 1;
    padding: 0;
    color: ${variables.ui.colors.primary};
    &-desc {
      padding: 3px 0;
    }
  }
`;

export const Search = styled.div`
  flex: 1;
  background-color: ${variables.ui.colors.white};
  border-radius: ${variables.borderRadius};
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  height: 48px;
  & > input {
    flex: 1;
    outline: 0;
    height: 100%;
    padding: 5px 20px;
    border: none;
    font-size: 14px;
  }
  ${mixin.breakPoint(
    "tablet",
    `
    display:none;
  `
  )}
`;

export const SearchIcon = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 60px;
  transition: ease 0.3s;
  cursor: pointer;
  &:hover {
    background-color: ${variables.ui.colors.primary};
    color: ${variables.ui.colors.white};
  }
  & > i {
    font-size: 25px;
  }
`;

export const UserShortcut = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  .user-shortcut-item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    transition: ease 0.3s;
    &:hover {
      color: ${variables.ui.colors.primary};
    }
    & > i {
      font-size: 25px;
    }
    &:nth-child(1):after {
      position: absolute;
      content: "";
      left: 0;
      width: 100%;
      height: 15px;
      top: 90%;
    }
    &-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: -100%;
      z-index: 100;
      li {
        & > a {
          color: currentColor;
          width: 100%;
        }
      }
    }
    &:nth-child(2) > span {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 23px;
      height: 23px;
      border-radius: 50%;
      color: ${variables.ui.colors.white};
      background-color: ${variables.ui.colors.primary};
      box-shadow: 0 0 0 2px #f8f8f8;
      font-size: 12px;
    }
  }
`;

export const UserAccountStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;
  cursor: pointer;
  img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
  }
`;
