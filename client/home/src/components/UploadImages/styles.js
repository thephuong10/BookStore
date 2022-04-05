import styled from "styled-components";
import variables from "../../utils/styles/variables";
export const UploadImageStyled = styled.div`
  position: relative;
  overflow: hidden;
  min-width: 500px;
  min-height: 130px;
  width: 500px;
  border: 2px dashed ${variables.ui.colors.disable};
  border-radius: 5px;
  & > label {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    transition: ease 0.3s;
    &:hover {
      background-color: #f2f3f7;
    }
  }
`;

export const ImageListStyled = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  & > span {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 62px;
    height: 62px;
    overflow: hidden;
    border-radius: 5px;
    background-color: #ffffff;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &:last-child {
      color: ${variables.ui.colors.disable};
      border: 1px dashed;
      border-color: currentColor;
      font-size: 30px;
    }
    & > span {
      position: absolute;
      opacity: 0;
      transition: 0.5s ease;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
      background-color: rgba(0, 0, 0, 0.7);
      color: #ffffff;
      & > i:hover {
        color: #d4cfcf;
      }
    }
    &:hover > span {
      opacity: 1;
    }
  }
`;
