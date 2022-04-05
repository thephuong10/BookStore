import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { toDateString } from "../../utils/utils";

const Timepicker = ({ value = 0, sx = {}, ...rest }) => {
  const [state, setState] = useState(() => toDateString(value));
  const handleOnChange = (e) => {
    const { onChange } = rest;
    setState(() => e.target.value);
    onChange && onChange(new Date(e.target.value).getTime());
  };
  useEffect(() => {
    setState(() => toDateString(value));
  }, [value]);
  return (
    <TextField
      type="datetime-local"
      value={state}
      placeholder="dd/mm/yyyy"
      sx={sx}
      onChange={handleOnChange}
    />
  );
};

export default Timepicker;
