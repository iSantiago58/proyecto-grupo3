import { useState } from "react";

export const useModalHook = () => {
  const [valor, setIniciarSesion] = useState(false);

  function visible() {
    setIniciarSesion(!valor);
  }

  function handleCloseModal(event, data) {
    setIniciarSesion(false);
  }

  function handleAfterOpen(event, data) {}
  return [valor, visible, handleCloseModal, handleAfterOpen];
};
