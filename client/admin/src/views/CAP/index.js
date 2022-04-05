import React, { useCallback, useEffect, useState } from "react";
import useStyles from "./styles";
import Table from "../../components/Table";
import { Typography, Box, Grid, Paper, Modal } from "@mui/material";
import ButtonIcon from "../../components/ButtonIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import categoriesApi from "../../api/categoriesApi";
import authorApi from "../../api/authorApi";
import publicCompanyApi from "../../api/publicCompanyApi";
import Form from "../../components/Form";
import formErrorMassage from "../../utils/formMassage";
import * as yup from "yup";
import { FastField } from "formik";
import FormControl from "../../custom/formik/FormControl";
import Input from "../../components/Input";
import Button from "../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import { isObject } from "../../utils/utils";
import mixin from "../../utils/styles/mixin";
import { AlertActions } from "../../redux/slice/alert";
import { useDispatch } from "react-redux";
// CAP : Categories Author PublicCompany
let classes;

const TYPE_CASE = {
  authors: "authors",
  categories: "categories",
  publicCompany: "publicCompany",
};

const CAP = () => {
  classes = useStyles();
  const [state, setState] = useState(() => ({
    [TYPE_CASE["categories"]]: {
      title: "Thể Loại",
      entities: [],
      filter: [],
    },
    [TYPE_CASE["authors"]]: {
      title: "Tác Giả",
      entities: [],
      filter: [],
    },
    [TYPE_CASE["publicCompany"]]: {
      title: "Nhà Xuất Bản",
      entities: [],
      filter: [],
    },
  }));
  useEffect(() => {
    (async () => {
      const data = await Promise.all([
        categoriesApi.getAll(),
        authorApi.getAll(),
        publicCompanyApi.getAll(),
      ]);
      data.forEach((item, index) => {
        state[Object.keys(state)[index]].entities = item;
      });
      setState(() => ({ ...state }));
    })();
  }, []);

  return (
    <div className={classes["wrapper"]}>
      <Grid container spacing={2}>
        {Object.keys(state).map((key, index) => (
          <Grid item md={6} key={index}>
            <Main {...state[key]} setState={setState} type={key} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CAP;

const headData = ["Tên", "Thao tác"];

const ContentElm = ({ content, sx = {} }) => (
  <Typography
    sx={{
      ...mixin.textOverFlowMultiline(2),
      ...sx,
    }}
  >
    {content}
  </Typography>
);
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(formErrorMassage.required)
    .min(2, formErrorMassage.minString(2, "kí tự"))
    .max(100, formErrorMassage.maxString(100, "kí tự")),
});

const Main = React.memo(({ entities = [], title, type, setState }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(() => ({
    open: false,
    entity: null,
  }));
  const handleOnEdit = (id) => () => {
    setModal(() => ({
      open: true,
      entity: entities.find((i) => i.id == id),
    }));
  };
  const handleOnRemove = useCallback(
    (id) => () => {
      (async () => {
        try {
          switch (type) {
            case TYPE_CASE["categories"]:
              await categoriesApi.remove(id);
              break;
            case TYPE_CASE["authors"]:
              await authorApi.remove(id);
              break;
            case TYPE_CASE["publicCompany"]:
              await authorApi.remove(id);
              break;
            default:
              break;
          }
          setState((oldValue) => ({
            ...oldValue,
            [type]: {
              ...oldValue[type],
              entities: oldValue[type].entities.filter((i) => i.id != id),
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
          const { response } = error;
          let message = response ? response.data.message : "Xóa Thành Công";
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
    },
    []
  );
  const handleOnAdd = () => {
    setModal(() => ({
      open: true,
      entity: null,
    }));
  };

  const handleOnSearch = useCallback((search) => {
    setState((oldValue) => ({
      ...oldValue,
      [type]: {
        ...oldValue[type],
        filter: oldValue[type].entities.filter(
          (i) => i.name.toLowerCase() === search.toLowerCase()
        ),
      },
    }));
  }, []);
  const handleOnSubmit = useCallback((values, id, _type) => {
    (async () => {
      try {
        if (_type == "add") {
          let data;
          switch (type) {
            case TYPE_CASE["categories"]:
              data = await categoriesApi.save(values.name);
              break;
            case TYPE_CASE["authors"]:
              data = await authorApi.save(values.name);
              break;
            case TYPE_CASE["publicCompany"]:
              data = await publicCompanyApi.save(values.name);
              break;
            default:
              data = null;
              break;
          }
          setState((oldValue) => ({
            ...oldValue,
            [type]: {
              ...oldValue[type],
              entities: [...oldValue[type].entities, { ...data }],
            },
          }));
        } else {
          let data;
          switch (type) {
            case TYPE_CASE["categories"]:
              data = await categoriesApi.update({ ...values, id: id });
              break;
            case TYPE_CASE["authors"]:
              data = await authorApi.update({ ...values, id: id });
              break;
            case TYPE_CASE["publicCompany"]:
              data = await publicCompanyApi.update({ ...values, id: id });
              break;
            default:
              data = null;
              break;
          }
          setState((oldValue) => {
            const current = oldValue[type].entities.find((i) => i.id == id);

            current && (current.name = data.name);
            return {
              ...oldValue,
            };
          });
        }
        dispatch(
          AlertActions.showAlert({
            anchorOrigin: "bottom-right",
            message: `${_type === "add" ? "Thêm" : "Cập nhật"} thành công`,
            status: "success",
          })
        );
      } catch {
        dispatch(
          AlertActions.showAlert({
            anchorOrigin: "bottom-right",
            message: `${_type === "add" ? "Thêm" : "Cập nhật"} thất bại`,
            status: "danger",
          })
        );
      }
      setModal(() => ({
        open: false,
        entity: null,
      }));
    })();
  }, []);
  const handleOnClose = () => {
    setModal(() => ({
      open: false,
      entity: null,
    }));
  };
  return (
    <Paper className={classes["inner"]}>
      <div className={`${classes["inner"]}-top`}>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>
        <ButtonIcon title="Thêm" icon={AddIcon} onClick={handleOnAdd} />
      </div>
      <Table
        dataGrid={{
          headData: headData.map((item, index) => (
            <ContentElm
              key={index}
              content={item}
              sx={{
                textAlign: index === 0 ? "left" : "right",
              }}
            />
          )),
          bodyData: createbodyData(entities, handleOnEdit, handleOnRemove),
          sx: {
            overflowY: "auto",
            maxHeight: "350px",
          },
        }}
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          "& [class*='makeStyles-tableEmpty']": {
            "& > img": {
              width: "150px",
              height: "100px",
            },
            "& > .MuiTypography-root": {
              fontSize: "1rem",
            },
          },
        }}
        search={{
          onChange: handleOnSearch,
          sx: {
            width: "100%",
            flexBasis: "100% !important",
            maxWidth: "100% !important",
          },
        }}
      />
      <FormCAP {...modal} onSubmit={handleOnSubmit} onClose={handleOnClose} />
    </Paper>
  );
});

const FormCAP = React.memo(({ open, entity, onSubmit, onClose }) => {
  const [loading, setLoading] = useState(false);
  const handlOnSubmit = (values) => {
    setLoading(() => true);
    setTimeout(() => {
      onSubmit(
        values,
        isObject(entity) ? entity.id : null,
        isObject(entity) ? "update" : "add"
      );
    }, 800);
  };
  useEffect(() => {
    !open && loading && setLoading(() => false);
  }, [open]);
  return (
    <Modal open={open} onClose={onClose}>
      <Paper className={classes["form"]}>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "16px",
          }}
        >
          {isObject(entity) ? "Cập nhật" : "Thêm mới"}
        </Typography>
        <Form
          enableReinitialize
          onSubmit={handlOnSubmit}
          initialValues={{
            name: entity?.name || "",
          }}
          validationSchema={validationSchema}
        >
          <FastField
            component={FormControl}
            name="name"
            fieldcomponent={Input}
            label="Tên"
            propschildcomponent={{ placeholder: "Nhập nội dung" }}
          />
          <Button loading={loading} type="submit">
            Lưu
          </Button>
        </Form>
      </Paper>
    </Modal>
  );
});

const createbodyData = (arr, callbackEdit, callbackRemove) =>
  arr.map((item) => ({
    id: item.id,
    rows: [
      {
        field: "name",
        renderCell: <ContentElm content={item.name} />,
      },
      {
        field: "actions",
        renderCell: (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <ButtonIcon
              title="Chỉnh sửa"
              icon={EditIcon}
              onClick={callbackEdit(item.id)}
              sx={{
                width: "35px !important",
                height: "35px !important",
                "& > svg": {
                  width: "22px !important",
                  height: "22px !important",
                },
              }}
            />
            <ButtonIcon
              title="Xóa"
              color="danger"
              icon={DeleteIcon}
              onClick={callbackRemove(item.id)}
              sx={{
                width: "35px !important",
                height: "35px !important",
                "& > svg": {
                  width: "22px !important",
                  height: "22px !important",
                },
              }}
            />
          </Box>
        ),
      },
    ],
  }));
