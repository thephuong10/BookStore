import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Typography from "../../../../../components/Typography";
import Grid, { GridItem } from "../../../../../components/Grid";
import Bookcard from "../../../../../customs/components/BookCard";
import { ProductEmptyStyled } from "./styles";
import Paging from "../../../../../customs/components/Paging";

import { addParamsLocation } from "../../../../../utils/handleUrl";

import { isArray, isObject } from "../../../../../utils/fun";

import bookApi from "../../../../../apis/bookApi";
import Loading from "../../../../../components/Loading";
import Sorter from "./Sorter";
import ProductEmptyImage from "../../../../../assets/images/product-empty.png";

const Base = ({ title, params }) => {
  const [loading, setLoading] = useState(true);
  const handleLoading = (status) => {
    setLoading(() => status);
  };
  return (
    <div>
      <Typography
        size="mid"
        css={`
          font-size: 24px;
          margin-left: 15px;
        `}
      >
        {title}
      </Typography>
      <ProductMain loading={handleLoading} params={params} />
      {loading && <Loading />}
    </div>
  );
};

export default React.memo(Base);

const ProductMain = ({ loading, params }) => {
  const history = useHistory();
  const [state, setState] = useState(() => ({
    paging: {
      page: 1,
      count: 0,
    },
    entities: [],
  }));
  useEffect(() => {
    loading(true);
    setTimeout(() => {
      (async () => {
        try {
          const data = await bookApi.getAll(params);
          setState(() => ({
            paging: {
              page: data.paging.page,
              count: data.paging.totalPage,
            },
            entities: [...data.data],
          }));
          loading(false);
        } catch {
          loading(false);
        }
      })();
    }, 800);
  }, [params]);
  const handleChangePage = (page) => {
    history.location = {
      ...history.location,
      search: addParamsLocation(history.location.search, [
        {
          key: "page",
          value: page,
        },
      ]),
    };
    history.replace(history.location);
  };
  return (
    <>
      {!isArray(state.entities) ? (
        <ProductEmpty />
      ) : (
        <>
          <Sorter />
          <Grid
            css={`
              margin-bottom: 20px;
            `}
          >
            {state.entities.map((item, index) => (
              <GridItem
                col={4}
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
          {isObject(state.paging) && (
            <Paging
              pageCurrent={state.paging.page}
              pageCount={state.paging.count}
              pageDisplay={3}
              onChange={handleChangePage}
            />
          )}
        </>
      )}
    </>
  );
};

const ProductEmpty = () => {
  return (
    <ProductEmptyStyled>
      <img src={ProductEmptyImage} alt="empty" />
      <Typography size="mid">Không có sản phẩm nào thỏa yêu cầu</Typography>
    </ProductEmptyStyled>
  );
};
