import React from "react";
import { useDispatch } from "react-redux";
import userApi from "../../../../apis/userApi";
import { userActions } from "../../../../redux/slice/UserSlice";
import { deleteKey, flattenObject } from "../../../../utils/fun";
import Formaddress from "../../components/FormAddress";
import { AddressStyled } from "./styles";

const Address = () => {
  const dispatch = useDispatch();
  const handleOnSubmit = (values, callback) => {
    callback(true);
    setTimeout(() => {
      (async () => {
        try {
          const phone = values.phone;
          const _address = deleteKey(flattenObject(values), "phone");
          console.log("a", flattenObject(values));
          console.log("b", values);
          console.log("c", _address);
          // const data = await userApi.updateAddress(phone, _address);
          // dispatch(userActions.setAddress(_address));
          callback(false);
        } catch {
          callback(false);
        }
      })();
    }, 1000);
  };
  return (
    <AddressStyled>
      <Formaddress onSubmit={handleOnSubmit} />
    </AddressStyled>
  );
};

export default Address;
