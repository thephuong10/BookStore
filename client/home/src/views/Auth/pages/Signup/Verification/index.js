import React, { useState } from "react";
import VerificationToken from "../../../components/VerificationToken";
import * as yup from "yup";
import { FastField } from "formik";
import Form from "../../../../../customs/formik/Form";
import formErrorMassage from "../../../../../utils/formErrorMassage";
import Button from "../../../../../components/Button";
import Typography from "../../../../../components/Typography";
import Input from "../../../../../components/Input";
import FormControl from "../../../../../customs/formik/FormControl";
import { useDispatch, useSelector } from "react-redux";
import userSelector from "../../../../../redux/selector/userSelector";
import { Redirect, useHistory } from "react-router-dom";
import variables from "../../../../../utils/styles/variables";
import userApi from "../../../../../apis/userApi";
import Component from "../../../../../customs/components/Component";
import { userActions } from "../../../../../redux/slice/UserSlice";
import { VerificationWrapStyled, CreateAccountWrapStyled } from "./styles";
import Steper from "../../../../../components/Steper";
const steps = ["Xác thực mã", "Tạo tài khoản"];

const Verification = () => {
  const token = useSelector(userSelector.getToken);
  const [activeTab, setActiveTab] = useState(0);
  const history = useHistory();
  const state = history.location.state;
  console.log(state);
  //const status = true;
  return (
    <>
      {token ? (
        <Redirect to={"/"} />
      ) : state?.status ? (
        <VerificationWrapStyled>
          <div>
            <Steper
              steps={steps}
              activeStep={activeTab}
              css={`
                justify-self: flex-start;
                border-bottom: 1px solid ${variables.ui.colors.disable};
              `}
            />
            <Component
              element={
                tabs.filter((item) => item.tabIndex === activeTab)[0].tab
              }
              duration={state?.duration}
              email={state?.email}
              changeTab={setActiveTab}
            />
            {/* <TabLoading>
        <Spinner
          css={`
            color: ${variables.ui.colors.primary};
            width: 60px;
            height: 60px;
          `}
        />
      </TabLoading> */}
          </div>
        </VerificationWrapStyled>
      ) : (
        <Redirect to={"/xac-thuc/dang-ky"} />
      )}
    </>
  );
};

export default Verification;

const ConfirmToken = ({ duration = 1 * 60 * 1000, email = "", changeTab }) => {
  const [loading, setLoading] = useState({
    confirm: false,
    sendTo: false,
  });
  const [error, setError] = useState("");
  const handleOnSubmit = (token) => {
    setLoading((oldValue) => ({
      ...oldValue,
      confirm: true,
    }));
    setTimeout(() => {
      (async () => {
        try {
          const data = await userApi.signup.confirmToken({
            email: email,
            token: token,
          });
          setLoading((oldValue) => ({
            ...oldValue,
            confirm: false,
          }));
          changeTab((oldValue) => oldValue + 1);
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
    <VerificationToken
      duration={duration}
      onSubmit={handleOnSubmit}
      loadingConfirm={loading.confirm}
      loadingSendTo={loading.sendTo}
      error={error}
    />
  );
};
const fields = [
  {
    name: "fullname",
    fieldcomponent: Input,
    label: "Họ tên",
    propschildcomponent: {
      placeholder: "vd: Bành Thị Mộng Mơ",
      //icon: EmailIcon,
    },
  },
  {
    name: "password",
    fieldcomponent: Input,
    label: "Mật khẩu",
    propschildcomponent: {
      placeholder: "vd: abc@123",
      //icon: LockIcon,
      type: "password",
    },
  },
];
const initialValues = {
  fullname: "",
  password: "",
};
const validationSchema = yup.object().shape({
  fullname: yup
    .string()
    .required(formErrorMassage.required)
    .min(2, formErrorMassage.minString(2, "kí tự"))
    .max(30, formErrorMassage.minString(30, "kí tự")),
  password: yup
    .string()
    .required(formErrorMassage.required)
    .min(6, formErrorMassage.minString(6, "kí tự"))
    .max(20, formErrorMassage.minString(20, "kí tự")),
});
const CreateAccount = ({ email = "" }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    setLoading(() => true);
    setTimeout(() => {
      (async () => {
        try {
          const data = await userApi.signup.save({
            email: email,
            ...values,
          });
          setLoading(() => false);
          dispatch(userActions.setToken(data.token));
          history.replace("/");
        } catch {}
      })();
    }, 1000);
  };
  return (
    <CreateAccountWrapStyled>
      <Typography
        size="mid"
        fullWidth
        align="center"
        css={`
          margin-top: 20px;
          color: ${variables.ui.colors.primary};
          font-weight: 600;
        `}
      >
        Cài đặt họ tên và mật khẩu của bạn
      </Typography>
      <Form
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {fields.map((item, index) => (
          <FastField component={FormControl} key={index} {...item} />
        ))}
        <Button
          loading={loading}
          css={`
            margin-top: 16px;
          `}
        >
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
      </Form>
    </CreateAccountWrapStyled>
  );
};
const tabs = [
  {
    tab: ConfirmToken,
    tabIndex: 0,
  },
  {
    tab: CreateAccount,
    tabIndex: 1,
  },
];
