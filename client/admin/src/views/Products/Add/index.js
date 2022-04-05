import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Field } from "formik";
import { useDispatch } from "react-redux";
import Form from "../../../components/Form";
import FormControl from "../../../custom/formik/FormControl";
import * as yup from "yup";
import useStyles from "./styles";
import formErrorMassage from "../../../utils/formMassage";
import Button from "../../../components/Button";
import { isArray, isObject } from "../../../utils/utils";
import { AlertActions } from "../../../redux/slice/alert";
import {
  fieldsNameBookForm,
  initialValuesBookForm,
} from "../../../constants/initialData/bookForm";
import Loading from "../../../components/Loading";
import bookApi from "../../../api/bookApi";
import categoriesApi from "../../../api/categoriesApi";
import authorApi from "../../../api/authorApi";
import publicCompanyApi from "../../../api/publicCompanyApi";
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
    .min(1, formErrorMassage.minString(20, "trang")),
  width: yup
    .number()
    .required(formErrorMassage.required)
    .min(1, formErrorMassage.minString(5, "cm")),
  height: yup
    .number()
    .required(formErrorMassage.required)
    .min(1, formErrorMassage.minString(5, "cm")),
  weight: yup
    .number()
    .required(formErrorMassage.required)
    .min(0.5, formErrorMassage.minString(0.5, "kg")),
});

const Add = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [fieldState, setFieldState] = useState(() => [...fieldsNameBookForm]);
  const handleSubmit = (values) => {
    setLoading(() => true);
    const entity = new FormData();
    isArray(values.images) &&
      values.images.forEach((element) => {
        entity.append("files", element.file);
      });
    entity.append(
      "entity",
      JSON.stringify({
        ...values,
        images: [],
      })
    );
    setTimeout(() => {
      (async () => {
        try {
          const data = await bookApi.save(entity);
          setLoading(() => false);
          dispatch(
            AlertActions.showAlert({
              anchorOrigin: "bottom-right",
              message: "Thêm thành công",
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
              message: message,
              status: "danger",
            })
          );
        }
      })();
    }, 300);
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
    <div className={classes["container"]}>
      {loading ? (
        <Loading
          sx={{
            borderRadius: 0,
            minHeight: "400px",
            boxShadow: "none",
          }}
        />
      ) : (
        <>
          <Typography noWrap className={classes["heading"]}>
            Thêm sản phẩm
          </Typography>
          <Form
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={initialValuesBookForm}
            onSubmit={handleSubmit}
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
              Thêm
            </Button>
          </Form>
        </>
      )}
    </div>
  );
};

export default Add;
