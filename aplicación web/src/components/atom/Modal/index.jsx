import * as React from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { ModalSC, BoxSC, BoxSmall } from "./StyledComponents";

export default function ModalBasico({
  abrirModal = false,
  onCloseModal,
  props,
  children,
}) {
  function onModalClose(event) {
    let data = { name: "example", type: "closed from child" };
    onCloseModal(event, data);
  }

  return (
    <ModalSC
      open={abrirModal}
      onClose={onModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...props}
    >
      <BoxSC sx={{ overflow: "hidden" }}>
        <CloseIcon
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 200,
            float: "right",
            cursor: "pointer",
          }}
          onClick={onCloseModal}
        />
        {children}
      </BoxSC>
    </ModalSC>
  );
}
export function ModalSmall({
  abrirModal = false,
  onCloseModal,
  children,
  style,
  ...props
}) {
  function onModalClose(event) {
    let data = { name: "example", type: "closed from child" };
    onCloseModal(event, data);
  }

  return (
    <ModalSC
      open={abrirModal}
      onClose={onModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...props}
    >
      <BoxSmall style={style}>{children}</BoxSmall>
    </ModalSC>
  );
}
