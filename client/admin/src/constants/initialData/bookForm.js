import Input from "../../components/Input";
import Select from "../../components/Select";
import Editor from "../../components/Editor";
import UploadImages from "../../components/UploadImages";

export const fieldsNameBookForm = [
  {
    name: "images",
    fieldcomponent: UploadImages,
    label: "Hình ảnh (ảnh đầu tiên sẽ là ảnh đại diện)",
    propschildcomponent: {
      multiple: true,
    },
  },
  {
    name: "name",
    fieldcomponent: Input,
    label: "Tên sách",
    propschildcomponent: {
      placeholder: "vd : Cốt cách mỹ nhân",
    },
  },
  {
    name: "priceOriginal",
    fieldcomponent: Input,
    label: "Giá tiền",
    propschildcomponent: {
      placeholder: "vd: 150000",
      number: "integer",
    },
  },
  {
    name: "total",
    fieldcomponent: Input,
    label: "Số lượng",
    propschildcomponent: {
      placeholder: "vd: 50",
      number: "integer",
    },
  },
  {
    name: "categories",
    fieldcomponent: Select,
    label: "Thể loại sách",
    propschildcomponent: {
      placeholder: "Chọn thể loại sách",
      multiple: true,
      // options: [],
      // disable: true,
      options: [
        { id: 1, name: "Kim Dung" },
        { id: 2, name: "Nguyễn Ngọc ký" },
        { id: 3, name: "Huy Hòa" },
        { id: 4, name: "Trí Đức" },
      ],
    },
  },
  {
    name: "author",
    fieldcomponent: Select,
    label: "Tác giả",
    propschildcomponent: {
      placeholder: "Chọn tác giả",
      // options: [],
      // disable: true,
      options: [
        { id: 1, name: "Kim Dung" },
        { id: 2, name: "Nguyễn Ngọc ký" },
        { id: 3, name: "Huy Hòa" },
        { id: 4, name: "Trí Đức" },
      ],
    },
  },
  {
    name: "publicCompany",
    fieldcomponent: Select,
    label: "Nhà Xuất Bản",
    propschildcomponent: {
      placeholder: "Chọn NXB",
      // options: [],
      // disable: true,
      options: [
        { id: 1, name: "Kim Dung" },
        { id: 2, name: "Nguyễn Ngọc ký" },
        { id: 3, name: "Huy Hòa" },
        { id: 4, name: "Trí Đức" },
      ],
    },
  },
  {
    name: "pages",
    fieldcomponent: Input,
    label: "Tổng số trang",
    propschildcomponent: {
      placeholder: "vd: 200",
      number: "integer",
    },
  },
  {
    name: "width",
    fieldcomponent: Input,
    label: "Chiều rộng",
    type: "number",
    propschildcomponent: {
      placeholder: "vd: 15",
      number: "decimal",
    },
  },
  {
    name: "height",
    label: "Chiều cao",
    fieldcomponent: Input,
    propschildcomponent: {
      placeholder: "vd: 15",
      number: "decimal",
    },
  },
  {
    name: "weight",
    fieldcomponent: Input,
    label: "Cân nặng",
    propschildcomponent: {
      placeholder: "vd: 2",
      number: "decimal",
    },
  },
  {
    name: "description",
    fieldcomponent: Editor,
    label: "Mô tả",
  },
];

export const initialValuesBookForm = {
  images: [],
  name: "",
  priceOriginal: "",
  total: "",
  categories: [],
  author: {},
  publicCompany: {},
  description: "",
  pages: "",
  width: "",
  height: "",
  weight: "",
};
