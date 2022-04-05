import React from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import variables from "../../utils/styles/variables";

const Paging = ({
  pageCurrent = 1,
  pageCount = 1,
  pageDisplay = 3,
  ...rest
}) => {
  const handlePageChange = (current) => {
    console.log("zo");
    const { onChange } = rest;
    onChange && onChange(current.selected + 1);
  };
  return (
    <PagingStyled
      previousLabel={<i className="bx bx-chevron-left"></i>}
      nextLabel={<i className="bx bx-chevron-right"></i>}
      pageCount={pageCount}
      pageRangeDisplayed={pageDisplay}
      onPageChange={handlePageChange}
      forcePage={pageCurrent - 1}
    />
  );
};

const PagingStyled = styled(ReactPaginate)`
  display: flex;
  align-items: center;
  padding: 10px 30px;
  justify-content: flex-end;
  .previous {
  }
  li:not(.break) {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${variables.ui.colors.primary};
    &.break {
      margin: 0 5px;
    }
    &.previous > a,
    &.next > a {
      font-size: 18px;
    }
    &.disabled > a {
      background-color: ${variables.ui.colors.disable};
      color: ${variables.text.colors.disable};
    }
    &.selected > a,
    &:not(.disabled) > a:hover {
      background-color: ${variables.ui.colors.primary};
      color: ${variables.ui.colors.white};
    }
    &.disabled > a:hover {
      cursor: not-allowed;
    }
    a {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      margin: 0 5px;
      border-radius: 50%;
      color: currentColor;
      font-size: 14px;
      cursor: pointer;
      transition: ease 0.3s;
    }
  }
`;

export default Paging;
