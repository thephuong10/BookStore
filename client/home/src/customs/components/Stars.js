import React from "react";
import styled from "styled-components";
import variables from "../../utils/styles/variables";
import { ReactComponent as StarHalf } from "../../assets/svg/star-half.svg";
const Stars = ({ star = 0, css = "", className = "" }) => {
  let number = star * 2;
  return (
    <StarStyled css={css} className={className}>
      {[1, 2, 3, 4, 5].map((item) => (
        <span key={item}>
          <StarHalfStyled active={number-- > 0 || false} />
          <StarHalfStyled active={number-- > 0 || false} />
        </span>
      ))}
    </StarStyled>
  );
};

export default Stars;

const StarHalfStyled = styled(StarHalf)`
  position: absolute;
  width: 100%;
  height: 100%;
  color: ${(props) =>
    props.active
      ? `${variables.ui.colors.yellow}`
      : `${variables.text.colors.disable}`};
`;
const StarStyled = styled.div`
  display: flex;
  align-items: center;
  & > span {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 14px;
    height: 14px;
    margin-right: 3px;
    & > ${StarHalfStyled} {
      &:last-child {
        transform: rotateY(180deg) translateX(-52%);
      }
    }
  }
  ${(props) => props.css || ""}
`;
