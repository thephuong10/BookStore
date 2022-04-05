import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import queryString from "query-string";
import Typography from "../../../../../components/Typography";
import { ReactSliderStyled } from "./styles";
import Button from "../../../../../components/Button";

import { formatPrice, isDecimal } from "../../../../../utils/fun";
import { setLocation } from "../../../../../utils/handleUrl";
import bookApi from "../../../../../apis/bookApi";
import paramsUrlCatalog from "../../../../../constants/paramsUrlCatalog";

const Pricefilter = () => {
  const history = useHistory();
  const [prices, setPrices] = useState([]);
  const key = history.location.pathname.split("/")[3];
  useEffect(() => {
    (async () => {
      if (history.location.pathname.includes("/c/the-loai/")) {
        const data = await bookApi.getMinMaxPriceByKey("c", key);
        setPrices(() => data[0]);
      } else if (history.location.pathname.includes("/c/khuyen-mai/")) {
        const data = await bookApi.getMinMaxPriceByKey("s", key);
        setPrices(() => data[0]);
      } else {
        const data = await bookApi.getMinMaxPriceByKey(
          "tn",
          paramsUrlCatalog.classfy[key]?.key || key
        );
        setPrices(() => data[0]);
      }
    })();
  }, [key]);

  return (
    <>
      {Array.isArray(prices) && prices.length > 1 ? (
        <PricefilterMain priceOriginal={prices} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Pricefilter;

const round = (num) => Math.round(num * 100) / 100;

const PricefilterMain = ({ priceOriginal = [] }) => {
  const history = useHistory();
  const priceParam = queryString.parse(history.location.search)?.price;

  const [percents, setPercents] = useState([0, 1]);

  const [priceSlide, setPriceSlide] = useState({
    min: 0,
    max: 0,
  });

  useEffect(() => {
    let _percents = [0, 1];
    if (
      priceParam &&
      typeof priceParam === "string" &&
      priceParam.split(",").length === 2
    ) {
      _percents = priceParam
        .split(",")
        .map((item, index) =>
          isDecimal(item)
            ? hanlePercent(priceOriginal[0], priceOriginal[1], parseFloat(item))
            : index
        );
    }
    setPercents(() => [..._percents]);
    setPriceSlide(() => ({
      min: hanlePrice(priceOriginal[0], priceOriginal[1], _percents[0]),
      max: hanlePrice(priceOriginal[0], priceOriginal[1], _percents[1]),
    }));
  }, [priceOriginal, priceParam]);

  const hanleOnChange = (values) => {
    setPriceSlide(() => ({
      min: hanlePrice(priceOriginal[0], priceOriginal[1], values[0] / 100),
      max: hanlePrice(priceOriginal[0], priceOriginal[1], values[1] / 100),
    }));
    setPercents(() => [...values.map((item) => item / 100)]);
  };

  const handleOnClick = () => {
    history.replace(
      setLocation(
        history,
        {
          key: "price",
          value: `${priceSlide.min},${priceSlide.max}`,
        },
        {
          key: "page",
          value: 1,
        }
      )
    );
  };

  return (
    <>
      <Typography
        css={`
          padding: 8px 0;
          display: block;
        `}
      >
        Lọc theo giá
      </Typography>
      <ReactSliderStyled
        value={percents.map((item) => item * 100)}
        className="horizontal-slider"
        thumbClassName="thumb-slider"
        trackClassName="thumb-track"
        onChange={hanleOnChange}
      />
      <Typography
        css={`
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          gap: 0 5px;
          padding-left: 0;
          padding-right: 0;
        `}
      >
        <span>{formatPrice(priceSlide.min) || 0}đ</span>
        <span> - </span>
        <span>{formatPrice(priceSlide.max) || 0}đ</span>
      </Typography>
      <Button
        variant="outlined"
        css={`
          border-radius: 5px;
          padding: 7px 16px;
          border-width: 1px;
        `}
        onClick={handleOnClick}
      >
        <Typography
          css={`
            font-size: 14px;
            line-height: 1;
            font-weight: 400;
            padding: 0;
          `}
        >
          Áp dụng
        </Typography>
      </Button>
    </>
  );
};

const hanlePrice = (min, max, num) => (max - min) * num + min;

const hanlePercent = (min, max, num) => (num - min) / (max - min);
