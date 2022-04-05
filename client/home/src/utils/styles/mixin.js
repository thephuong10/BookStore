import variables from "./variables";
const hexToRgb = (hex) => {
  var arrBuff = new ArrayBuffer(4);
  var vw = new DataView(arrBuff);
  vw.setUint32(0, parseInt(hex.replace("#", ""), 16), false);
  var arrByte = new Uint8Array(arrBuff);
  return [arrByte[1], arrByte[2], arrByte[3]];
};
const mixin = {
  breakPoint: (
    breakpoint,
    content
  ) => `@media screen and (max-width: ${variables.breakpoints[breakpoint]}) {
    ${content}
  }`,
  colorRgba: (color, opacity = 1) =>
    `rgba(${[...hexToRgb(color), opacity].join(",")})`,
  textOverflowMultipleLines: (line) => `
      padding: 0;
      overflow-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: ${line};
      -webkit-box-orient: vertical;
      overflow: hidden;
  `,
};

export default mixin;
