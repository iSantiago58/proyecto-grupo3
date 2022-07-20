import SimpleModal from "./modalBotonera";
import Api from "server/Api";
import { Button } from "components/atom/Button";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import React from "react";

function botonAceptar(alias) {
  return (
      <SimpleModal boton="Aceptar" alias={alias}></SimpleModal>
  );
}
function botonRechazar(alias) {
  return (
      <SimpleModal boton="Rechazar" alias={alias}></SimpleModal>
  );
}

function botonBloquear(estado, alias, actualizarTabla) {
  if (estado == "ACEPTADO") {
    return (
        <SimpleModal
            boton="Bloquear"
            alias={alias}
            actualizarTabla={actualizarTabla}
        ></SimpleModal>
    );
  }
  return <></>;
}

function botonDesbloquear(estado, alias, actualizarTabla) {
  if (estado == "BLOQUEADO") {
    return (
        <SimpleModal
            boton="Desbloquear"
            alias={alias}
            actualizarTabla={actualizarTabla}
        ></SimpleModal>
    );
  }
  return <></>;
}
function botonEliminar(estado, alias, actualizarTabla) {
  if (estado == "ACEPTADO") {
    return (
        <SimpleModal
            boton="Eliminar"
            alias={alias}
            actualizarTabla={actualizarTabla}
        ></SimpleModal>
    );
  }
  return <></>;
}

function botoneraEstados(estado, alias, actualizarTabla, accommodationId) {
  const btnVerAprobacion = () => {
    if (estado == "ESPERANDO") {
      return (
          /*<Button
            variant="contained"
            href={`/admin/aprobarUsuarios/${accommodationId}/${alias}`}
          >
            Validar Usuario
          </Button>*/
          <div style={{padding:'5px'}}>
            <IconButton
                href={`/admin/aprobarUsuarios/${accommodationId}/${alias}`}
                style={{backgroundColor: '#33b047', color: 'white'}}>
              <DoneIcon />
            </IconButton>
          </div>
      );
    }
    return <></>;
  };

  return (
      <div style={{display: 'inline-flex'}}>
        {btnVerAprobacion(estado, alias)}
        {botonBloquear(estado, alias, actualizarTabla)}
        {botonDesbloquear(estado, alias, actualizarTabla)}
        {botonEliminar(estado, alias, actualizarTabla)}
      </div>
  );
}

export {
  botoneraEstados,
  botonAceptar,
  botonBloquear,
  botonDesbloquear,
  botonEliminar,
  botonRechazar,
};
