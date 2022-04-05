import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  max-width: 1150px;
  padding: 0 15px;
  margin: 0 auto;
  position: relative;
  ${(props) => props.css || ""}
`;

const Container = ({ children = "", className = "", css = "" }) => {
  return (
    <Wrapper className={className} css={css}>
      {children}
    </Wrapper>
  );
};

export default Container;
