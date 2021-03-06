import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import formErrorMassage from "../../../../utils/formErrorMassage";
import { FastField } from "formik";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import FormControl from "../../../../customs/formik/FormControl";
import queryString from "query-string";
import {
  SigninButtonAuthsStyled,
  SigninButtonAuthStyled,
  SigninButtonsStyled,
  SigninContentStyled,
  SigninFormStyled,
  SigninFormTitleStyled,
  SigninWrapStyled,
} from "./styles";
import Form from "../../../../customs/formik/Form";
import Typography from "../../../../components/Typography";
import apiUrl from "../../../../constants/apiUrl";
import { useHistory, Redirect } from "react-router-dom";
import variables from "../../../../utils/styles/variables";
import userSelector from "../../../../redux/selector/userSelector";
import { userActions } from "../../../../redux/slice/UserSlice";
import { fetchUser } from "../../../../redux/thunks/userThunk";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const emailRegExp = /^\w+@[a-zA-Z_]+?\.com$/;
yup.addMethod(yup.string, "emailOrPhoneNumber", function () {
  return this.test({
    message: formErrorMassage.phoneNumber,
    test: (value) => {
      value = value.trim();
      if (
        (phoneRegExp.test(value) && value.length >= 10 && value.length <= 11) ||
        emailRegExp.test(value)
      ) {
        return true;
      }
      return false;
    },
  });
});

//const regex = ;
const Signin = () => {
  return (
    <SigninWrapStyled>
      <SigninForm />
      <SigniContent />
    </SigninWrapStyled>
  );
};

export default Signin;

const fields = [
  {
    name: "email",
    fieldcomponent: Input,
    label: "Email",
    propschildcomponent: {
      placeholder: "vd: banhthimongmo123@gmail.com",
      icon: <i className="bx bxl-gmail"></i>,
    },
  },
  {
    name: "password",
    fieldcomponent: Input,
    label: "M???t kh???u",
    propschildcomponent: {
      placeholder: "vd: abc@123",
      icon: <i className="bx bxs-lock-alt"></i>,
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
    .min(6, formErrorMassage.minString(6, "k?? t???"))
    .max(30, formErrorMassage.minString(30, "k?? t???")),
});

const auths = [
  {
    icon: <i className="bx bxl-facebook"></i>,
    color: "#129AF6",
    colorHover: "#3b5998",
    link: apiUrl.auth.facebook,
  },
  {
    icon: <i className="bx bxl-google-plus"></i>,
    color: "#DB4437",
    colorHover: "#a83127",
    link: apiUrl.auth.google,
  },
];

const SigninForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector(userSelector.getAuth);
  const err = queryString.parse(history.location.search)?.err;
  const elmRef = useRef();
  const moveToSignup = () => {
    elmRef.current.classList.add("hide-from-left");
    setTimeout(() => {
      history.replace("/xac-thuc/dang-ky");
    }, 810);
  };
  const hanleSignin = (values) => {
    dispatch(userActions.setAuthLoading(true));
    setTimeout(() => {
      dispatch(fetchUser.signin(values));
      dispatch(userActions.setAuthLoading(false));
    }, 1500);
  };
  return (
    <>
      {token ? (
        <Redirect to={"/"} />
      ) : (
        <SigninFormStyled ref={elmRef}>
          <SigninFormTitleStyled>
            <Typography size="big" align="center" fullWidth>
              ????ng nh???p
            </Typography>
          </SigninFormTitleStyled>
          <Form
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={hanleSignin}
          >
            {fields.map((item, index) => (
              <FastField component={FormControl} key={index} {...item} />
            ))}
            {!error && !err ? (
              <></>
            ) : (
              <Typography
                fullWidth
                css={`
                  font-size: 15px;
                  color: ${variables.ui.colors.danger};
                  line-height: 1.2;
                  padding: 5px;
                `}
              >
                {err || error}
              </Typography>
            )}
            <Typography
              fullWidth
              css={`
                font-size: 15px;
                line-height: 1.2;
                font-weight: 400;
                padding: 5px;
                transition: ease 0.3s;
                cursor: pointer;
                & > span {
                  display: block;
                  text-align: center;
                  line-height: 1.2;
                  & > span:hover {
                    transition: ease 0.3s;
                    color: ${variables.ui.colors.danger};
                  }
                }
              `}
            >
              <span>
                B???n ch??a c?? t??i kho???n ?{" "}
                <span onClick={moveToSignup}>????ng k?? ??? ????y</span>
              </span>
              <span>
                <span>Qu??n m???t kh???u</span>
              </span>
            </Typography>
            <SigninButtonsStyled>
              <Button type="submit" loading={loading}>
                <Typography
                  css={`
                    font-size: 15px;
                    line-height: 1.3;
                    padding: 0;
                  `}
                >
                  ????ng nh???p
                </Typography>
              </Button>
              <Typography
                align="center"
                css={`
                  margin: 10px 0;
                `}
              >
                -- Ho???c ????ng nh???p v???i --
              </Typography>
              <SigninButtonAuthsStyled>
                {auths.map((item, index) => (
                  <SigninButtonAuthStyled
                    href={item.link}
                    bgcolor={item.color}
                    bgcolorhover={item.colorHover}
                    key={index}
                  >
                    {item.icon}
                  </SigninButtonAuthStyled>
                ))}
              </SigninButtonAuthsStyled>
            </SigninButtonsStyled>
          </Form>
        </SigninFormStyled>
      )}
    </>
  );
};

const SigniContent = () => {
  return (
    <SigninContentStyled>
      <img
        src="https://o.remove.bg/downloads/643e8443-ae12-4957-b7dd-dfe6923b6b40/0ddb1baf19c21a7b223ddcafac0395ae-removebg-preview.png"
        alt=""
      />
    </SigninContentStyled>
  );
};
