import React from "react";
import { BusquedaContainer, Input } from "./StyledComponents";
import { useGlobalState } from "Hooks/GlobalHook";
import { useLocation } from "react-router-dom";

export default function Busqueda() {
  const [state, dispatch] = useGlobalState();
  const location = useLocation();
  return (
    <BusquedaContainer>
      <Input
        fullWidth
        value={state.busqueda}
        onChange={(e) => {
          dispatch({ busqueda: e.target.value });
          if (location.pathname !== "/busqueda") {
          }
        }} //setInput(e.target.value)}
      ></Input>
    </BusquedaContainer>
  );
}
export function BusquedaField({ setValor }) {
  const [state, dispatch] = useGlobalState();
  return (
    <BusquedaContainer>
      <Input
        fullWidth
        value={state.busqueda}
        onChange={(e) => {
          dispatch({ busqueda: e.target.value });
          setValor(e.target);
        }} //setInput(e.target.value)}
      ></Input>
    </BusquedaContainer>
  );
}
