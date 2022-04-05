import React from "react";
import List, { ListItem } from "../../../../../components/List";
import queryString from "query-string";

import Typography from "../../../../../components/Typography";

import variables from "../../../../../utils/styles/variables";

import { useHistory } from "react-router-dom";
import { setLocation } from "../../../../../utils/handleUrl";

const RatingFilter = () => {
  const history = useHistory();
  const rating = queryString.parse(history.location.search)["rating"];

  const handleOnClick = (value) => () => {
    history.replace(
      setLocation(history, {
        key: "rating",
        value: value,
      })
    );
  };

  return (
    <List
      css={`
        padding: 0;
      `}
    >
      <Typography
        css={`
          padding: 8px 0;
        `}
      >
        Đánh giá
      </Typography>
      {Array.from(Array(5)).map((item, index) => (
        <ListItem
          key={index}
          hover={false}
          css={`
            padding: 5px;
            & > input:hover {
              cursor: pointer;
            }
          `}
        >
          <input
            type="checkbox"
            defaultChecked={rating == index + 1}
            onClick={handleOnClick(index + 1)}
          />
          <Typography
            css={`
              padding: 0;
              display: flex;
              align-items: center;
              margin-left: 5px;
              font-size: 15px;
              line-height: 1.4;
              & > i {
                margin-left: 5px;
                color: ${variables.ui.colors.yellow};
              }
            `}
          >
            <span>từ {index + 1} </span> <i className="bx bxs-star"></i>
          </Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default RatingFilter;
