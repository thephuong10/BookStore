import React from "react";
import { LoadingSpinner, LoadingStyled } from "./styles";

const Loading = ({ css = "" }) => {
  return (
    <LoadingStyled css={css}>
      <LoadingSpinner></LoadingSpinner>
    </LoadingStyled>
  );
};

export default Loading;
