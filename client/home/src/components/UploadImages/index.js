import React, { useState, useEffect } from "react";
import { isArray } from "../../utils/fun";
import { ImageListStyled, UploadImageStyled } from "./styles";
const regex = /jpg|png$/;
const UploadImages = ({ multiple = true, max = 6, onChange, value = [] }) => {
  const [images, setImages] = useState(() =>
    isArray(value)
      ? value.map((item, index) => ({
          id: index,
          src: item,
        }))
      : []
  );
  useEffect(() => {
    if (Array.isArray(value) && !value.length) {
      setImages(() => []);
      //onChange && onChange([]);
    }
  }, [value]);
  const hanleAfterUploadFile = (e) => {
    !(
      e.target.matches("label") ||
      e.target.matches(`${ImageListStyled} > span:last-child`) ||
      e.target.matches(".bx-cloud-upload")
    ) && e.preventDefault();
  };
  const hanleUploadImages = (e) => {
    if (e.target.files.length) {
      let files = [...e.target.files];
      files.length > max && (files.length = max);
      files = files.filter((i) => regex.test(i.name));
      if (files.length) {
        files.forEach((i) => {
          if (!images.find((j) => j.file.name === i.name)) {
            images.push({
              id: images.length,
              src: URL.createObjectURL(i),
              file: i,
            });
          }
        });
        const result = [...images];
        setImages(() => result);
        onChange && onChange(result.map((i) => i.file));
      }
    }
  };
  const handleRemoveImg = (id) => (e) => {
    const result = [...images.filter((i) => i.id !== id)];
    setImages(() => result);
    onChange && onChange(result.map((i) => i.file));
    e.preventDefault();
  };
  return (
    <UploadImageStyled>
      <label htmlFor="upload-image" onClick={hanleAfterUploadFile}>
        <ImageListStyled>
          {images.map((item) => (
            <span key={item.id}>
              <img src={item.src} />
              <span>
                <i
                  className="bx bxs-trash-alt"
                  onClick={handleRemoveImg(item.id)}
                ></i>
              </span>
            </span>
          ))}
          <span>
            <i className="bx bx-cloud-upload"></i>
          </span>
        </ImageListStyled>
      </label>
      <input
        type="file"
        multiple={multiple}
        hidden
        id="upload-image"
        onChange={hanleUploadImages}
      />
    </UploadImageStyled>
  );
};

export default UploadImages;
