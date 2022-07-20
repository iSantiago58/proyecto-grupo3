import React from "react";

import { Grid } from "@mui/material";

import { FormEditUser } from "components/organism/Forms";

export default function ChangeUserData() {
  const back = () => {};
  return (
    <Grid
      content
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        content
        sx={{
          display: "flex",
          width: "40%",
          height: "100%",
          backgroundColor: "#FFFFFF",
        }}
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
        spacing={10}
      >
        <h1>Editar Informacion</h1>
        <FormEditUser onBack={back}></FormEditUser>
      </Grid>
    </Grid>
  );
}
