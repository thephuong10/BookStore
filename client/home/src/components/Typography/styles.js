import styled from "styled-components";
import mixin from "../../utils/styles/mixin";

const textAlign = (align) => {
  const aligns = ["inherit", "center", "justify", "left", "right"];
  return (
    aligns.find((i) => i.toLowerCase() === align.toLowerCase()) || aligns[0]
  );
};

const TextSize = (size) => {
  switch (size) {
    case "mid":
      return `
      line-height: 1.6;
      font-size: 18px;
      font-weight: 500;
      ${mixin.breakPoint(
        "tablet",
        `
        line-height: 1.4;
        font-size: 16px;
        font-weight: 500;
       `
      )}
    `;
    case "big":
      return `
      line-height: 1.3;
      font-size: 28px;
      font-weight: 600;
      ${mixin.breakPoint(
        "tablet",
        `
        line-height: 1.2;
        font-size: 24px;
        font-weight: 500;
       `
      )}
    `;
    default:
      return `
      line-height: 1.6;
      font-size: 16px;
      font-weight: 500;
      ${mixin.breakPoint(
        "tablet",
        `
       line-height: 1.4;
        font-size: 14px;
        font-weight: 400;
       `
      )}
    `;
  }
};

export const Wrapper = styled.p`
  display: inline-block;
  color: #4b5d68;
  padding: 8px;
  ${(props) => (props.fullwidth ? "width:100%;" : "")}
  ${(props) => TextSize(props.size)}
  ${(props) =>
    props.nowrap
      ? `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  `
      : ""}
  text-align:${(props) => textAlign(props.align)};
  ${(props) => props.css || ""}
`;
