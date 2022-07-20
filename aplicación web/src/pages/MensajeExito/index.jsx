import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { useParams } from "react-router-dom";
export default function MensajeExito() {
  const { id } = useParams();

  let renderizado = <div></div>;

  if (id === "registro-anfitrion") {
    renderizado = (
      <Stack
        sx={{
          margin: "auto",
          justifyContent: "center",
          alignContent: "center",
        }}
        spacing={15}
      >
        <DoneOutlineIcon
          sx={{ fontSize: 100, margin: "auto" }}
        ></DoneOutlineIcon>
        <Typography variant="h3">Registro de anfitrion completado</Typography>
      </Stack>
    );
  }

  return (
    <Grid
      container
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        container
        sx={{
          display: "flex",
          minWidth: "40%",
          maxWidth: "fit-content",
          height: "600px",
          backgroundColor: "#FFFFFF",
        }}
        direction="column"
        alignItems="center"
        justifyContent="space-around"
      >
        {renderizado}
      </Grid>
    </Grid>
  );
}
