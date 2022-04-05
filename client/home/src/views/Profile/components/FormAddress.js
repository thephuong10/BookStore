import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { isArray, isObject } from "../../../utils/fun";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import Form from "../../../customs/formik/Form";
import useLocations from "../../../customs/hooks/useLocations";
import { Field } from "formik";
import FormControl from "../../../customs/formik/FormControl";
import * as yup from "yup";
import Typography from "../../../components/Typography";
import Textarea from "../../../components/Textarea";
import formErrorMassage from "../../../utils/formErrorMassage";
import userSelector from "../../../redux/selector/userSelector";
import Input from "../../../components/Input";
const phoneRegExp = /^[0-9-+]+$/;
yup.addMethod(yup.object, "isObject", function (name, errorMessage) {
  return this.test(name, errorMessage, function (value) {
    const { path, createError } = this;
    return !isObject(value)
      ? createError({ path, message: errorMessage })
      : true;
  });
});
yup.addMethod(yup.string, "phoneNumber", function (errorMessage, name) {
  return this.test(name, errorMessage, function (value) {
    const { path, createError } = this;
    return value
      ? (value.length >= 10 && value.length <= 11 && phoneRegExp.test(value)) ||
          createError({ path, message: errorMessage })
      : false;
  });
});
const validationSchema = yup.object().shape({
  province: yup
    .object()
    .isObject("province", "Vui lòng chọn tỉnh thành/thành phố"),
  district: yup.object().isObject("district", "Vui lòng chọn quận/huyện"),
  ward: yup.object().isObject("ward", "Vui lòng chọn phường/xã"),
  addressDetail: yup
    .string()
    .required(formErrorMassage.required)
    .min(10, formErrorMassage.minString(10, "kí tự"))
    .max(100, formErrorMassage.maxString(100, "kí tự")),
  phone: yup.string().phoneNumber("Số điện thoại không hợp lệ", "phone"),
});
const initialAddress = {
  provinceId: null,
  districtId: null,
  wardId: null,
  addressDetail: "",
  phone: "",
};

const Formaddress = ({ onSubmit }) => {
  const info = useSelector(userSelector.getInfo);

  return (
    <FormaddressMain
      addressProps={
        isObject(info.address)
          ? {
              provinceId: info.address.provinceId,
              districtId: info.address.districtId,
              wardId: info.address.wardCode,
              addressDetail: info.address.addressDetail,
              phone: info.phone,
            }
          : { ...initialAddress }
      }
      onSubmit={onSubmit}
    />
  );
};

const FormaddressMain = ({ addressProps = {}, onSubmit }) => {
  const { state, onProvinceSelect, onDistrictSelect, onWardSelect } =
    useLocations({
      provinceId: addressProps.provinceId,
      districtId: addressProps.districtId,
      wardId: addressProps.wardId,
    });

  const {
    provinceOptions,
    districtOptions,
    wardOptions,
    selectedProvince,
    selectedDistrict,
    selectedWard,
  } = state;

  const [initialValues, setInitialValues] = useState(() => ({
    province: {
      provinceId: selectedProvince?.code,
      provinceName: selectedProvince?.title,
    },
    district: {
      districtId: selectedDistrict?.code,
      districtName: selectedDistrict?.title,
    },
    ward: {
      wardCode: selectedWard?.code,
      wardName: selectedWard?.title,
    },
    addressDetail: addressProps.addressDetail,
    phone: addressProps.phone,
  }));
  useEffect(() => {
    isObject(addressProps) &&
      setInitialValues(() => ({
        province: {
          provinceId: selectedProvince?.code,
          provinceName: selectedProvince?.title,
        },
        district: {
          districtId: selectedDistrict?.code,
          districtName: selectedDistrict?.title,
        },
        ward: {
          wardCode: selectedWard?.code,
          wardName: selectedWard?.title,
        },
        addressDetail: addressProps.addressDetail,
        phone: addressProps.phone,
      }));
  }, [addressProps]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    onSubmit(values, (status) => setLoading(() => status));
  };
  return (
    <Form
      enableReinitialize
      initialValues={{
        ...initialValues,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      resetForm={false}
    >
      <Field
        name="phone"
        component={FormControl}
        fieldcomponent={Input}
        label="Số điện thoại"
        propschildcomponent={{
          placeholder: "vd: 0903900696",
          icon: <i className="bx bxs-phone"></i>,
        }}
      />
      <Field
        name="province"
        component={FormControl}
        fieldcomponent={AddressSelect}
        label={"Tỉnh/thành phố"}
        propschildcomponent={{
          values: provinceOptions,
          placeholder: "Tỉnh/thành",
          defaultValue: selectedProvince,
          change: onProvinceSelect,
          disable: !isArray(provinceOptions),
          type: ADDRESS_TYPE["provinces"],
        }}
      />
      <Field
        name="district"
        component={FormControl}
        fieldcomponent={AddressSelect}
        label={"Quận/huyện"}
        propschildcomponent={{
          values: districtOptions,
          placeholder: "Chọn quận/huyện",
          defaultValue: selectedDistrict,
          change: onDistrictSelect,
          disable: !isArray(districtOptions),
          type: ADDRESS_TYPE["districts"],
        }}
      />
      <Field
        name="ward"
        component={FormControl}
        fieldcomponent={AddressSelect}
        label={"Xã/phường"}
        propschildcomponent={{
          values: wardOptions,
          placeholder: "Chọn xã/phường",
          defaultValue: selectedWard,
          change: onWardSelect,
          disable: !isArray(wardOptions),
          type: ADDRESS_TYPE["wards"],
        }}
      />
      <Field
        name="addressDetail"
        component={FormControl}
        fieldcomponent={Textarea}
        label={"Địa chỉ chi tiết"}
        propschildcomponent={{
          placeholder: "Nhập địa chỉ chi tiết",
        }}
      />
      <Button type="submit" loading={loading}>
        <Typography>Xác nhận</Typography>
      </Button>
    </Form>
  );
};

export default Formaddress;

const AddressSelect = ({
  values,
  placeholder = "Chọn --",
  defaultValue,
  change,
  disable,
  type,
  ...rest
}) => {
  const handleOnChange = (selected) => {
    const { onChange } = rest;
    switch (type) {
      case ADDRESS_TYPE["provinces"]:
        onChange({
          provinceId: selected.code,
          provinceName: selected.title,
        });
        break;
      case ADDRESS_TYPE["districts"]:
        onChange({
          districtId: selected.code,
          districtName: selected.title,
        });
        break;
      case ADDRESS_TYPE["wards"]:
        onChange({
          wardCode: selected.code,
          wardName: selected.title,
        });
        break;
      default:
        break;
    }
    change(selected);
  };
  return (
    <Select
      values={values}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disable={disable}
      onChange={handleOnChange}
    />
  );
};
const ADDRESS_TYPE = {
  provinces: "provinces",
  districts: "districts",
  wards: "wards",
};
