import React from "react";
import { Formik, Form as FormElm } from "formik";
const Form = ({
  initialValues = null,
  validationSchema = null,
  children,
  className = "",
  onSubmit = null,
  resetForm = true,
  enableReinitialize = false,
}) => {
  const handleOnSubmit = (values, actions) => {
    onSubmit && onSubmit(values);
    resetForm && actions.resetForm();
  };
  console.log("initialValues", initialValues);
  return (
    <Formik
      enableReinitialize={enableReinitialize}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      {() => <FormElm className={className}>{children}</FormElm>}
    </Formik>
  );
};

export default Form;
