import React, { useRef, useState } from "react";
import VerificationToken from "../../components/VerificationToken";
import * as yup from "yup";
import { FastField } from "formik";
import Form from "../../../../customs/formik/Form";
import formErrorMassage from "../../../../utils/formErrorMassage";
import Button from "../../../../components/Button";
import Typography from "../../../../components/Typography";
import Input from "../../../../components/Input";
import FormControl from "../../../../customs/formik/FormControl";
import { useDispatch, useSelector } from "react-redux";
import userSelector from "../../../../redux/selector/userSelector";
import { Redirect, useHistory } from "react-router-dom";
import variables from "../../../../utils/styles/variables";
import userApi from "../../../../apis/userApi";
import Component from "../../../../customs/components/Component";
import { userActions } from "../../../../redux/slice/UserSlice";
import { ForgotPasswordWrapStyled, ChangePasswordWrapStyled } from "./styles";
import Steper from "../../../../components/Steper";
const steps = ["Xác thực email", "Xác thực mã", "Đổi mật khẩu"];

const ForgotPassword = () => {
  const token = useSelector(userSelector.getToken);
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const history = useHistory();
  //const status = history.location.state?.status;
  const status = true;
  return (
    <>
      {token ? (
        <Redirect to={"/"} />
      ) : status ? (
        <ForgotPasswordWrapStyled>
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
              email={email}
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
        </ForgotPasswordWrapStyled>
      ) : (
        <Redirect to={"/xac-thuc/dang-ky"} />
      )}
    </>
  );
};

export default ForgotPassword;

const ConfirmToken = ({ email = "", changeTab }) => {
  const duration = 1 * 60 * 1000;
  const [loading, setLoading] = useState({
    confirm: false,
    sendTo: false,
  });
  const handleOnSubmit = (token) => {
    console.log(token);
    setLoading((oldValue) => ({
      ...oldValue,
      confirm: true,
    }));
    setTimeout(() => {
      // (async () => {
      //   try {
      //     const data = await userApi.signup.confirmToken({
      //       email: email,
      //       token: token,
      //     });
      //     changeTab((oldValue) => oldValue + 1);
      //   } catch {}
      // })();
      setLoading((oldValue) => ({
        ...oldValue,
        confirm: false,
      }));
      changeTab((oldValue) => oldValue + 1);
    }, 1000);
  };
  return (
    <VerificationToken
      duration={duration}
      onSubmit={handleOnSubmit}
      loadingConfirm={loading.confirm}
      loadingSendTo={loading.sendTo}
    />
  );
};
const ChangePassword = ({ email = "" }) => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef({
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .required(formErrorMassage.required)
        .min(6, formErrorMassage.minString(6, "kí tự"))
        .max(20, formErrorMassage.minString(20, "kí tự")),
    }),
    initialValues: {
      password: "",
    },
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    console.log(values);
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
    <ChangePasswordWrapStyled>
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
        Cài đặt lại mật khẩu mới của bạn
      </Typography>
      <Form
        validationSchema={formRef.current.validationSchema}
        initialValues={formRef.current.initialValues}
        onSubmit={handleSubmit}
      >
        <FastField
          component={FormControl}
          name="password"
          fieldcomponent={Input}
          label="Mật khẩu"
          propschildcomponent={{
            placeholder: "vd: abc@1234",
            type: "password",
            icon: <i className="bx bxs-lock-alt"></i>,
          }}
        />
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
    </ChangePasswordWrapStyled>
  );
};
const VerificationEmail = ({ email = "", changeTab }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const formRef = useRef({
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required(formErrorMassage.required)
        .email(formErrorMassage.email),
    }),
    initialValues: {
      email: "",
    },
  });
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    console.log(values);
    setLoading(() => true);
    setTimeout(() => {
      // (async () => {
      //   try {
      //     const data = await userApi.signup.save({
      //       email: email,
      //       ...values,
      //     });
      //     setLoading(() => false);
      //     dispatch(userActions.setToken(data.token));
      //     history.replace("/");
      //   } catch {}
      // })();
      setLoading(() => false);
      changeTab((oldValue) => oldValue + 1);
    }, 1000);
  };
  return (
    <ChangePasswordWrapStyled>
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
        Nhập thông tin email của bạn
      </Typography>
      <Form
        validationSchema={formRef.current.validationSchema}
        initialValues={formRef.current.initialValues}
        onSubmit={handleSubmit}
      >
        <FastField
          component={FormControl}
          name="email"
          fieldcomponent={Input}
          label="Email"
          propschildcomponent={{
            placeholder: "vd: banhthimongmo123@gmail.com",
            icon: <i className="bx bxl-gmail"></i>,
          }}
        />
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
            Xác nhận
          </Typography>
        </Button>
      </Form>
    </ChangePasswordWrapStyled>
  );
};
const tabs = [
  {
    tab: VerificationEmail,
    tabIndex: 0,
  },
  {
    tab: ConfirmToken,
    tabIndex: 1,
  },
  {
    tab: ChangePassword,
    tabIndex: 2,
  },
];
