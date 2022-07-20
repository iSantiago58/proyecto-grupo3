import React from "react";

import { Box, Grid } from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import Avatar from "@mui/material/Avatar";
import { green, pink, red } from "@mui/material/colors";
import Api from "server/Api";
import { useInputFormHook } from "Hooks/Inputhooks";
import { useInputsForm } from "Hooks/Inputhooks";
import { Button } from "components/atom/Button";
import { H1 } from "./StyledComponent";
import { FormChangePasswordProfile } from "components/organism/Forms";
import { useNavigate } from "react-router-dom";
export default function ChangePassword() {
  const navegar = useNavigate();

  return (
    <Grid
      content
      sx={{
        display: "flex",
        height: "100%",
        background: "#ffff",
        marginInline: "30%",
      }}
      alignSelf="center"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <H1>Cambiar Contraseña</H1>
        <FormChangePasswordProfile
          onBack={() => navegar("/perfil")}
        ></FormChangePasswordProfile>
      </Grid>
    </Grid>
  );
}
