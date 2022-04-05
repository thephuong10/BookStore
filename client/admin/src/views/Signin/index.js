import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import Form from "../../components/Form";
import { FastField } from "formik";
import Input from "../../components/Input";
import FormControl from "../../custom/formik/FormControl";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import Button from "../../components/Button";
import useStyles from "./styles";
import variables from "../../utils/styles/variables";
import { ReactComponent as BookSVG } from "../../assets/svg/book.svg";
import formErrorMassage from "../../utils/formMassage";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import accountSelector from "../../redux/selectors/accountSelector";
import { AccountActions, fetchSignin } from "../../redux/slice/account";
const fields = [
  {
    name: "email",
    fieldcomponent: Input,
    propschildcomponent: {
      placeholder: "vd: banhthimongmo123@gmail.com",
      icon: EmailIcon,
      label: "Email",
    },
  },
  {
    name: "password",
    fieldcomponent: Input,
    propschildcomponent: {
      placeholder: "vd: abc@123",
      icon: LockIcon,
      label: "Mật khẩu",
      type: "password",
    },
  },
];
const initialValues = {
  email: "",
  password: "",
};
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required(formErrorMassage.required)
    .email(formErrorMassage.email),
  password: yup
    .string()
    .required(formErrorMassage.required)
    .min(6, formErrorMassage.minString(6, "kí tự"))
    .max(30, formErrorMassage.minString(30, "kí tự")),
});
const Signin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const err = useSelector(accountSelector.getError);
  const loading = useSelector(accountSelector.getLoading);
  const handleOnSubmit = (value) => {
    dispatch(AccountActions.isLoading(true));
    setTimeout(() => {
      dispatch(fetchSignin(value));
    }, 1500);
  };
  return (
    <div className={classes["wrapper"]}>
      <Paper className={classes["paper"]}>
        <Typography
          textAlign="center"
          noWrap
          variant="h5"
          component="p"
          sx={{
            color: variables.colors.primary,
            marginBottom: "2rem",
          }}
        >
          Đăng nhập
        </Typography>
        <Form
          validationSchema={validationSchema}
          initialValues={initialValues}
          className={classes["form"]}
          onSubmit={handleOnSubmit}
        >
          {fields.map((item, index) => (
            <FastField component={FormControl} key={index} {...item} />
          ))}
          {err && (
            <Typography
              sx={{
                padding: "10px 5px",
                color: "#FF0000",
              }}
            >
              Tài khoản hoặc mật khẩu không đúng
            </Typography>
          )}
          <Button
            type="submit"
            sx={{
              marginTop: "1.5rem",
            }}
            loading={loading}
          >
            Đăng nhập
          </Button>
        </Form>
      </Paper>
      <Box
        component={BookSVG}
        sx={{
          top: "35px",
          left: "30px",
          width: "200px",
          height: "200px",
        }}
        className={classes["icon"]}
      ></Box>
      <Box
        component={BookSVG}
        sx={{
          bottom: "50px",
          right: "50px",
          width: "250px",
          height: "250px",
        }}
        className={classes["icon"]}
      ></Box>
    </div>
  );
};

export default Signin;
