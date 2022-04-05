import React, { useRef } from "react";
import { AvatarStyled } from "./styles";
import AccountAvatar from "../../assets/images/account-avt.png";

const Avatar = ({ src = "", css = "", ...rest }) => {
  const imgRef = useRef();
  return (
    <AvatarStyled
      css={css}
      src={src || AccountAvatar}
      onError={() => imgRef.current.setAttribute("src", AccountAvatar)}
      {...rest}
    />
  );
};

export default Avatar;
