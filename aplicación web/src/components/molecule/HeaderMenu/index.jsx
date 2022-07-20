import React from "react";

import { MenuContainer, Item } from "./StyledComponents";

import {
  Alert,
  Messages,
  Bookings,
  Statistics,
  Management,
  AddUser,
  Downloader,
} from "components/atom/Icon";

import { Box } from "@mui/system";
export default function HeaderMenu({
  children,
  onCrear,
  onIniciar,
  rol,
  onEstadisticas = () => {},
  onAdministracion = () => {},
  messages = () => {},
  onCerrar = () => {},
  onPerfil = () => {},
  onReserva = () => {},
  onMensaje = () => {},
  onAddAdmin = () => {},
  onPagos = () => {},
}) {
  if (rol == "ROLE_GUEST") {
    return (
      <MenuContainer>
        {children}
        {/* <Alert /> */}
        <Messages onClick={onMensaje} />
        <Bookings onClick={onReserva} />
        <Item component="button" underline="hover" onClick={onPerfil}>
          Perfil
        </Item>
        <Item component="button" underline="hover" onClick={onCerrar}>
          Cerrar Sesión
        </Item>
      </MenuContainer>
    );
  } else if (rol == "ROLE_ADMIN") {
    return (
      <MenuContainer>
        {children}
        <Downloader onClick={onPagos} />
        <Statistics onClick={onEstadisticas} />
        <AddUser onClick={onAddAdmin} />
        <Management onClick={onAdministracion} />
        <Item component="button" underline="hover" onClick={onPerfil}>
          Perfil
        </Item>
        <Item component="button" underline="hover" onClick={onCerrar}>
          Cerrar Sesión
        </Item>
      </MenuContainer>
    );
  } else if (rol == "ROLE_HOST") {
    return (
      <MenuContainer>
        {/* <Alert /> */}
        <Messages onClick={onMensaje} />
        <Bookings onClick={onReserva} />
        <Item component="button" underline="hover" onClick={onPerfil}>
          Perfil
        </Item>
        <Item component="button" underline="hover" onClick={onCerrar}>
          Cerrar Sesión
        </Item>
        {children}
      </MenuContainer>
    );
  }
  return (
    <MenuContainer>
      {children}
      <Item component="button" underline="hover" onClick={onIniciar}>
        Iniciar Sesión / Hazte una cuenta
      </Item>
    </MenuContainer>
  );
}
