import { Typography, Grid, Card } from "@mui/material";
import React from "react";

export default function DescReserva({ reserva, onClick }) {
  console.log(reserva);
  const [estado, setEstado] = React.useState(reserva.bookingStatus);

  let estadoActual = estado;

  var datePartsEnd = reserva.endDate.split("/");
  var datePartsStart = reserva.startDate.split("/");

  // month is 0-based, that's why we need dataParts[1] - 1
  var lastDate = new Date(
    +datePartsEnd[2],
    datePartsEnd[1] - 1,
    +datePartsEnd[0]
  );

  var startDate = new Date(
    +datePartsStart[2],
    datePartsStart[1] - 1,
    +datePartsStart[0]
  );
  if (lastDate < new Date() && estadoActual === "ACEPTADA") {
    estadoActual = "COMPLETADA";
    setEstado("COMPLETADA");
  } else if (lastDate < new Date() && estadoActual === "PENDIENTE") {
    estadoActual = "CANCELADA";
    setEstado("CANCELADA");
  } else if (
    startDate < new Date() &&
    lastDate > new Date() &&
    estadoActual === "PENDIENTE"
  ) {
    setEstado("EN CURSO");
    estadoActual = "EN CURSO";
  }

  return (
    <Card
      sx={{
        height: "auto",
        "&:hover": {
          background: "#ffffff",
        },
        width: "100%"
      }}
      onClick={onClick}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        sx={{
          width: "100%",
          padding: "15px"
        }}
      >
        <Grid item xs width={"100%"}>
          <Typography><strong>Reserva en:</strong> {reserva.accommodationName}</Typography>
          <Typography>
            <strong>Período de Reserva:</strong> {reserva.startDate} hasta {reserva.endDate}
          </Typography>
          <Typography>Consultar Alojamiento</Typography>
          <Typography><strong>Anfitrión:</strong>{reserva.hostName}</Typography>
        </Grid>
        <Grid item xs width={"100%"}>
          <Typography textAlign={"right"}><strong>Estado: </strong>{estado}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
