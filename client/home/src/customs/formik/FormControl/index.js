import React, { useRef } from "react";
import Typography from "../../../components/Typography";
import variables from "../../../utils/styles/variables";
import { FormControlStyled } from "./styles";

const FormControl = ({ fieldcomponent: Component, ...rest }) => {
  // props
  const { field, form, label, propschildcomponent } = rest;
  const { values, errors, touched } = form;

  const error = Boolean(errors[field.name] && touched[field.name]);
  const propsChildren = {
    name: field.name,
    value: values[field.name],
    ...propschildcomponent,
  };
  //console.log(propsChildren);
  const handleOnChange = (value) => {
    form.setFieldValue(field.name, value);
  };
  const handleOnBlur = (e, value) => {
    form.setFieldValue(field.name, value);
    field.onBlur(e);
  };
  return (
    <FormControlStyled error={error}>
      {!label ? (
        <></>
      ) : (
        <Typography
          css={`
            padding: 0;
            margin-bottom: 10px;
            font-weight: 600;
          `}
        >
          {label}
        </Typography>
      )}
      <Component
        {...propsChildren}
        component={Component}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        className={"form-input"}
        //onClick={handleOnClick}
      />
      {error && (
        <Typography
          css={`
            font-size: 14px;
            color: ${variables.ui.colors.danger};
            padding: 8px 5px 0 5px;
            line-height: 1.3;
            font-weight: 400;
          `}
        >
          {errors[field.name]}
        </Typography>
      )}
    </FormControlStyled>
  );
};

export default FormControl;
