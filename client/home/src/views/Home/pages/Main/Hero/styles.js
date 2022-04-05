import styled, { keyframes } from "styled-components";
import mixin from "../../../../../utils/styles/mixin";

import variables from "../../../../../utils/styles/variables";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  ${mixin.breakPoint(
    "tablet",
    `
    flex-direction:column;
  `
  )}
`;

export const HeroContent = styled.div`
  width: 50%;
  flex-shrink: 0;
  position: relative;
  ${mixin.breakPoint(
    "tablet",
    `
    width: 100%;
  `
  )}
`;

export const HeroImage = styled.div`
  width: 50%;
  flex-shrink: 0;
  img {
    width: 100%;
    object-fit: cover;
    transform: translateX(50px);
  }
  ${mixin.breakPoint(
    "tablet",
    `
    width: 100%;
    img {
      max-width:500px;
      max-height:450px;
      transform: none;
      margin:auto;
    }
  `
  )}
`;
const HeroIconsAnimation = keyframes`
  100% {
    transform: translateX(-100%);
  }
`;

export const HeroIcons = styled.div`
  margin: auto;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  color: ${variables.text.colors.disable};
  .hero-icon {
    transform: rotate(-90deg);
    display: inline-flex;
    align-items: center;
    &-line,
    &-arrows > span {
      &:after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        border-radius: inherit;
        height: 100%;
        opacity: 1;
        background-color: ${variables.ui.colors.primary};
        transform: translateX(100%);
        animation: ${HeroIconsAnimation} 1.4s ${variables.ease.quickly} infinite;
      }
    }
    &-line {
      position: relative;
      margin-left: -14px;
      margin-right: 30px;
      width: 70px;
      height: 3px;
      border-radius: 3px;
      background-color: currentcolor;
      overflow: hidden;
      z-index: 1;
    }
    &-arrows {
      display: inline-flex;
      width: 14px;
      height: 3px;
      position: relative;
      color: currentcolor;
      & > span {
        display: inline-block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 3px;
        overflow: hidden;
        background-color: currentcolor;
        z-index: 2;
        transform-origin: left bottom;
        &:nth-child(1) {
          transform: rotate(45deg) translate(-2px, 0px);
        }
        &:nth-child(2) {
          transform: rotate(-45deg);
        }
      }
    }
  }
  ${mixin.breakPoint(
    "tablet",
    `
    display:none;
  `
  )}
`;
