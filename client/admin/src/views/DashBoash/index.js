import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import { AlertActions } from "../../redux/slice/alert";
import Table from "../../components/Table";
import { Box, TextField, Typography } from "@mui/material";

import mixin from "../../utils/styles/mixin";
import Moment from "react-moment";
import Editor from "../../components/Editor";
import Input from "../../components/Input";
import Dialog from "../../components/Dialog";
import { dialogActions } from "../../redux/slice/dialog";
import UploadImages from "../../components/UploadImages";
import { toDateString } from "../../utils/utils";
import Timepicker from "../../custom/component/TimePicker";
import { useHistory } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";

const headData = [
  "Ảnh bìa",
  "Tên sách",
  "Tên tác giả",
  "Số lượng",
  "Giá",
  "Thể loại",
];
const ContentElm = ({ content }) => (
  <Typography
    sx={{
      fontSize: "15px",
      ...mixin.textOverFlowMultiline(2),
    }}
  >
    {content}
  </Typography>
);
const arr = [
  {
    id: 1,
    name: "Những Người Thích Đùa",
    slug: "nhung-nguoi-thich-dua",
    createDate: 1639242000000,
    price: 71000.0,
    priceOriginal: 71000.0,
    images: [
      "https://res.cloudinary.com/dcgmhtzyo/image/upload/v1639312533/bookStore/nntescbbsfnf5kb7njzy_aoks14.jpg",
    ],
    total: 50,
    pages: 294,
    width: 2,
    height: 10,
    weight: 10.0,
    publicYear: null,
    type: "trend",
    modifiedDate: null,
    modifiedBy: null,
    selled: 0,
    description: null,
    categories: [
      {
        id: 1,
        name: "Hài hước",
        slug: "hai-huoc",
        createDate: 1639242000000,
        books: null,
        modifiedDate: 1639304234437,
        modifiedBy: null,
        admin: {
          id: 1,
          user: null,
        },
      },
    ],
    author: {
      id: 4,
      name: "Azit Nêxin",
      slug: "azit-nexin",
      createDate: 1638810000000,
      books: null,
      modifiedDate: 1638810000000,
      modifiedBy: null,
      admin: null,
    },
    publicCompany: {
      id: 1,
      name: "Hà Nội",
      slug: "ha-noi",
      createDate: 1639242000000,
      books: null,
      modifiedDate: 1639242000000,
      modifiedBy: null,
      admin: null,
    },
    discount: 0.0,
    admin: null,
    rating: null,
  },
  {
    id: 2,
    name: "Nếu Adam Không Có Xương Sườn",
    slug: "neu-adam-khong-co-xuong-suon",
    createDate: 1639242000000,
    price: 57000.0,
    priceOriginal: 57000.0,
    images: [
      "https://res.cloudinary.com/dcgmhtzyo/image/upload/v1639313375/bookStore/suf6jlvnblmoavq6lrzb_obnmsz.jpg",
    ],
    total: 10,
    pages: 226,
    width: 10,
    height: 10,
    weight: 1.5,
    publicYear: null,
    type: null,
    modifiedDate: null,
    modifiedBy: null,
    selled: 0,
    description: null,
    categories: [
      {
        id: 1,
        name: "Hài hước",
        slug: "hai-huoc",
        createDate: 1639242000000,
        books: null,
        modifiedDate: 1639304234437,
        modifiedBy: null,
        admin: {
          id: 1,
          user: null,
        },
      },
    ],
    author: {
      id: 5,
      name: "Lê Văn Nghĩa",
      slug: "le-van-nghia",
      createDate: 1638810000000,
      books: null,
      modifiedDate: 1638810000000,
      modifiedBy: null,
      admin: null,
    },
    publicCompany: {
      id: 2,
      name: "Hồng đức",
      slug: "hong-duc",
      createDate: 1639242000000,
      books: null,
      modifiedDate: 1639242000000,
      modifiedBy: null,
      admin: null,
    },
    discount: 0.0,
    admin: null,
    rating: null,
  },
  {
    id: 3,
    name: "Bến Xe",
    slug: "ben-xe",
    createDate: 1639242000000,
    price: 76000.0,
    priceOriginal: 76000.0,
    images: [
      "https://res.cloudinary.com/dcgmhtzyo/image/upload/v1639313377/bookStore/mgh8pyftc3gpfoeyjl0n_v716s7.jpg",
    ],
    total: 45,
    pages: 284,
    width: 10,
    height: 10,
    weight: 1.5,
    publicYear: null,
    type: "popular",
    modifiedDate: null,
    modifiedBy: null,
    selled: 0,
    description: null,
    categories: [
      {
        id: 1,
        name: "Hài hước",
        slug: "hai-huoc",
        createDate: 1639242000000,
        books: null,
        modifiedDate: 1639304234437,
        modifiedBy: null,
        admin: {
          id: 1,
          user: null,
        },
      },
    ],
    author: {
      id: 6,
      name: "Thương Thái Vi",
      slug: "thuong-thai-vi",
      createDate: 1638810000000,
      books: null,
      modifiedDate: 1638810000000,
      modifiedBy: null,
      admin: null,
    },
    publicCompany: {
      id: 3,
      name: "Kim Đồng",
      slug: "kim-dong",
      createDate: 1639242000000,
      books: null,
      modifiedDate: 1639242000000,
      modifiedBy: null,
      admin: null,
    },
    discount: 0.0,
    admin: null,
    rating: null,
  },
  {
    id: 4,
    name: "Bến Xe",
    slug: "ben-xe",
    createDate: 1639242000000,
    price: 76000.0,
    priceOriginal: 76000.0,
    images: [
      "https://res.cloudinary.com/dcgmhtzyo/image/upload/v1639313377/bookStore/mgh8pyftc3gpfoeyjl0n_v716s7.jpg",
    ],
    total: 45,
    pages: 284,
    width: 10,
    height: 10,
    weight: 1.5,
    publicYear: null,
    type: "popular",
    modifiedDate: null,
    modifiedBy: null,
    selled: 0,
    description: null,
    categories: [
      {
        id: 1,
        name: "Hài hước",
        slug: "hai-huoc",
        createDate: 1639242000000,
        books: null,
        modifiedDate: 1639304234437,
        modifiedBy: null,
        admin: {
          id: 1,
          user: null,
        },
      },
    ],
    author: {
      id: 6,
      name: "Thương Thái Vi",
      slug: "thuong-thai-vi",
      createDate: 1638810000000,
      books: null,
      modifiedDate: 1638810000000,
      modifiedBy: null,
      admin: null,
    },
    publicCompany: {
      id: 3,
      name: "Kim Đồng",
      slug: "kim-dong",
      createDate: 1639242000000,
      books: null,
      modifiedDate: 1639242000000,
      modifiedBy: null,
      admin: null,
    },
    discount: 0.0,
    admin: null,
    rating: null,
  },
  {
    id: 5,
    name: "Bến Xe",
    slug: "ben-xe",
    createDate: 1639242000000,
    price: 76000.0,
    priceOriginal: 76000.0,
    images: [
      "https://res.cloudinary.com/dcgmhtzyo/image/upload/v1639313377/bookStore/mgh8pyftc3gpfoeyjl0n_v716s7.jpg",
    ],
    total: 45,
    pages: 284,
    width: 10,
    height: 10,
    weight: 1.5,
    publicYear: null,
    type: "popular",
    modifiedDate: null,
    modifiedBy: null,
    selled: 0,
    description: null,
    categories: [
      {
        id: 1,
        name: "Hài hước",
        slug: "hai-huoc",
        createDate: 1639242000000,
        books: null,
        modifiedDate: 1639304234437,
        modifiedBy: null,
        admin: {
          id: 1,
          user: null,
        },
      },
    ],
    author: {
      id: 6,
      name: "Thương Thái Vi",
      slug: "thuong-thai-vi",
      createDate: 1638810000000,
      books: null,
      modifiedDate: 1638810000000,
      modifiedBy: null,
      admin: null,
    },
    publicCompany: {
      id: 3,
      name: "Kim Đồng",
      slug: "kim-dong",
      createDate: 1639242000000,
      books: null,
      modifiedDate: 1639242000000,
      modifiedBy: null,
      admin: null,
    },
    discount: 0.0,
    admin: null,
    rating: null,
  },
];
const paging = {
  page: 1,
  limit: 3,
  totalPage: 9,
  totalItem: 26,
};

