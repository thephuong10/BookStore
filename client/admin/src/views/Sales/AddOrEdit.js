import { Box, Modal, Typography, Checkbox, Paper } from "@mui/material";

import React, { useCallback, useEffect, useState, useRef } from "react";

import { useParams } from "react-router-dom";
import Form from "../../components/Form";
import { isArray, isNumber, isObject, toDateString } from "../../utils/utils";

import initialSaleForm from "../../constants/initialData/salesForm";
import FormControl from "../../custom/formik/FormControl";
import Button from "../../components/Button";
import Table from "../../components/Table";
import bookApi from "../../api/bookApi";
import { useDispatch } from "react-redux";
import mixin from "../../utils/styles/mixin";
import variables from "../../utils/styles/variables";
import { Field } from "formik";
import initialBooks from "../../constants/initialData/book";
import saleApi from "../../api/saleApi";
import { AlertActions } from "../../redux/slice/alert";
import Loading from "../../components/Loading";
const AddOrEdit = () => {
  const { saleId } = useParams();
  const [state, setState] = useState({
    entity: null,
    type: "add",
  });
  useEffect(() => {
    if (isNumber(saleId)) {
      (async () => {
        const data = await saleApi.getById(saleId);
        setState(() => ({
          entity: { ...data },
          type: "edit",
        }));
      })();
    }
  }, []);
  return (
    <Box
      sx={{
        position: "relative",
        "& > form": {
          padding: "0 50px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        },
      }}
    >
      <AddOrEditForm
        entity={state.entity}
        setStateParent={setState}
        type={state.type}
      />
    </Box>
  );
};

export default React.memo(AddOrEdit);

const AddOrEditForm = ({ entity = null, setStateParent, type }) => {
  const [initialValues, setInitialValues] = useState({
    ...initialSaleForm.values,
  });
  const [state, setState] = useState({
    loading: true,
    entities: [],
    change: false,
  });
  const dispatch = useDispatch();
  const booksRef = useRef([]);
  const handleOnCheck = useCallback((values) => {
    booksRef.current = values.map((i) => ({ id: i.id }));
  }, []);
  const handleOnSubmit = (values) => {
    setState((old) => ({
      ...old,
      loading: true,
    }));
    setTimeout(() => {
      (async () => {
        const formData = new FormData();
        formData.append(
          "entity",
          JSON.stringify({
            ...values,
            id: entity?.id || null,
            books: booksRef.current,
            banner: null,
          })
        );
        try {
          let _entity = null;

          if (type === "edit") {
            if (isObject(values.banner[0]) && values.banner[0].file) {
              formData.append("file", values.banner[0].file);
            }
            const data = await saleApi.update(formData);
            _entity = { ...data };
          } else {
            formData.append("file", values.banner[0].file);
            const data = await saleApi.save(formData);
          }

          const _data = await bookApi.getAll({
            paging: null,
          });
          setState((old) => {
            let result = [..._data.data];
            if (isObject(_entity)) {
              result = result.map((item) => ({
                ...item,
                active: entity.books.find((i) => i.id === item.id)
                  ? true
                  : false,
                disable:
                  !entity.books.find((i) => i.id === item.id) &&
                  item.discount !== 0
                    ? true
                    : false,
              }));
            } else {
              result = [..._data.data].map((i) => ({
                ...i,
                active: false,
                disable: i.discount > 0,
              }));
            }
            return {
              ...old,
              loading: false,
              entities: result,
            };
          });
          dispatch(
            AlertActions.showAlert({
              anchorOrigin: "bottom-right",
              message: `${type === "edit" ? "Sửa" : "Thêm"} thành công`,
              status: "success",
            })
          );
          setStateParent((old) => ({
            ...old,
            entity: _entity,
          }));
        } catch (error) {
          setState((old) => ({
            ...old,
            loading: false,
          }));
          const { response } = error;
          let message = `${isObject(entity) ? "Sửa" : "Thêm"} thất bại`;
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
          setStateParent((oldValue) => ({ ...oldValue }));
        }
      })();
    }, 1000);
  };
  useEffect(() => {
    setState((old) => ({
      ...old,
      loading: true,
    }));
    setTimeout(() => {
      (async () => {
        try {
          const data = await bookApi.getAll({
            paging: null,
          });
          setState((old) => ({
            ...old,
            entities: [...data.data].map((i) => ({
              ...i,
              active: false,
              disable: i.discount > 0,
            })),
            change: true,
            loading: false,
          }));
        } catch {
          setState((old) => ({
            ...old,
            loading: false,
          }));
        }
      })();
    }, 500);
  }, []);
  useEffect(() => {
    if (isObject(entity)) {
      setInitialValues(() => ({
        name: entity.name,
        discount: entity.discount,
        banner: [entity.banner],
        startTime: entity.startTime,
        endTime: entity.endTime,
      }));
    }
    if (state.change && isObject(entity)) {
      setState((old) => ({
        ...old,
        change: false,
        entities: old.entities.map((item) => ({
          ...item,
          active: entity.books.find((i) => i.id === item.id) ? true : false,
          disable:
            !entity.books.find((i) => i.id === item.id) && item.discount !== 0
              ? true
              : false,
        })),
      }));
    }
  }, [entity, state.change]);

  return (
    <>
      {state.loading ? (
        <Loading
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
          }}
        />
      ) : (
        <Form
          enableReinitialize
          resetForm={isObject(entity)}
          initialValues={initialValues}
          validationSchema={initialSaleForm.validate}
          onSubmit={handleOnSubmit}
        >
          {initialSaleForm.fields.map((item, index) => (
            <Field component={FormControl} key={index} {...item} />
          ))}
          <ProductsApply onCheck={handleOnCheck} entities={state.entities} />
          <Button
            type="submit"
            sx={{
              marginTop: "20px",
            }}
          >
            {isObject(entity) ? "Lưu" : "Thêm"}
          </Button>
        </Form>
      )}
    </>
  );
};
const ContentElm = ({ content }) => (
  <Typography
    sx={{
      ...mixin.textOverFlowMultiline(2),
    }}
  >
    {content}
  </Typography>
);
const headData = ["Hình ảnh", "Tên", "Thể loại", "Giá", "Số lượng"];

