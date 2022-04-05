import { Grid, Paper, Typography, Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../components/Form";
import Input from "../../components/Input";
import accountSelector from "../../redux/selectors/accountSelector";
import { isObject } from "../../utils/utils";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LockIcon from "@mui/icons-material/Lock";

import * as yup from "yup";
import FormControl from "../../custom/formik/FormControl";
import Button from "../../components/Button";
import formErrorMassage from "../../utils/formMassage";
import { FastField } from "formik";
import variables from "../../utils/styles/variables";
import accountApi from "../../api/accountApi";
import { AlertActions } from "../../redux/slice/alert";
import { AccountActions } from "../../redux/slice/account";

const Profile = () => {
  const info = useSelector(accountSelector.getInfo);
  return (
    <Paper
      sx={{
        padding: "16px 20px",
      }}
    >
      {!isObject(info) ? (
        <></>
      ) : (
        <Grid container>
          <Grid item md={7}>
            <ProfileLeft info={info} />
          </Grid>
          <Grid item md={5}>
            <ProfileRight />
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default Profile;

const fields_left = [
  {
    name: "fullname",
    fieldcomponent: Input,
    label: "Họ tên",
    propschildcomponent: {
      placeholder: "vd: Bành Thị Mộng Mơ",
      icon: PersonIcon,
    },
  },
  {
    name: "phone",
    fieldcomponent: Input,
    label: "Số điện thoại",
    propschildcomponent: {
      placeholder: "vd: 0903900696",
      icon: LocalPhoneIcon,
    },
  },
];
const phoneRegExp = /^[0-9-+]+$/;
yup.addMethod(yup.string, "phoneNumber", function (errorMessage, name) {
  return this.test(name, errorMessage, function (value) {
    const { path, createError } = this;
    return value
      ? (value.length >= 10 && value.length <= 11 && phoneRegExp.test(value)) ||
          createError({ path, message: errorMessage })
      : true;
  });
});
const validationSchema_left = yup.object().shape({
  fullname: yup
    .string()
    .required(formErrorMassage.required)
    .min(2, formErrorMassage.minString(2, "kí tự"))
    .max(30, formErrorMassage.minString(30, "kí tự")),
  phone: yup.string().phoneNumber("Số điện thoại không hợp lệ", "phone"),
});

const ProfileLeft = ({ info }) => {
  const initialValues = {
    fullname: info?.fullname || "",
    phone: info?.phone || "",
  };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const hanleUpdateInfo = (values) => {
    if (
      values.fullname != initialValues.fullname ||
      (initialValues.fullname && values.phone)
    ) {
      setLoading(() => true);
      setTimeout(() => {
        try {
          (async () => {
            const data = await accountApi.updateInfo(values);
            dispatch(AccountActions.setInfo(values));
            setLoading(() => false);
            dispatch(
              AlertActions.showAlert({
                message: "Cập nhật thành công",
                status: "success",
              })
            );
          })();
        } catch {
          setLoading(() => false);
          dispatch(
            AlertActions.showAlert({
              message: "Cập nhật thất bại",
              status: "danger",
            })
          );
        }
      }, 800);
    } else {
      dispatch(
        AlertActions.showAlert({
          message: "Trước khi lưu vui lòng thay đổi thông tin",
          status: "warn",
        })
      );
    }
  };

  return (
    <Box
      sx={{
        padding: "16px",
        borderRight: `1px solid ${variables.colors.border}`,
        "& > form": {
          width: "100%",
          maxWidth: "520px",
          padding: "10px",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 500,
          marginBottom: "20px",
        }}
      >
        Thông tin cá nhân
      </Typography>
      <Form
        resetForm={false}
        enableReinitialize
        validationSchema={validationSchema_left}
        initialValues={initialValues}
        onSubmit={hanleUpdateInfo}
      >
        {fields_left.map((item, index) => (
          <FastField component={FormControl} key={index} {...item} />
        ))}
        <Button
          loading={loading}
          type="submit"
          sx={{
            width: "200px",
            marginTop: "20px",
          }}
        >
          Lưu
        </Button>
      </Form>
    </Box>
  );
};

const ProfileRight = () => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Box
        sx={{
          padding: "16px",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            marginBottom: "20px",
          }}
        >
          Bảo mật
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <LockIcon />
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <span>Mật khẩu</span>
              <span>**********</span>
            </Typography>
          </Box>
          <Button variant="outlined" onClick={() => setModal(() => true)}>
            Cập nhật
          </Button>
        </Box>
      </Box>
      <Modal open={modal} onClose={() => setModal(() => false)}>
        <div>
          <UpdatePassWord />
        </div>
      </Modal>
    </>
  );
};

const fields_right = [
  {
    name: "passwordCurrent",
    fieldcomponent: Input,
    label: "Mật khẩu hiện tại",
    propschildcomponent: {
      placeholder: "vd : matkhau@123",
      type: "password",
      icon: LockIcon,
    },
  },
  {
    name: "passwordNew",
    fieldcomponent: Input,
    label: "Mật khẩu mới",
    propschildcomponent: {
      placeholder: "vd : matkhau@123",
      type: "password",
      icon: LockIcon,
    },
  },
  {
    name: "passwordNewConfirm",
    fieldcomponent: Input,
    label: "Nhập lại mật khẩu mới",
    propschildcomponent: {
      placeholder: "vd : matkhau@123",
      type: "password",
      icon: LockIcon,
    },
  },
];
const validationSchema_right = yup.object().shape({
  passwordCurrent: yup
    .string()
    .required(formErrorMassage.required)
    .min(2, formErrorMassage.minString(6, "kí tự"))
    .max(20, formErrorMassage.minString(20, "kí tự")),
  passwordNew: yup
    .string()
    .required(formErrorMassage.required)
    .min(2, formErrorMassage.minString(6, "kí tự"))
    .max(20, formErrorMassage.minString(20, "kí tự")),
  passwordNewConfirm: yup
    .string()
    .required(formErrorMassage.required)
    .oneOf([yup.ref("passwordNew"), ""], "Mật khẩu không trùng khớp"),
});
const UpdatePassWord = () => {
  const dispatch = useDispatch();
  const initialValues = {
    passwordCurrent: "",
    passwordNew: "",
    passwordNewConfirm: "",
  };
  const [loading, setLoading] = useState(false);
  const hanleChangePassWord = (values) => {
    setLoading(() => true);
    setTimeout(() => {
      (async () => {
        try {
          const data = await accountApi.updatePassword(
            values.passwordCurrent,
            values.passwordNew
          );
          setLoading(() => false);
          dispatch(
            AlertActions.showAlert({
              message: "Thay đổi thành công",
              status: "success",
            })
          );
        } catch (error) {
          const { response } = error;
          const { message } = response?.data;
          setLoading(() => false);
          dispatch(
            AlertActions.showAlert({
              message: message || "Thay đổi thất bại",
              status: "danger",
            })
          );
        }
      })();
    }, 800);
  };
  return (
    <Paper
      sx={{
        position: "absolute",
        padding: "20px 0",
        top: "50%",
        left: "50%",
        width: "100%",
        maxWidth: "550px",
        transform: "translate(-50%,-50%)",
        "& > form": {
          width: "100%",
          maxWidth: "420px",
          padding: "10px",
          flexDirection: "column",
          display: "flex",
          margin: "auto",
          gap: "10px",
        },
      }}
    >
      <Form
        validationSchema={validationSchema_right}
        initialValues={initialValues}
        onSubmit={hanleChangePassWord}
      >
        {fields_right.map((item, index) => (
          <FastField component={FormControl} key={index} {...item} />
        ))}
        <Button
          loading={loading}
          type="submit"
          sx={{
            marginTop: "20px",
          }}
        >
          Lưu
        </Button>
      </Form>
    </Paper>
  );
};
