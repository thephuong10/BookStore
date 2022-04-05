import React from "react";
import { SpinnerStyled } from "./styles";

const Spinner = ({ className = "", css = "" }) => {
  return (
    <SpinnerStyled className={className} css={css}>
      <svg viewBox="22 22 44 44">
        <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6"></circle>
      </svg>
    </SpinnerStyled>
  );
};

export default Spinner;
