import variables from "./variables";

const hexToRgb = (hex) => {
  var arrBuff = new ArrayBuffer(4);
  var vw = new DataView(arrBuff);
  vw.setUint32(0, parseInt(hex.replace("#", ""), 16), false);
  var arrByte = new Uint8Array(arrBuff);
  return [arrByte[1], arrByte[2], arrByte[3]];
};

const mixin = {
  pesudo: () => ({
    position: "absolute",
    content: '""',
  }),
  textOverFlowMultiline: (line) => ({
    wordBreak: "break-word",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }),
  menuItemAnimated: (origin) => {
    const originAnimated = {
      start: {
        transform: "scaleX(0)",
        transformOrigin: "right",
      },
      end: {
        transform: "scaleX(1)",
        transformOrigin: "left",
      },
    };

    switch (origin) {
      case "top-bottom":
        originAnimated.start.transform = "scaleY(0)";
        originAnimated.end.transform = "scaleY(1)";
        originAnimated.start.transformOrigin = "bottom";
        originAnimated.end.transformOrigin = "top";
        break;
      case "bottom-top":
        originAnimated.start.transform = "scaleY(0)";
        originAnimated.end.transform = "scaleY(1)";
        originAnimated.start.transformOrigin = "top";
        originAnimated.end.transformOrigin = "bottom";
        break;
      case "right-left":
        originAnimated.start.transformOrigin = "left";
        originAnimated.end.transformOrigin = "right";
        break;
      default:
        break;
    }

    return {
      "&::after": {
        position: "absolute",
        content: '""',
        inset: 0,
        ...originAnimated.start,
        backgroundColor: variables.colors.primary,
        transition: `transform 0.6s ${variables.ease.quickly}`,
        zIndex: 1,
      },
      "&:hover": {
        color: variables.colors.white,
        "&::after": {
          ...originAnimated.end,
        },
      },
      "& > *": {
        position: "relative",
        zIndex: 2,
      },
    };
  },
  colorRgba: (color, opacity = 1) => {
    return `rgba(${[...hexToRgb(color), opacity].join(",")})`;
  },
  important: (style) => `${style} !important`,
};

export default mixin;
