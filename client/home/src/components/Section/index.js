import React, { useState } from "react";
import Container from "../../customs/components/Container";
import {
  SectionStyled,
  SectionTitleStyled,
  SectionFooterStyled,
} from "./styles";

const Section = ({ className = "", children = "", css = "" }) => {
  return (
    <SectionStyled className={className} css={css}>
      <Container>{children}</Container>
    </SectionStyled>
  );
};

export default Section;

export const SectionTitle = ({
  className = "",
  content = "",
  css = "",
  center = false,
}) => {
  const [title] = useState(() =>
    content
      .split(" ")
      .map((item) => `${item[0].toUpperCase()}${item.substring(1)}`)
      .join(" ")
  );
  return (
    <SectionTitleStyled
      className={className}
      size="big"
      css={css}
      center={center}
      fullWidth
    >
      {title}
    </SectionTitleStyled>
  );
};

export const SectionFooter = ({ className = "", children = "", css = "" }) => {
  return (
    <SectionFooterStyled className={className} css={css}>
      {children}
    </SectionFooterStyled>
  );
};
