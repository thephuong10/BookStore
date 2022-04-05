import React, { useRef } from "react";
import useStyles from "./styles";
import {
  FormControl as FormControlElm,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import variables from "../../../utils/styles/variables";
import Component from "../../component/Component";
import { classnames } from "../../../utils/handleClassnames";
const FormControl = ({ fieldcomponent: Component, ...rest }) => {
  const classes = useStyles();
  const formControlRef = useRef();

  // props
  const { field, form, label, propschildcomponent } = rest;
  const { values, errors, touched } = form;
  const error = Boolean(errors[field.name] && touched[field.name]);

  const propsChildren = {
    name: field.name,
    value: values[field.name],
    ...propschildcomponent,
  };

  // event
  const handleOnChange = (value) => {
    form.setFieldValue(field.name, value);
  };
  const handleOnBlur = (e) => {
    field.onBlur(e);
  };

  return (
    <FormControlElm
      ref={formControlRef}
      className={classnames(classes["formControl"], {
        error: error,
      })}
      fullWidth
    >
      <FormLabel className={classes["formLabel"]}>{label}</FormLabel>
      <Component
        {...propsChildren}
        component={Component}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        className={"form-input"}
        //onClick={handleOnClick}
      />
      {error && (
        <FormHelperText className={classes["formMessage"]}>
          {errors[field.name]}
        </FormHelperText>
      )}
    </FormControlElm>
  );
};

export default FormControl;
