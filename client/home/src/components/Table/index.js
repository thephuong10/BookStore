import React, { useState } from "react";
import { CheckboxCell, TableStyled } from "./styles";

const Table = ({ headData = [], bodyData = [], ...rest }) => {
  return (
    <TableStyled {...rest}>
      <TableHead headData={headData} />
      <TableBody bodyData={bodyData} />
    </TableStyled>
  );
};

export default Table;

const TableHead = ({ headData = [] }) => {
  return (
    <thead>
      <tr>
        {headData.map((item, index) => (
          <th key={index}>{item}</th>
        ))}
      </tr>
    </thead>
  );
};

const TableBody = ({ bodyData = [] }) => {
  return (
    <tbody>
      {bodyData.map((item, i) => (
        <tr key={i}>
          {Object.keys(item).map((key, j) => (
            <th key={j}>{item[key]}</th>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
