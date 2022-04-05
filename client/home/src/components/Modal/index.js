import React, { useEffect, useRef } from "react";
import {
  ModalCloseIconStyled,
  ModalPaperStyled,
  ModalWrapStyled,
} from "./styles";

const Modal = ({ children, css = "", open = false, onClose }) => {
  const paperRef = useRef();
  const handleOnClose = () => {
    paperRef.current && paperRef.current.classList.remove("show");
    setTimeout(() => {
      typeof onClose === "function" && onClose();
    }, 1000);
  };
  useEffect(() => {
    paperRef.current &&
      !paperRef.current.matches(".show") &&
      paperRef.current.classList.add("show");
  }, [open]);
  return (
    <>
      {open && (
        <ModalWrapStyled>
          <ModalPaperStyled css={css} ref={paperRef}>
            {children}
            <ModalCloseIconStyled onClick={handleOnClose}>
              <i className="bx bx-x"></i>
            </ModalCloseIconStyled>
          </ModalPaperStyled>
        </ModalWrapStyled>
      )}
    </>
  );
};

export default Modal;
