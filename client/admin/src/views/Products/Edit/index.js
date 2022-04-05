import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import { Field } from "formik";
import { useDispatch } from "react-redux";
import Form from "../../../components/Form";
import FormControl from "../../../custom/formik/FormControl";
import * as yup from "yup";

import useStyles from "./styles";
import formErrorMassage from "../../../utils/formMassage";
import Table from "../../../components/Table";
import Button from "../../../components/Button";
import mixin from "../../../utils/styles/mixin";
import { isNumber, isObject, isArray } from "../../../utils/utils";

import { useParams } from "react-router-dom";
import { AlertActions } from "../../../redux/slice/alert";
import Moment from "react-moment";
import {
  fieldsNameBookForm,
  initialValuesBookForm,
} from "../../../constants/initialData/bookForm";
import Loading from "../../../components/Loading";
import bookApi from "../../../api/bookApi";
import categoriesApi from "../../../api/categoriesApi";
import authorApi from "../../../api/authorApi";
import publicCompanyApi from "../../../api/publicCompanyApi";
import NotFoundEnity from "../../../assets/images/not-found-entity.png";
const createBodyTable = (obj) => [
  {
    id: 1,
    rows: Object.keys(obj).map((key) => {
      const row = {
        field: key,
      };
      const content = isObject(obj[key]) ? obj[key].content : obj[key];
      const date = isObject(obj[key]) ? obj[key].date : false;
      row["renderCell"] = <ContentElm content={content} date={date} />;
      return row;
    }),
  },
];
yup.addMethod(yup.object, "isObject", function (name, errorMessage) {
  return this.test(name, errorMessage, function (value) {
    const { path, createError } = this;
    return !isObject(value)
      ? createError({ path, message: errorMessage })
      : true;
  });
});
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(formErrorMassage.required)
    .min(2, formErrorMassage.minString(2, "kí tự"))
    .max(100, formErrorMassage.maxString(100, "kí tự")),
  priceOriginal: yup
    .number()
    .required(formErrorMassage.required)
    .min(10000, formErrorMassage.minString(10000, "vnđ"))
    .max(10000000, formErrorMassage.maxString(10000000, "vnđ")),
  total: yup
    .number()
    .required(formErrorMassage.required)
    .min(1, formErrorMassage.minString(1, "quyển"))
    .max(10000, formErrorMassage.maxString(10000, "quyển")),
  images: yup.array().min(1, "Vui lòng chọn ảnh"),
  categories: yup.array().min(1, "Vui lòng chọn thể loại"),
  author: yup.object().isObject("author", "Vui lòng chọn tác giả"),
  publicCompany: yup.object().isObject("publicCompany", "Vui lòng chọn NXB"),
  description: yup
    .string()
    .required(formErrorMassage.required)
    .min(50, formErrorMassage.minString(50, "kí tự")),
  pages: yup
    .number()
    .required(formErrorMassage.required)
    .min(20, formErrorMassage.minString(20, "trang")),
  width: yup
    .number()
    .required(formErrorMassage.required)
    .min(5, formErrorMassage.minString(5, "cm")),
  height: yup
    .number()
    .required(formErrorMassage.required)
    .min(5, formErrorMassage.minString(5, "cm")),
  weight: yup
    .number()
    .required(formErrorMassage.required)
    .min(0.5, formErrorMassage.minString(0.5, "kg")),
});
let classes;
const Edit = ({ rootUrl = "" }) => {
  classes = useStyles();
  const { bookId } = useParams();
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (bookId && isNumber(bookId)) {
      (async () => {
        try {
          const data = await bookApi.getById(bookId);
          setEntity(() => data);
          setLoading(() => false);
        } catch {
          setLoading(() => false);
        }
      })();
    }
  }, []);

  return (
    <div className={classes["container"]}>
      {loading ? (
        <Loading
          sx={{
            borderRadius: 0,
            minHeight: "400px",
            boxShadow: "none",
          }}
        />
      ) : !(isNumber(bookId) || isObject(entity)) ? (
        <div className={classes["productEmpty"]}>
          <img src={NotFoundEnity} />
          <Typography
            sx={{
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            Không có sản phẩm nào
          </Typography>
        </div>
      ) : (
        <>
          <Typography noWrap className={classes["heading"]}>
            Sửa sản phẩm
          </Typography>
          <Grid
            container
            sx={{
              marginBottom: "3rem",
            }}
          >
            <Grid item md={6} padding={1}>
              <Table
                dataGrid={{
                  headData: [
                    "Người tạo",
                    "Ngày tạo",
                    "Người sửa gần nhất",
                    "Ngày sửa gần nhất",
                  ],
                  bodyData: createBodyTable({
                    createdBy: entity.admin.user.fullname,
                    createdDate: {
                      date: true,
                      content: entity.createDate,
                    },
                    modifiedBy: {
                      date: true,
                      content: entity.modifiedBy
                        ? entity.modifiedBy.user.fullname
                        : null,
                    },
                    modifiedDate: {
                      date: true,
                      content: entity.modifiedDate,
                    },
                  }),
                }}
              />
            </Grid>
            <Grid
              padding={1}
              item
              md={6}
              sx={{
                "& > div": {
                  height: "100%",
                },
              }}
            >
              <Table
                dataGrid={{
                  headData: [
                    "Số lượng đã bán",
                    "Số lượng người đã đánh giá",
                    "Số điểm Đánh giá",
                    "Giảm giá",
                  ],
                  bodyData: createBodyTable({
                    selled: entity.selled,
                    ratingCount: entity.rating.ratingList.reduce(
                      (a, b) => a + b,
                      0
                    ),
                    star: entity.rating.ratingStar,
                    sale: entity.sale ? entity.sale.discount : 0,
                  }),
                }}
              />
            </Grid>
          </Grid>
          <EditForm
            entity={entity}
            setLoading={setLoading}
            setEntity={setEntity}
          />
        </>
      )}
    </div>
  );
};

export default Edit;

const EditForm = ({ entity, setLoading, setEntity }) => {
  const dispatch = useDispatch();
  const [fieldState, setFieldState] = useState(() => [...fieldsNameBookForm]);
  const handleSubmit = (values) => {
    const formData = new FormData();
    const req = {
      ...values,
      images: [],
      id: entity.id,
      admin: {
        id: 1,
      },
    };
    isArray(values.images) &&
      values.images.forEach((element) => {
        formData.append("files", element.file);
        req.images.push(element.src);
      });

    formData.append("entity", JSON.stringify(req));
    setLoading(() => true);
    setTimeout(() => {
      (async () => {
        try {
          const data = await bookApi.update(formData);
          setEntity(() => ({ ...data }));
          setLoading(() => false);
          dispatch(
            AlertActions.showAlert({
              anchorOrigin: "bottom-right",
              message: "cập nhật thành công",
              status: "success",
            })
          );
        } catch (error) {
          setLoading(() => false);
          const { response } = error;
          let message = "Lỗi hệ thống";
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
    }, 200);
  };
  useEffect(() => {
    var idTimeout = setTimeout(() => {
      (async () => {
        const [categories, authors, publicCompanys] = await Promise.all([
          categoriesApi.getAll(),
          authorApi.getAll(),
          publicCompanyApi.getAll(),
        ]);
        const categoriesField = fieldState.find((i) => i.name === "categories");
        const authorField = fieldState.find((i) => i.name === "author");
        const publicCompanyField = fieldState.find(
          (i) => i.name === "publicCompany"
        );
        categoriesField.propschildcomponent = {
          ...categoriesField.propschildcomponent,
          options: categories,
          disable: false,
        };
        authorField.propschildcomponent = {
          ...authorField.propschildcomponent,
          options: authors,
          disable: false,
        };
        publicCompanyField.propschildcomponent = {
          ...publicCompanyField.propschildcomponent,
          options: publicCompanys,
          disable: false,
        };
        console.log({ categoriesField, authorField, publicCompanyField });
        setFieldState(() => [...fieldState]);
      })();
      setLoading(() => false);
      clearTimeout(idTimeout);
    }, 800);
  }, []);
  return (
    <>
      <Form
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={createInitialValues(initialValuesBookForm, entity)}
        onSubmit={handleSubmit}
        resetForm={false}
      >
        {fieldState.map((item, index) => (
          <Field component={FormControl} key={index} {...item} />
        ))}
        <Button
          type="submit"
          sx={{
            width: "30%",
            margin: "auto",
            display: "flex",
            fontSize: "1rem",
          }}
        >
          Lưu
        </Button>
      </Form>
    </>
  );
};

const ContentElm = ({ content, date = false }) => (
  <Typography
    sx={{
      fontSize: "15px",
      ...mixin.textOverFlowMultiline(2),
    }}
  >
    {!content && content !== 0 ? (
      "Không có"
    ) : !date ? (
      content
    ) : (
      <Moment format="DD/MM/YYYY">{content}</Moment>
    )}
  </Typography>
);

const createInitialValues = (obj, data) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    result[key] = data[key];
  });
  console.log(result);
  return result;
};
