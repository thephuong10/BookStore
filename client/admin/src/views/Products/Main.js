import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Table from "../../components/Table";
import { Box, Typography } from "@mui/material";
import mixin from "../../utils/styles/mixin";
import Dialog from "../../components/Dialog";
import Loading from "../../components/Loading";
import { AlertActions } from "../../redux/slice/alert";
import bookApi from "../../api/bookApi";
import { isArray, formatPrice } from "../../utils/utils";
import ButtonIcon from "../../components/ButtonIcon";
const headData = [
  "Ảnh bìa",
  "Tên sách",
  "Tên tác giả",
  "Số lượng",
  "Giá",
  "Thể loại",
];
const _sortings = [
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
];
const ContentElm = ({ content }) => (
  <Typography
    sx={{
      ...mixin.textOverFlowMultiline(2),
    }}
  >
    {content}
  </Typography>
);

const Main = ({ rootUrl = "" }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState({
    open: false,
    message: "",
  });
  const [books, setBooks] = useState({
    loading: false,
    pageable: {
      paging: {
        page: 0,
        count: 0,
      },
      entities: [],
    },
  });
  const [pageable, setPageable] = useState({
    paging: {
      page: 1,
      limit: 5,
    },
    sorter: {},
    filters: [],
  });
  const [sortings, setSortings] = useState(() => [..._sortings]);
  const handleChangePage = (page) => {
    setPageable((oldValue) => ({
      ...oldValue,
      paging: {
        ...oldValue.paging,
        page: page,
      },
    }));
  };
  const handleSortings = (sort) => {
    if (isArray(books.pageable.entities)) {
      setPageable((oldValue) => ({
        ...oldValue,
        paging: {
          ...oldValue.paging,
          page: 1,
        },
        sorter: {
          sortBy: sort.sortBy,
          orderBy: sort.orderBy,
        },
      }));
    }
  };
  const handleChangeLimit = ({ name }) => {
    setPageable((oldValue) => ({
      ...oldValue,
      paging: {
        page: 1,
        limit: name,
      },
    }));
  };
  const handleSearch = (search) => {
    const sorter = pageable.sorter;
    setPageable((oldValue) => ({
      paging: {
        ...oldValue.paging,
        page: 1,
      },
      sorter: {},
      filters: [
        {
          key: "name",
          value: search,
          type: "%s%",
        },
      ],
    }));
    sorter && setSortings(() => [..._sortings]);
  };
  const handleDeleteEntities = (ids) => {
    setBooks((oldValue) => ({
      ...oldValue,
      loading: true,
    }));
    (async () => {
      try {
        const data = await bookApi.delete(
          ids.map((id) => books.pageable.entities.find((i) => i.id == id))
        );
        setBooks((oldValue) => ({
          ...oldValue,
          loading: false,
        }));
        setPageable((oldValue) => ({
          ...oldValue,
          paging: {
            ...oldValue.paging,
            page: 1,
          },
        }));
        dispatch(
          AlertActions.showAlert({
            anchorOrigin: "bottom-right",
            message: "Xóa thành công",
            status: "success",
          })
        );
      } catch (error) {
        setBooks((oldValue) => ({
          ...oldValue,
          loading: false,
        }));
        const { response } = error;
        let message = "Xóa không thành công";
        if (response.data.status === 403) {
          message = "Bạn không có quyền thực hiện thao này này";
        }
        dispatch(
          AlertActions.showAlert({
            anchorOrigin: "bottom-right",
            message: message,
            status: "danger",
          })
        );
      }
    })();
  };
  useEffect(() => {
    setBooks((oldValue) => ({ ...oldValue, loading: true }));
    setTimeout(() => {
      (async () => {
        try {
          const data = await bookApi.getAll(pageable);
          setBooks(() => ({
            loading: false,
            pageable: {
              paging: {
                page: data.paging.page,
                count: data.paging.totalPage,
              },
              entities: [...data.data],
            },
          }));
        } catch {
          setBooks(() => ({
            loading: false,
            pageable: {
              paging: {
                page: 0,
                count: 0,
              },
              entities: [],
            },
          }));
        }
      })();
    }, 1000);
  }, [pageable]);
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {books.loading && (
        <Loading
          sx={{
            position: "absolute",
            inset: 0,
          }}
        />
      )}
      <Box
        sx={{
          opacity: books.loading ? 0 : 1,
          backgroundColor: "#fff",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
          padding: "16px 0",
        }}
      >
        <ButtonIcon
          title="Thêm sản phẩm"
          icon={AddIcon}
          onClick={() => history.replace(`${rootUrl}/add`)}
          sx={{
            margin: "10px 18px 5px auto",
            display: "flex !important",
          }}
        />
        <Table
          dataGrid={{
            headData: [
              ...headData.map((item, index) => (
                <ContentElm key={index} content={item} />
              )),
            ],
            bodyData: createbodyData(books.pageable.entities),
            paging: {
              ...books.pageable.paging,
              onChange: handleChangePage,
            },
            onDeleteRows: handleDeleteEntities,
            onEditRow: (id) => history.replace(`${rootUrl}/edit/${id}`),
            checkboxSelection: true,
            editRow: true,
          }}
          sort={{
            options: sortings,
            onChange: handleSortings,
          }}
          search={{
            onChange: handleSearch,
          }}
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        />
      </Box>
      <Dialog
        {...dialog}
        onclose={() =>
          setDialog((prev) => ({
            ...prev,
            open: false,
            message: "",
          }))
        }
      />
    </Box>
  );
};

export default Main;

const createbodyData = (arr) =>
  arr.map((item) => ({
    id: item.id,
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
        renderCell: <ContentElm content={`${formatPrice(item.price)}đ`} />,
      },
      {
        field: "categories",
        renderCell: (
          <ContentElm content={item.categories.map((c) => c.name).join(",")} />
        ),
      },
    ],
  }));
