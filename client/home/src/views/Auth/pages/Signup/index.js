import React, { useRef, useState } from "react";
import * as yup from "yup";
import Button from "../../../../components/Button";
import Typography from "../../../../components/Typography";
import { useHistory } from "react-router-dom";
import Form from "../../../../customs/formik/Form";
import { FastField } from "formik";
import FormControl from "../../../../customs/formik/FormControl";
import Input from "../../../../components/Input";
import {
  SignupButtonAuthsStyled,
  SignupButtonAuthStyled,
  SignupButtonsStyled,
  SignupFormStyled,
  SignupFormTitleStyled,
  SignupWrapStyled,
} from "./styles";
import formErrorMassage from "../../../../utils/formErrorMassage";
import variables from "../../../../utils/styles/variables";
import apiUrl from "../../../../constants/apiUrl";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../../redux/thunks/userThunk";
import { userActions } from "../../../../redux/slice/UserSlice";
import userSelector from "../../../../redux/selector/userSelector";
import { Redirect } from "react-router-dom";
import userApi from "../../../../apis/userApi";

const Signup = () => {
  return (
    <SignupWrapStyled>
      <SignupForm />
    </SignupWrapStyled>
  );
};

export default Signup;

const fields = [
  {
    name: "email",
    fieldcomponent: Input,
    label: "Email",
    propschildcomponent: {
      placeholder: "vd: banhthimongmo123@gmail.com",
      //icon: EmailIcon,
    },
  },
];
const initialValues = {
  email: "",
};
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required(formErrorMassage.required)
    .email(formErrorMassage.email),
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
const SignupForm = () => {
  const history = useHistory();
  const elmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const moveToSignin = () => {
    elmRef.current.classList.add("hide-from-right");
    setTimeout(() => {
      history.replace("/xac-thuc/dang-nhap");
    }, 810);
  };
  const handleSubmit = (values) => {
    setLoading(() => true);
    setTimeout(() => {
      (async () => {
        try {
          const data = await userApi.signup.confirmEmail(values.email);
          setLoading(() => false);
          history.replace("/xac-thuc/dang-ky/xac-thuc-ma", {
            ...data,
            status: true,
          });
        } catch (error) {
          const { response } = error;
          console.log(response);
          if (response && response.data) {
            setError(() => response.data.message);
          } else {
            setError(() => "Lỗi hệ thống");
          }
          setLoading(() => false);
        }
      })();
    }, 1000);
  };
  return (
    <>
      <SignupFormStyled ref={elmRef}>
        <SignupFormTitleStyled>
          <Typography size="big" align="center" fullWidth>
            Đăng Ký
          </Typography>
        </SignupFormTitleStyled>
        <Form
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {fields.map((item, index) => (
            <FastField component={FormControl} key={index} {...item} />
          ))}
          {error ? (
            <Typography
              fullWidth
              css={`
                font-size: 15px;
                line-height: 1.2;
                font-weight: 500;
                padding: 5px 5px 8px 5px;
                color: ${variables.ui.colors.danger};
              `}
            >
              {error}
            </Typography>
          ) : (
            <></>
          )}
          <Typography
            fullWidth
            css={`
              font-size: 15px;
              line-height: 1.2;
              font-weight: 400;
              padding: 5px;
              transition: ease 0.3s;
              & > span {
                display: block;
                text-align: center;
                line-height: 1.2;
                & > span:hover {
                  cursor: pointer;
                  transition: ease 0.3s;
                  color: ${variables.ui.colors.danger};
                }
              }
            `}
          >
            <span>
              Bạn đã có tài khoản ?{" "}
              <span onClick={moveToSignin}> Đăng nhập ở đây</span>
            </span>
          </Typography>

          <SignupButtonsStyled>
            <Button loading={loading} type="submit">
              <Typography
                css={`
                  font-size: 15px;
                  line-height: 1.3;
                  padding: 0;
                `}
              >
                Đăng ký
              </Typography>
            </Button>
            <Typography
              align="center"
              css={`
                margin: 10px 0;
              `}
            >
              -- Hoặc đăng ký với --
            </Typography>
            <SignupButtonAuthsStyled>
              {auths.map((item, index) => (
                <SignupButtonAuthStyled
                  href={item.link}
                  bgcolor={item.color}
                  bgcolorhover={item.colorHover}
                  key={index}
                >
                  {item.icon}
                </SignupButtonAuthStyled>
              ))}
            </SignupButtonAuthsStyled>
          </SignupButtonsStyled>
        </Form>
      </SignupFormStyled>
    </>
  );
};
