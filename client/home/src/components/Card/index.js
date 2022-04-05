import React, { useEffect, useRef, useState } from "react";
import mixin from "../../utils/styles/mixin";
import Typography from "../Typography";
import {
  CardStyled,
  CardHeaderStyled,
  CardMediaStyled,
  CardContentStyled,
  CardMainStyled,
} from "./styles";

const Card = ({ className = "", css = "", children = "" }) => {
  return (
    <CardStyled className={className} css={css}>
      {children}
    </CardStyled>
  );
};

export default Card;

export const CardHeader = ({
  className = "",
  css = "",
  title = "",
  subTitle = "",
}) => {
  return (
    <CardHeaderStyled className={className} css={css}>
      <Typography
        css={`
          padding: 0;
          ${mixin.textOverflowMultipleLines(2)}
          line-height: 1.4;
        `}
      >
        {title}
      </Typography>
    </CardHeaderStyled>
  );
};

export const CardMainMedia = ({ className = "", css = "", image = "" }) => {
  return (
    <CardMediaStyled className={className} css={css}>
      <img src={image} />
    </CardMediaStyled>
  );
};

export const CardContent = ({ className = "", css = "", children = "" }) => {
  return (
    <CardContentStyled className={className} css={css}>
      {children}
    </CardContentStyled>
  );
};

export const CardActions = ({ className = "", css = "", children = "" }) => {
  return (
    <CardContentStyled className={className} css={css}>
      {children}
    </CardContentStyled>
  );
};
