import React from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import Button from "../../../../../components/Button";
import Typography from "../../../../../components/Typography";
import { ProductsSorterStyled } from "./styles";
import { setLocation } from "../../../../../utils/handleUrl";
const ORDERES_BY = [
  {
    content: "Giá thấp",
    value: "asc",
  },
  {
    content: "Giá cao",
    value: "desc",
  },
];
const SORT_BY = {
  key: "sortBy",
  value: "price",
};
const Sorter = () => {
  const history = useHistory();
  const { sortBy, orderBy } = queryString.parse(history.location.search);
  const handleSort = (orderBy) => () => {
    history.replace(
      setLocation(
        history,
        {
          ...SORT_BY,
        },
        {
          key: "orderBy",
          value: orderBy,
        }
      )
    );
  };
  return (
    <ProductsSorterStyled>
      {ORDERES_BY.map((item, index) => (
        <Button
          key={index}
          variant="outlined"
          active={sortBy === SORT_BY["value"] && orderBy === item.value}
          onClick={handleSort(item.value)}
        >
          <Typography
            css={`
              padding: 3px 0;
              font-size: 15px;
              font-weight: 400;
              line-height: 1.1;
            `}
          >
            {item.content}
          </Typography>
        </Button>
      ))}
    </ProductsSorterStyled>
  );
};

export default Sorter;
