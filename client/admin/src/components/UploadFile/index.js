import React, { useRef, useState } from "react";
import useStyles from "./styles";
import { Box, Typography } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "../Button";

const UploadFile = ({
  multiple = true,
  sx = null,
  placeholder = "Chọn file...",
  onChange = null,
  className = "",
  name = "",
  value = null,
}) => {
  const classes = useStyles();
  const [fileList, setFileList] = useState([]);
  const inputRef = useRef();
  const handleOnChange = async (e) => {
    const result = Array.from(e.target.files);
    await setFileList((prev) =>
      result.map((item, index) => ({
        key: index + 1,
        file: item,
      }))
    );
    onChange && onChange(result);
  };
  const handleDeleteFile = async (key) => {
    const result = fileList.filter((item) => item.key !== key);
    await setFileList(result);
    onChange && onChange(result);
  };
  return (
    <Box sx={sx} className={`${classes["imageUploadWrap"]} ${className}`}>
      <Box
        sx={{
          minWidth: 0,
          flex: 1,
          height: "100%",
          padding: "0 0.5rem",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        {fileList.length !== 0 ? (
          <div className={classes["uploadNames"]}>
            {fileList.map((item) => (
              <Button
                variant="overlay"
                className={classes["uploadName"]}
                key={item.key}
              >
                <Typography
                  sx={{
                    fontSize: "0.95rem",
                  }}
                  noWrap
                >
                  {item.file.name}
                </Typography>
                <CancelIcon onClick={() => handleDeleteFile(item.key)} />
              </Button>
            ))}
          </div>
        ) : (
          <Typography sx={{ width: "100%" }} noWrap>
            {placeholder}
          </Typography>
        )}
      </Box>
      <label className={classes["uploadBtn"]} htmlFor="input-upload-file">
        <PhotoCamera />
        <input
          onChange={handleOnChange}
          ref={inputRef}
          multiple={multiple}
          accept="image/*"
          type="file"
          id="input-upload-file"
          name={name}
        />
      </label>
    </Box>
  );
};

export default UploadFile;
