import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useStyles from "./styles";
import { isArray, deleteKey, isObject } from "../../utils/utils";
const regex = /jpg|png|jpeg$/;
const UploadImages = ({
  multiple = true,
  max = 4,
  onChange,
  value = [],
  className = "",
}) => {
  const classes = useStyles();
  const [images, setImages] = useState(() =>
    isArray(value)
      ? value.map((item, index) => ({
          id: index,
          src: item,
        }))
      : []
  );
  const hanleAfterUploadFile = (e) => {
    !(
      e.target.matches("label") ||
      e.target.matches(`.${classes["images"]} > span:last-child`) ||
      e.target.matches(`.${classes["images"]} > span:last-child > svg`)
    ) && e.preventDefault();
  };
  const hanleUploadImages = (e) => {
    if (e.target.files.length) {
      let files = [...e.target.files];
      if (multiple) {
        files.length > max && (files.length = max);
        files = files.filter((i) => regex.test(i.name));
        if (files.length) {
          files.forEach((i) => {
            if (!images.find((j) => j?.file?.name === i.name)) {
              images.push({
                id: images.length,
                src: URL.createObjectURL(i),
                file: i,
              });
            }
          });

          const result = [...images];
          setImages(() => result);
          onChange && onChange(result.map((i) => deleteKey({ ...i }, "id")));
        }
      } else {
        const result = [
          {
            id: 0,
            src: URL.createObjectURL(files[0]),
            file: files[0],
          },
        ];
        setImages(() => result);
        onChange && onChange(result.map((i) => deleteKey({ ...i }, "id")));
      }
    }
  };
  const handleRemoveImg = (id) => (e) => {
    const result = [...images.filter((i) => i.id !== id)];
    setImages(() => result);
    onChange && onChange(result);
    e.preventDefault();
  };
  useEffect(() => {
    if (isArray(value)) {
      console.log("upload", value);
      setImages(() =>
        value.map((item, index) =>
          !isObject(item)
            ? {
                id: index,
                src: item,
                file: null,
              }
            : {
                ...item,
                id: index,
              }
        )
      );
    } else if (Array.isArray(value) && !value.length && images.length) {
      setImages(() => []);
    }
  }, [value]);
  return (
    <div className={`${classes["wrapper"]} ${className}`}>
      <label htmlFor="upload-image" onClick={hanleAfterUploadFile}>
        <div className={classes["images"]}>
          {images.map((item) => (
            <span key={item.id}>
              <img src={item.src} />
              <span>
                <DeleteIcon
                  onClick={handleRemoveImg(item.id)}
                  sx={{
                    width: "25px",
                    height: "25px",
                    "&:hover": {
                      color: "#d4cfcf",
                    },
                  }}
                />
              </span>
            </span>
          ))}
          <span>
            <CloudUploadIcon />
          </span>
        </div>
      </label>
      <input
        type="file"
        multiple={multiple}
        hidden
        id="upload-image"
        onChange={hanleUploadImages}
      />
    </div>
  );
};

export default UploadImages;
