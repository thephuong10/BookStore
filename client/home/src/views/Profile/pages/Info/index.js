import React, { useState, useEffect } from "react";
import { FastField } from "formik";
import Input from "../../../../components/Input";
import Typography from "../../../../components/Typography";
import Button from "../../../../components/Button";
import Form from "../../../../customs/formik/Form";
import FormControl from "../../../../customs/formik/FormControl";
import formErrorMassage from "../../../../utils/formErrorMassage";
import {
  InfoLeftStyled,
  InfoRightMenuItemStyled,
  InfoRightMenuStyled,
  InfoRightStyled,
  InfoStyled,
} from "./styles";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import userSelector from "../../../../redux/selector/userSelector";
import Modal from "../../../../components/Modal";
import userApi from "../../../../apis/userApi";
import { userActions } from "../../../../redux/slice/UserSlice";
import { toastActions } from "../../../../redux/slice/ToastSlice";
import { isObject } from "../../../../utils/fun";

const fields = [
  {
    name: "fullname",
    fieldcomponent: Input,
    label: "Họ tên",
    propschildcomponent: {
      placeholder: "vd: Bành Thị Mộng Mơ",
      icon: <i className="bx bxs-user"></i>,
    },
  },
];

const validationSchema = yup.object().shape({
  fullname: yup
    .string()
    .required(formErrorMassage.required)
    .min(2, formErrorMassage.minString(2, "kí tự"))
    .max(30, formErrorMassage.minString(30, "kí tự")),
});

const Info = () => {
  const info = useSelector(userSelector.getInfo);
  return (
    <InfoStyled>
      <InfoLeft info={info} />
      <InfoRight info={info} />
    </InfoStyled>
  );
};

export default Info;

const InfoLeft = ({ info }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    fullname: info?.fullname || "",
  });
  useEffect(() => {
    isObject(info) &&
      setState(() => ({
        fullname: info.fullname,
      }));
  }, [info]);
  const hanleUpdateInfo = (values) => {
    if (values.fullname != state.fullname) {
      setLoading(() => true);
      setTimeout(() => {
        try {
          (async () => {
            const data = await userApi.updateInfo(values);
            dispatch(userActions.setInfo(values));
            setLoading(() => false);
            dispatch(
              toastActions.create({
                message: "Cập nhật thành công",
                status: "success",
              })
            );
          })();
        } catch {
          setLoading(() => false);
          setState(() => ({
            fullname: info.fullname,
          }));
          dispatch(
            toastActions.create({
              message: "Cập nhật thất bại",
              status: "danger",
            })
          );
        }
      }, 1000);
    } else {
      dispatch(
        toastActions.create({
          message: "Trước khi lưu vui lòng thay đổi thông tin",
          status: "warn",
        })
      );
    }
  };
  return (
    <>
      <InfoLeftStyled>
        <Typography
          css={`
            font-size: 18px;
            padding: 10px 0;
          `}
        >
          Thông tin cá nhân
        </Typography>
        <Form
          resetForm={false}
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={state}
          onSubmit={hanleUpdateInfo}
        >
          {fields.map((item, index) => (
            <FastField component={FormControl} key={index} {...item} />
          ))}
          <Button
            loading={loading}
            type="submit"
            css={`
              margin-top: 20px;
            `}
          >
            <Typography
              css={`
                font-size: 15px;
                line-height: 1.3;
                padding: 0;
              `}
            >
              Lưu
            </Typography>
          </Button>
        </Form>
      </InfoLeftStyled>
    </>
  );
};

// right

const fields_right = [
  {
    name: "passwordCurrent",
    fieldcomponent: Input,
    label: "Mật khẩu hiện tại",
    propschildcomponent: {
      placeholder: "vd : matkhau@123",
      type: "password",
      icon: <i className="bx bxs-lock"></i>,
    },
  },
  {
    name: "passwordNew",
    fieldcomponent: Input,
    label: "Mật khẩu mới",
    propschildcomponent: {
      placeholder: "vd : matkhau@123",
      type: "password",
      icon: <i className="bx bxs-lock"></i>,
    },
  },
  {
    name: "passwordNewConfirm",
    fieldcomponent: Input,
    label: "Nhập lại mật khẩu mới",
    propschildcomponent: {
      placeholder: "vd : matkhau@123",
      type: "password",
      icon: <i className="bx bxs-lock"></i>,
    },
  },
];

const InfoRight = ({ info }) => {
  const [open, setOpen] = useState(false);

  const [state, setState] = useState(() => ({
    initialValues: {
      passwordCurrent: "",
      passwordNew: "",
      passwordNewConfirm: "",
    },
    validationSchema: yup.object().shape({
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
    }),
    fields: [...fields_right],
  }));
  useEffect(() => {
    if (isObject(info) && info.password) {
      setState(() => ({
        initialValues: {
          passwordNew: "",
          passwordNewConfirm: "",
        },
        validationSchema: yup.object().shape({
          passwordNew: yup
            .string()
            .required(formErrorMassage.required)
            .min(2, formErrorMassage.minString(6, "kí tự"))
            .max(20, formErrorMassage.minString(20, "kí tự")),
          passwordNewConfirm: yup
            .string()
            .required(formErrorMassage.required)
            .oneOf([yup.ref("passwordNew"), ""], "Mật khẩu không trùng khớp"),
        }),
        fields: [...fields_right.slice(1)],
      }));
    }
  }, [info]);

  return (
    <>
      <InfoRightStyled>
        <Typography
          css={`
            font-size: 18px;
            padding: 10px;
          `}
        >
          Bảo mật
        </Typography>
        <InfoRightMenuStyled>
          <InfoRightMenuItemStyled>
            <Typography>
              <i className="bx bxs-lock-alt"></i>
              <span>Thiết lập mật khẩu</span>
            </Typography>
            <Button variant="outlined" onClick={() => setOpen(() => true)}>
              <Typography>Cập nhật</Typography>
            </Button>
          </InfoRightMenuItemStyled>
        </InfoRightMenuStyled>
      </InfoRightStyled>
      <Modal
        open={open}
        onClose={() => setOpen(() => false)}
        css={`
          min-width: 500px;
          padding: 25px;
          & > form {
            display: flex;
            flex-direction: column;
            padding: 10px;
          }
        `}
      >
        <UpdatePassword
          initialValues={state.initialValues}
          validationSchema={state.validationSchema}
          fields={state.fields}
        />
      </Modal>
    </>
  );
};

const UpdatePassword = ({ initialValues, validationSchema, fields }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    setLoading(() => true);
    setTimeout(() => {
      (async () => {
        try {
          const data = await userApi.updatePassword(
            values?.passwordCurrent || "",
            values.passwordNew
          );
          setLoading(() => false);
          dispatch(
            toastActions.create({
              message: "Thay đổi thành công",
              status: "success",
            })
          );
        } catch (error) {
          const { response } = error;
          const { message } = response?.data;
          setLoading(() => false);
          dispatch(
            toastActions.create({
              message: message || "Thay đổi thất bại",
              status: "danger",
            })
          );
        }
      })();
    }, 800);
  };
  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {fields.map((item, index) => (
        <FastField component={FormControl} key={index} {...item} />
      ))}
      <Button
        type="submit"
        loading={loading}
        css={`
          margin-top: 16px;
        `}
      >
        <Typography>Xác nhận</Typography>
      </Button>
    </Form>
  );
};
