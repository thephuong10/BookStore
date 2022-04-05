import React, { useRef, useState } from "react";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Box } from "@mui/material";
import { Editor as EditorBase } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import useStyles from "./styles";

const uploadCallback = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      resolve({ data: { link: reader.result } });
    };

    reader.readAsDataURL(file);
  });
};
const config = {
  image: {
    //uploadCallback: uploadCallback,
    inputAccept: "image/jpeg,image/jpg,image/png,image/svg",
  },
};

const Editor = ({
  sx = {},
  onChange = null,
  placeholder = "Nhập nội dung",
  value = "",
  className = "",
}) => {
  const [editorState, setEditorState] = useState(() =>
    !value
      ? EditorState.createEmpty()
      : EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(value))
        )
  );
  const editorRef = useRef();
  const classes = useStyles();

  const handleEditorChange = async (e) => {
    const value = draftToHtml(convertToRaw(e.getCurrentContent()));
    await setEditorState(() => e);
    onChange && onChange(value);
  };
  const handleChangeBorderColor = () => {
    editorRef.current.classList.toggle("focus");
  };
  return (
    <Box
      sx={sx}
      className={`${classes["editor"]} ${className}`}
      ref={editorRef}
    >
      <EditorBase
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={handleEditorChange}
        toolbar={config}
        placeholder={placeholder}
        onFocus={handleChangeBorderColor}
        onBlur={handleChangeBorderColor}
      />
    </Box>
  );
};

export default Editor;
