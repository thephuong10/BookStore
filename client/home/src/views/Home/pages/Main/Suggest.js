import React, { useState, useEffect } from "react";
import Bookcard from "../../../../customs/components/BookCard";
import styled from "styled-components";
import Button from "../../../../components/Button";
import Grid, { GridItem } from "../../../../components/Grid";
import Section, {
  SectionFooter,
  SectionTitle,
} from "../../../../components/Section";
import { Link } from "react-router-dom";
import Typography from "../../../../components/Typography";
import bookApi from "../../../../apis/bookApi";
import paramsUrlCatalog from "../../../../constants/paramsUrlCatalog";

const suggestNavs = [
  {
    title: "Phổ biến",
    link: "pho-bien",
    active: true,
  },
  {
    title: "Xu hướng",
    link: "xu-huong",
    active: false,
  },
  // {
  //   title: "Bán chạy",
  //   link: "ban-chay",
  //   param:'top_selled',
  //   active: false,
  // },
];
const pageable = {
  paging: {
    page: 1,
    limit: 8,
  },
  sorter: {
    sortBy: "createDate",
    orderBy: "desc",
  },
};
const Suggest = () => {
  const [suggestNav, setSuggestNav] = useState(() => suggestNavs);

  const handleChangeTab = (link) => () => {
    const activeElm = suggestNav.find((item) => item.link === link);
    const activePrevElm = suggestNav.find((item) => item.active);
    if (activeElm && !activeElm.active) {
      activeElm.active = true;
      activePrevElm && (activePrevElm.active = false);
      setSuggestNav(() => [...suggestNav]);
    }
  };

  return (
    <Section>
      <SectionTitle content="Đề xuất cho bạn" center />
      <SuggestStyled>
        <SuggestNavStyled>
          {suggestNav.map((item, index) => (
            <Button
              key={index}
              active={item.active}
              variant="outlined"
              onClick={handleChangeTab(item.link)}
            >
              <Typography
                css={`
                  color: currentcolor;
                  padding: 5px;
                `}
              >
                {item.title}
              </Typography>
            </Button>
          ))}
        </SuggestNavStyled>
        <SuggestProducts
          filter={
            paramsUrlCatalog.classfy[
              suggestNav.find((item) => item.active).link
            ].value
          }
        />
      </SuggestStyled>
      <SectionFooter
        css={`
          display: flex;
          aligin-items: center;
          justify-content: center;
          padding: 20px;
        `}
      >
        {suggestNav
          .filter((item) => item.active)
          .map((item, index) => (
            <Button
              key={index}
              variant="overlay"
              css={`
                & .bx-arrow-back {
                  font-size: 20px;
                }
              `}
              endIcon={<i className="bx bx-arrow-back bx-rotate-180"></i>}
            >
              <Link to={`/c/phan-loai/${item.link}`}>
                <Typography
                  css={`
                    color: currentcolor;
                  `}
                >
                  Xem tất cả
                </Typography>
              </Link>
            </Button>
          ))}
      </SectionFooter>
    </Section>
  );
};

export default Suggest;

const SuggestProducts = ({ filter }) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    (async () => {
      const _pageable = {
        ...pageable,
        ...filter,
      };
      const data = await bookApi.getAll(_pageable);
      setBooks(() => data.data);
    })();
  }, [filter]);

  return (
    <>
      {!books.length ? (
        <></>
      ) : (
        <Grid>
          {books.map((item, index) => (
            <GridItem
              col={3}
              key={index}
              tabletCol={6}
              mobileCol={12}
              css={`
                & > a {
                  width: 100%;
                  height: 100%;
                }
              `}
            >
              <Link to={`/san-pham/${item.id}?name=${item.slug}`}>
                <Bookcard book={item} />
              </Link>
            </GridItem>
          ))}
        </Grid>
      )}
    </>
  );
};

const SuggestNavStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 0 16px;
  margin-bottom: 30px;
`;

const SuggestStyled = styled.div``;
