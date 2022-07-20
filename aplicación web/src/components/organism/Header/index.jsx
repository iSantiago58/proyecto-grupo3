import React from "react";

import Logo from "components/atom/Logo";
import HeaderMenu from "components/molecule/HeaderMenu";
import { useNavigate } from "react-router-dom";

import { HeaderContainer } from "./StyledComponents";
import { useModalHook } from "Hooks/ModalHooks";
import LoginModal, { RegistroHModal, CambioCModal } from "../FormModal";
import Api from "server/Api";
import { useLocalStorage } from "Hooks/LocalStoreHook";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ModalSmall } from "components/atom/Modal";
import SideBarMenu from "../SideBarMenu";

import GoogleMap from "components/atom/Googlemap";
import axios from "axios";

const registerH = async function (
  alias,
  nombre,
  apellido,
  password,
  email,
  telefono,
  avatar,
  fechaNacimiento
) {
  const backend = new Api();

  return backend.guestCreate({
    alias: alias,
    email: email,
    password: password,
    name: nombre,
    lastName: apellido,
    phone: telefono,
    birthday: fechaNacimiento,
    picture: avatar,
  });
};

export default function Header({ busqueda, setBusqueda }) {
  const navegar = useNavigate();
  const backend = new Api();

  /* 
  Cerrar sesion
  */
  const [alertaCerrarSesion, setAlerta] = React.useState(false);
  const handleOpen = () => {
    setAlerta(true);
  };
  const handleClose = () => setAlerta(false);

  const [usuario, setUsuario] = useLocalStorage("usuario", "");

  const [iniciarSesionH, abrirInicioH, cerrarInicioH, despuesInicioH] =
    useModalHook();

  const [registrarH, abrirRegistroH, cerrarRegistroH, despuesRegistroH] =
    useModalHook();

  const [cambiarContra, abrirCambiarCH, cerrarCambiarCH, despuesCambiarCH] =
    useModalHook();

  const abrirRegistroA = () => {
    navegar("registrar-anfitrion");
  };

  const iniciarSesion = async function (usuario, contrasena) {
    return backend.login({
      email: usuario,
      password: contrasena,
    });
  };

  return (
    <HeaderContainer sx={{ zIndex: 10 }}>
      <ModalSmall abrirModal={alertaCerrarSesion} onCloseModal={handleClose}>
        <Stack spacing={2} direction="column">
          <label>¿Desea cerrar sesión?</label>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                localStorage.removeItem("usuario");

                //navegar("/");
                window.location = "/";
              }}
            >
              Si
            </Button>
            <Button variant="contained" onClick={handleClose}>
              No
            </Button>
          </Stack>
        </Stack>
      </ModalSmall>
      <Logo />
      <GoogleMap></GoogleMap>
      {/* <Busqueda setInput={setBusqueda} input={busqueda}></Busqueda> */}
      <HeaderMenu
        rol={usuario.rol}
        onIniciar={abrirInicioH}
        onCrear={abrirRegistroH}
        onCerrar={handleOpen}
        onMensaje={() => navegar("/mensajeria")}
        onReserva={() => navegar("/reservas")}
        onPerfil={() => navegar("/perfil")}
        onEstadisticas={() => navegar("/estadisticas")}
        onAdministracion={() => navegar("/admin/usuarios")}
        onAddAdmin={() => navegar("/admin/nuevo-admin")}
        onPagos={() => {
          backend.descargarPagos();
        }}
      >
        {/* Huésped */}
        <LoginModal
          abrirModal={iniciarSesionH}
          cerrarModal={abrirInicioH}
          onCloseModal={cerrarInicioH}
          onAfterOpen={despuesInicioH}
          direction="lefsdsdt"
          onPrincipal={iniciarSesion}
          onOlvidaste={abrirCambiarCH}
          onSecundario1={abrirRegistroA}
          onSecundario2={abrirRegistroH}
          titulo="Huésped"
          setUsuario={setUsuario}
        ></LoginModal>

        <RegistroHModal
          abrirModal={registrarH}
          cerrarModal={abrirRegistroH}
          onCloseModal={cerrarRegistroH}
          onAfterOpen={despuesRegistroH}
          direction="right"
          backTo={abrirInicioH}
          onPrincipal={registerH}
          titulo="Anfitrion"
        ></RegistroHModal>
        {/* Cambio de contraseña */}
        <CambioCModal
          abrirModal={cambiarContra}
          cerrarModal={abrirCambiarCH}
          onCloseModal={cerrarCambiarCH}
          onAfterOpen={despuesCambiarCH}
          backTo={abrirInicioH}
          onPrincipal={() => {}}
          tituloLateral=""
        ></CambioCModal>
      </HeaderMenu>
    </HeaderContainer>
  );
}
