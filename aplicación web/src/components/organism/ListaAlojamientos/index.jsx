import {Box, Grid, Typography} from "@mui/material";
import Alojamiento, {
  AlojamientoAnfitrion,
} from "components/molecule/Alojamiento";
import DescReserva from "components/molecule/DescReserva";
import React from "react";

export default function ListaAlojamientos({
  alojamientos = [],
  startDate = "",
  endDate = "",
}) {
  return (
    <Grid container columns={20} width={"100%"}>
      {alojamientos.map((alojamiento, i) => {
        return (
          <Grid item xs={10} key={i}>
            <Alojamiento
              data={alojamiento}
              startDate={startDate}
              endDate={endDate}
            ></Alojamiento>
          </Grid>
        );
      })}
    </Grid>
  );
}
export function ListaAlojamientosAnfitrion({
  alojamientos = [],
  seleccionar = () => {},
}) {
  return (
    <Grid
      container
      width={"100%"}
      rowSpacing={4}
      columnSpacing={4}
      direction="column"
      justifyContent="center"
      alignItems="center"
      key={"listaAlojamiento"}
    >
      {alojamientos.map((alojamiento, i) => {
        return (
          <Grid item xs={20} key={i} width={"100%"}>
            <AlojamientoAnfitrion
              onClick={() => seleccionar(alojamiento.accommodationId)}
              data={alojamiento}
            ></AlojamientoAnfitrion>
          </Grid>
        );
      })}
    </Grid>
  );
}

export function ListaReservaAlojamientoHuesped({
  reservas = [],
  seleccionar = () => {},
}) {
  return (
    <Box sx={{ height: "100%", overflowY: "scroll" }}>
      <Grid
        container
        columnSpacing={4}
        rowSpacing={2}
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        key={"listaReservas"}
      >
        {reservas.map((reserva, i) => {
          return (
            <Grid item xs key={i} width={"100%"}>
              <DescReserva
                onClick={() => seleccionar(reserva.bookingId)}
                reserva={reserva}
              ></DescReserva>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
