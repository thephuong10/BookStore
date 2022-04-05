import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import salesApi from "../../../../apis/salesApi";
import Section, { SectionTitle } from "../../../../components/Section";
import Slick from "../../../../customs/components/Slick";
// const sales = [
//   {
//     id: 1,
//     banner:
//       "https://sachsuthattphcm.com.vn/wp-content/uploads/2018/09/banner1.jpg",
//     name: "Khuyến mãi sách 1",
//     slug: "khuyen-mai-sach-1",
//   },
//   {
//     id: 2,
//     banner:
//       "https://canhcoupon.com/images/khuyen-mai/2016/10/cam-ket-gia-tot-mua-sach-tiki-re-hon-nha-sach-tiki-banner.jpg",
//     name: "Khuyến mãi sách 2",
//     slug: "khuyen-mai-sach-2",
//   },
// ];

const Sales = () => {
  const [sales, setSales] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await salesApi.getAll({});
      setSales(() => [...data.data]);
    })();
  }, []);
  return (
    <Section>
      <SectionTitle content="khuyến mãi" center />
      <Slick
        arrowSize="mid"
        options={{
          dots: true,
        }}
      >
        {sales.map((item, index) => (
          <SaleItem key={index}>
            <Link to={`/c/khuyen-mai/${item.slug}`}>
              <img src={item.banner} />
            </Link>
          </SaleItem>
        ))}
      </Slick>
    </Section>
  );
};

export default Sales;

const SaleItem = styled.div`
  padding: 10px 20px;
  & > a {
    width: 100%;
    height: 100%;
    overflow: hidden;
    height: 390px;
    border-radius: 5px;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
