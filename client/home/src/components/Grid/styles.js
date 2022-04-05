import styled from "styled-components";
import mixin from "../../utils/styles/mixin";

const getStyles = (style, attr) => (style ? `${attr}:${style};` : "");

export const GridStyled = styled.div`
  position: relative;
  display: flex;
  flex-wrap: ${(props) => (props.flexwrap ? "wrap" : "no-wrap")};
  ${(props) => getStyles(props.alignitems, "align-items")}
  ${(props) => getStyles(props.justifycontent, "justify-content")}
  ${(props) => props.css || ""}
`;

const createBreakpointGrid = (_col, _spacing, breakpoint) => {
  const col = parseInt(_col);
  const spacing = parseInt(_spacing) || 10;

  if (isNaN(col)) {
    return "";
  }
  if (col >= 1 && col <= 12) {
    const width = Math.round((col / 12) * 100 * 100) / 100;
    const style = `width:calc(${width}% - ${spacing * 2}px);
                    margin:${spacing}px;
                   `;
    return !breakpoint ? style : mixin.breakPoint(breakpoint, style);
  }
};

export const GridItemStyled = styled.div`
  ${(props) => getStyles(props.alignself, "align-self")}
  ${(props) => getStyles(props.justifyself, "justify-self")}
  ${(props) => createBreakpointGrid(props.col, props.spacing)}
  ${(props) => createBreakpointGrid(props.tabletcol, props.spacing, "tablet")}
  ${(props) => createBreakpointGrid(props.mobilecol, props.spacing, "mobile")}
  ${(props) => props.css || ""}
`;
