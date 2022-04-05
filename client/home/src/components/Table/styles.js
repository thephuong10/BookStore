import styled from "styled-components";

export const TableStyled = styled.table`
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
  thead {
    display: table-header-group;
  }
  tr {
    color: inherit;
    display: table-row;
    outline: 0;
    vertical-align: middle;
  }
  th {
    display: table-cell;
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
    vertical-align: inherit;
  }
  ${(props) => props.css || ""}
`;

export const CellCustomStyled = styled.div`
  ${(props) => props.css || ""};
`;

export const CheckboxCell = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  & > input {
    cursor: pointer;
  }
`;
