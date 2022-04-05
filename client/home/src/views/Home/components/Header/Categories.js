import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import Button from "../../../../components/Button";
import Typography from "../../../../components/Typography";
import Slick from "../../../../customs/components/Slick";
import { isObject } from "../../../../utils/fun";
import styled from "styled-components";

import categoriesApi from "../../../../apis/categoriesApi";
const slidesToShow = 6;
const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await categoriesApi.getAll();
      setCategories(() => [...data]);
    })();
  }, []);

  return (
    <CategoriesStyled>
      <Slick
        arrows={categories.length > slidesToShow ? {} : null}
        options={{
          slidesToShow: slidesToShow,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
              },
            },
          ],
        }}
      >
        {categories.map((item, index) => (
          <Route
            path={`/c/the-loai/${item.slug}`}
            key={index}
            children={({ match }) => (
              <Link to={`/c/the-loai/${item.slug}`}>
                <Button
                  variant="overlay"
                  css="width:100%;"
                  active={isObject(match)}
                >
                  <Typography
                    fullWidth
                    noWrap
                    css={`
                      color: currentcolor;
                      padding: 3px;
                      font-size: 15px;
                    `}
                  >
                    {item.name}
                  </Typography>
                </Button>
              </Link>
            )}
          />
        ))}
      </Slick>
    </CategoriesStyled>
  );
};
export default Categories;

const CategoriesStyled = styled.div`
  margin-top: 16px;
  & .slick-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    & > div {
      width: 100%;
      height: 100%;
      padding: 0 16px;
      & > a {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
