import * as yup from "yup";
import Input from "../../components/Input";
import formErrorMassage from "../../utils/formMassage";
import UploadImages from "../../components/UploadImages";

import Timepicker from "../../custom/component/TimePicker";
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(formErrorMassage.required)
    .min(2, formErrorMassage.minString(2, "kí tự"))
    .max(100, formErrorMassage.maxString(100, "kí tự")),
  startTime: yup.string().required(formErrorMassage.required),
  endTime: yup.string().required(formErrorMassage.required),
  banner: yup.array().min(1, "Vui lòng chọn ảnh"),
  discount: yup
    .number()
    .required(formErrorMassage.required)
    .min(1, formErrorMassage.minString(1, "%")),
});

const field = [
  {
    name: "banner",
    fieldcomponent: UploadImages,
    label: "Hình ảnh (ảnh đầu tiên sẽ là ảnh đại diện)",
    propschildcomponent: {
      multiple: false,
    },
  },
  {
    name: "name",
    fieldcomponent: Input,
    label: "Tên đợt khuyến mãi",
    propschildcomponent: {
      placeholder: "vd : Cốt cách mỹ nhân",
    },
  },
  {
    name: "discount",
    fieldcomponent: Input,
    label: "Khuyến mãi (theo %)",
    type: "number",
    propschildcomponent: {
      placeholder: "vd: 5",
      number: "decimal",
    },
  },
  {
    name: "startTime",
    fieldcomponent: Timepicker,
    label: "Thời gian bắt đầu",

    propschildcomponent: {},
  },
  {
    name: "endTime",
    fieldcomponent: Timepicker,
    label: "Thời gian kết thúc",

    propschildcomponent: {},
  },
];

const initialSaleForm = {
  validate: validationSchema,
  values: {
    name: "",
    banner: [],
    discount: "",
    startTime: null,
    endTime: null,
  },
  fields: field,
};
export default initialSaleForm;
