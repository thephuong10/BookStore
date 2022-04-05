import React from "react";
import Typography from "../../../../../components/Typography";
import { HeroContent, HeroIcons, HeroImage, Wrapper } from "./styles";
import HeroPoster from "../../../../../assets/images/hero-image.png";
import Section from "../../../../../components/Section";
import mixin from "../../../../../utils/styles/mixin";

const Hero = () => {
  return (
    <Section>
      <Wrapper>
        <HeroContent>
          <Typography
            size="big"
            css={`
              font-size: 32px;
              margin-bottom: 30px;
              font-weight: 700;
              ${mixin.breakPoint(
                "tablet",
                `
                margin-top: 20px;
                margin-bottom: 10px;
              `
              )}
            `}
          >
            Thỏa thích lựa chọn sách mà bạn muốn tìm kiếm tại đây.
          </Typography>
          <Typography size="mid">
            Đằng sau sự thành công công của một người đàn ông, là hình dáng của
            một người phụ nữ. Còn đằng sau sự thành công của bất kì ai là ít
            nhất một cuốn sách, hay cả một giá sách..
          </Typography>
          <HeroIcons>
            <span className="hero-icon">
              <span className="hero-icon-arrows">
                <span></span>
                <span></span>
              </span>
              <span className="hero-icon-line"></span>
            </span>
          </HeroIcons>
        </HeroContent>
        <HeroImage>
          <img src={HeroPoster} alt="hero-img" />
        </HeroImage>
      </Wrapper>
    </Section>
  );
};

export default Hero;
