import React, { useRef } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import mixin from "../../utils/styles/mixin";
import variables from "../../utils/styles/variables";
import { isObject } from "../../utils/fun";
const ARROWS_SIZE = {
  small: "30px",
  mid: "40px",
  large: "50px",
};
const ARROWS_TRANSLATE = {
  small: "50%",
  mid: "70%",
  large: "90%",
};
const Slick = ({
  children = "",
  className = "",
  options = {},
  arrows = {
    arrowSize: "",
  },
}) => {
  const sliderRef = useRef();
  const optionRef = useRef({
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    ...options,
  });
  if (arrows) {
    arrows.arrowSize = ARROWS_SIZE[arrows.arrowSize]
      ? arrows.arrowSize
      : "small";
  }
  const hanleChangeSlides = (type) => () => {
    type === "+"
      ? sliderRef.current.slickNext()
      : sliderRef.current.slickPrev();
  };
  return (
    <SliderWrapper className={className}>
      <Slider ref={sliderRef} {...optionRef.current}>
        {children}
      </Slider>
      {isObject(arrows) ? (
        <>
          <CategoryArrow
            arrowSize={arrows.arrowSize}
            onClick={hanleChangeSlides("-")}
            horizontal="left"
          >
            <i className="bx bx-chevron-left"></i>
          </CategoryArrow>
          <CategoryArrow
            arrowSize={arrows.arrowSize}
            onClick={hanleChangeSlides("+")}
          >
            <i className="bx bx-chevron-right"></i>
          </CategoryArrow>
        </>
      ) : (
        <></>
      )}
    </SliderWrapper>
  );
};

export default Slick;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  & .slick-dots > li {
    display: inline-flex;
    justify-content: center;
    margin: 0;
    &.slick-active > button {
      opacity: 1;
    }
    & > button {
      border-radius: 50%;
      width: 8px;
      height: 8px;
      background-color: ${variables.ui.colors.primary};
      opacity: 0.5;
      padding: 0;
      &:before {
        display: none;
      }
    }
  }
`;

const CategoryArrow = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  ${(props) => `
    width: ${ARROWS_SIZE[props.arrowSize]};
    height: ${ARROWS_SIZE[props.arrowSize]};
  `}
  font-size: 22px;
  color: ${variables.ui.colors.primary};
  cursor: pointer;
  border-radius: 50%;
  transition: 0.5s ease;
  background-color: ${mixin.colorRgba(variables.ui.colors.primary, 0.15)};
  ${(props) => (props.horizontal === "left" ? "left:0;" : "right:0;")}
  transform:translate(${(props) =>
    props.horizontal === "left"
      ? `-${ARROWS_TRANSLATE[props.arrowSize]}`
      : `${ARROWS_TRANSLATE[props.arrowSize]}`},-50%);
  transform: translate(
    ${(props) => (props.horizontal === "left" ? `-100%` : `100%`)},
    -50%
  );
  &:hover {
    color: ${variables.ui.colors.white};
    background-color: ${variables.ui.colors.primary};
  }
  ${mixin.breakPoint(
    "tablet",
    `
    display:none;
  `
  )}
`;
