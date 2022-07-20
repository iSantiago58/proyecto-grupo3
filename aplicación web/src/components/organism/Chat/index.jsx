import { Stack } from "@mui/material";
import { Button } from "components/atom/Button";
import TextField from "components/atom/Textfield";
import React from "react";

export default function index() {
  return (
    <Grid container>
      <Stack></Stack>
      <TextField label="Enviar Mensaje"></TextField>
      <Button> Enviar</Button>
    </Grid>
  );
}