const Dashboash = () => {
  //const classes = useStyles();
  const history = useHistory();
  console.log("Dashboash zo");
  useEffect(() => {
    console.log("Dashboash");
    return () => {
      console.log("Dashboash end");
    };
  }, []);
  const pageable = {
    entities: arr,
    paging: {
      count: paging.totalPage,
      page: paging.page,
    },
  };
  const ChangePage = (link) => {
    history.replace(link);
  };
  return (
    <div>
      <Switch>
        <Route
          path={"/trang-chu1"}
          render={() => (
            <Page link={"/trang-chu1"} content="Page 1" onClick={ChangePage} />
          )}
        />
        <Route
          path={"/trang-chu2"}
          render={() => (
            <Page link={"/trang-chu2"} content="Page 2" onClick={ChangePage} />
          )}
        />
        <Route
          path={"/"}
          render={() => (
            <Page
              link={"/trang-chu2"}
              content="Page gốc"
              onClick={ChangePage}
            />
          )}
        />
      </Switch>
      {/* <Table
        dataGrid={{
          headData: [
            ...headData.map((item, index) => <ContentElm content={item} />),
          ],
          bodyData: bodyData(pageable.entities),
          paging: {
            ...pageable.paging,
            onchange: (page) => console.log("page", page),
            limit: {
              options: [5, 10, 25].map((item, index) => ({
                id: index,
                name: item,
                active: !index,
              })),
              onChange: (selected) => console.log("selected", selected),
            },
          },
          onDeleteRows: (ids) => console.log("ids", ids),
          onEditCell: (id) => console.log("id", id),
          checkboxSelection: true,
          eidtRow: true,
        }}
        sort={{
          options: [
            {
              title: "Tên sách",
              sortBy: "name",
            },
            {
              title: "Số lượng",
              sortBy: "total",
            },
            {
              title: "Giá",
              sortBy: "price",
            },
          ],
          onChange: (sort) => console.log("sort", sort),
        }}
        search={{
          onChange: (search) => console.log("search", search),
        }}
      /> */}
    </div>
  );
};

