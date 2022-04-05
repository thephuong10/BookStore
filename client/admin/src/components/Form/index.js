import { Formik, Form as FormElm } from "formik";
import React, { useRef } from "react";
import useStyles from "./styles";
const Form = ({
  initialValues = null,
  validationSchema = null,
  children,
  className = "",
  onSubmit = null,
  enableReinitialize = false,
  resetForm = true,
}) => {
  const formRef = useRef();

  const handleOnSubmit = (values, actions) => {
    onSubmit && onSubmit(values);
    resetForm && actions.resetForm();
  };

  return (
    <Formik
      enableReinitialize={enableReinitialize}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ values }) => {
        return (
          <FormElm ref={formRef} className={className}>
            {children}
          </FormElm>
        );
      }}
    </Formik>
  );
};

export default React.memo(Form);