const ProductsApply = ({ onCheck, entities }) => {
  const [state, setState] = useState({
    entities: [],
    filters: [],
    checkAll: false,
  });
  useEffect(() => {
    if (isArray(entities)) {
      const result = entities.map((item) => ({
        ...item,
      }));
      setState((oldValue) => ({
        ...oldValue,
        entities: [...result],
        filters: [...result.map((i) => ({ ...i }))],
        checkAll: result.every((i) => i.active && !i.disable),
      }));
    }
  }, [entities]);
  const handleSearch = (search) => {
    setState((oldValue) => ({
      ...oldValue,
      filters: [
        ...state.entities.filter((i) =>
          i.name.toLowerCase().includes(search.toLowerCase())
        ),
      ],
    }));
  };
  const handleCheckAll = () => {
    const _checkAll = !state.checkAll;
    const result = [...state.entities].map((i) => ({
      ...i,
      active: !i.disable ? _checkAll : i.active,
    }));
    setState((oldValue) => ({
      ...oldValue,
      entities: result,
      filters: [...state.filters].map((i) => ({
        ...i,
        active: !i.disable ? _checkAll : i.active,
      })),
      checkAll: _checkAll,
    }));
    onCheck([...result.filter((i) => i.active && !i.disable)]);
  };
  const handleOnCheck = (id) => () => {
    const currentRoot = state.entities.find((i) => i.id === id);
    const current = state.filters.find((i) => i.id === id);
    currentRoot.active = !currentRoot.active;
    current.active = !current.active;

    setState((oldValue) => ({
      ...oldValue,
      entities: [...state.entities],
      filters: [...state.filters],
      checkAll: state.entities.every((i) => i.active && !i.disable),
    }));
    onCheck([...state.entities.filter((i) => i.active && !i.disable)]);
  };
  return (
    <Box
      sx={{
        padding: "16px 0",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: "1.1rem",
          fontWeight: 500,
          marginBottom: "5px",
        }}
      >
        Chọn các mặt hàng sẽ được áp dụng cho đợt khuyến mãi
      </Typography>
      <Box
        sx={{
          borderRadius: "5px",
          border: `2px solid ${variables.colors.border}`,
          padding: "10px 20px",
        }}
      >
        <Table
          dataGrid={{
            headData: [
              <Checkbox checked={state.checkAll} onClick={handleCheckAll} />,
              ...headData.map((item, index) => (
                <ContentElm key={index} content={item} />
              )),
            ],
            bodyData: createbodyData(state.filters, handleOnCheck),
          }}
          search={{
            onChange: handleSearch,
            sx: {
              marginLeft: "auto",
            },
          }}
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            // maxHeight: "500px !important",
          }}
        />
      </Box>
    </Box>
  );
};

const createbodyData = (arr, onCheck) => {
  return arr.map((item) => ({
    id: item.id,
    rows: [
      {
        field: "checkbox",
        renderCell: (
          <Checkbox
            checked={item.active}
            disabled={item.disable}
            onChange={onCheck(item.id)}
          />
        ),
      },
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
        field: "categories",
        renderCell: (
          <ContentElm content={item.categories.map((c) => c.name).join(",")} />
        ),
      },
      {
        field: "price",
        renderCell: <ContentElm content={item.price} />,
      },
      {
        field: "total",
        renderCell: <ContentElm content={item.total} />,
      },
    ],
  }));
};