export default Dashboash;

const Page = ({ content, link, onClick }) => {
  useEffect(() => {
    console.log(content);
    return () => {
      console.log("end", content);
    };
  }, []);

  return (
    <Box>
      <Button onClick={() => onClick(link)}>{content}</Button>
    </Box>
  );
};

const createAcreage = (key) => {
  return key === "avatar"
    ? {
        width: 100,
        height: 100,
      }
    : {};
};

const bodyData = (arr) =>
  arr.map((item) => ({
    id: item.id,
    disable: item.id % 2 === 0,
    active: item.id % 2 === 0,
    rows: [
      {
        field: "avatar",
        renderCell: (
          <Box
            component="img"
            sx={{
              width: "62px",
              height: "62px",
              objectFit: "cover",
            }}
            src={item.images[0]}
            //src={item.avatar.url}
          ></Box>
        ),
      },
      {
        field: "name",
        renderCell: <ContentElm content={item.name} />,
      },
      {
        field: "author",
        renderCell: <ContentElm content={item.author.name} />,
      },
      {
        field: "total",
        renderCell: <ContentElm content={item.total} />,
      },
      {
        field: "price",
        renderCell: <ContentElm content={item.price} />,
      },
      {
        field: "categories",
        renderCell: (
          <ContentElm content={item.categories.map((c) => c.name).join(",")} />
        ),
      },
    ],
  }));
