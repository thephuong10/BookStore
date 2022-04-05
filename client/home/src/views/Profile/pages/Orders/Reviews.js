import React, { useEffect, useState } from "react";
import { FastField } from "formik";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import Textarea from "../../../../components/Textarea";
import Typography from "../../../../components/Typography";
import Form from "../../../../customs/formik/Form";
import FormControl from "../../../../customs/formik/FormControl";
import formErrorMassage from "../../../../utils/formErrorMassage";
import * as yup from "yup";
import styled from "styled-components";
import variables from "../../../../utils/styles/variables";
import mixin from "../../../../utils/styles/mixin";
import userApi from "../../../../apis/userApi";
import UploadImages from "../../../../components/UploadImages";
import { useDispatch } from "react-redux";
import { toastActions } from "../../../../redux/slice/ToastSlice";
import { isArray } from "../../../../utils/fun";

const Stars = ({ onChange, value = 0 }) => {
  const [stars, setStars] = useState(() =>
    Array.from(Array(5)).map((item, index) => ({
      key: 4 - index,
      active: 5 - value === index,
    }))
  );
  useEffect(() => {
    setStars((prev) =>
      prev.map((item, index) => ({
        ...item,
        active: 5 - value === index,
      }))
    );
  }, [value]);
  const handleOnChange = (key) => () => {
    const activeElm = stars.find((i) => i.active);
    const elm = stars.find((i) => i.key === key);
    if (activeElm) {
      if (activeElm.key === key) {
        activeElm.active = !activeElm.active;
      } else {
        activeElm.active = false;
        elm.active = true;
      }
    } else {
      elm.active = true;
    }
    const number = stars.find((i) => i.active);
    onChange && onChange(number ? number.key + 1 : 0);
    setStars(() => [...stars]);
  };
  return (
    <StarStyled>
      {stars.map((item) => (
        <span
          key={item.key}
          className={`${item.active ? "active" : ""}`}
          onClick={handleOnChange(item.key)}
        >
          <i class="bx bxs-star"></i>
        </span>
      ))}
    </StarStyled>
  );
};

const fields = [
  { name: "star", fieldcomponent: Stars, propschildcomponent: {} },
  {
    name: "content",
    fieldcomponent: Textarea,
    label: "Nhận xét của bạn",
    propschildcomponent: {
      placeholder: "Nhập nội dung",
    },
  },
  {
    name: "images",
    fieldcomponent: UploadImages,
    label: "Những hình ảnh liên quan (tối đa 4 ảnh)",
    propschildcomponent: {
      max: 4,
    },
  },
];
const initialValues = {
  star: 0,
  content: "",
  images: [],
};
const validationSchema = yup.object().shape({
  content: yup
    .string()
    .required(formErrorMassage.required)
    .min(10, formErrorMassage.minString(10, "kí tự"))
    .max(200, formErrorMassage.minString(200, "kí tự")),
  star: yup
    .number()
    .required("Vui lòng đánh giá")
    .min(1, formErrorMassage.minString(1, "sao")),
  images: yup.array().min(0),
});

const Reviews = ({ bookId }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    setLoading(() => true);
    const entity = new FormData();
    isArray(values.images) &&
      values.images.forEach((element) => {
        entity.append("files", element);
      });
    entity.append(
      "entity",
      JSON.stringify({
        ...values,
        images: [],
        book: {
          id: bookId,
        },
      })
    );
    setTimeout(() => {
      (async () => {
        try {
          const data = await userApi.reviews(entity);
          setLoading(() => false);
          setOpen(() => false);
          dispatch(
            toastActions.create({
              message: "Đánh giá thành công",
              status: "success",
            })
          );
        } catch (error) {
          const { response } = error;
          let message = response?.data?.message || "Đánh giá không thành công";
          setLoading(() => false);
          dispatch(
            toastActions.create({
              message: message,
              status: "danger",
            })
          );
        }
      })();
    }, 300);
  };
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(() => true)}>
        <Typography>Viết nhận xét</Typography>
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(() => false)}
        css={`
          min-width: 500px;
          & > form {
            display: flex;
            flex-direction: column;
            padding: 10px;
            .form-input {
              height: 100px;
            }
          }
        `}
      >
        <Typography
          css={`
            font-size: 18px;
            font-weight: bold;
            padding: 16px 0;
          `}
        >
          Nhận xét
        </Typography>
        <Form
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {fields.map((item, index) => (
            <FastField component={FormControl} {...item} key={index} />
          ))}
          <Button type="submit" loading={loading}>
            <Typography
              css={`
                padding: 0;
                font-size: 15px;
              `}
            >
              Gửi
            </Typography>
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default Reviews;

const StarStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  gap: 10px;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: ${variables.ui.colors.disable};
    font-size: 25px;
    &:hover,
    &.active {
      color: ${variables.ui.colors.yellow};
      & ~ span {
        color: ${variables.ui.colors.yellow};
      }
    }
  }
`;
