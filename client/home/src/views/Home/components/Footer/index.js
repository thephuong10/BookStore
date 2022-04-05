import React from "react";
import Typography from "../../../../components/Typography";
import { FooterStyled } from "./styles";
import variables from "../../../../utils/styles/variables";

const Footer = () => {
  return (
    <FooterStyled>
      <Typography
        css={`
          color: ${variables.ui.colors.primary};
        `}
        size="mid"
      >
        Cảm ơn bạn đã ghé thăm cửa hàng của chúng tôi . Chúng bạn một ngày tốt
        lành .
      </Typography>
    </FooterStyled>
  );
};

export default Footer;
