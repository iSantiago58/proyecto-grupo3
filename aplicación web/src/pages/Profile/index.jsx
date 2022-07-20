import React from "react";

import { Grid, Rating } from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import Api from "server/Api";
import { useInputsForm } from "Hooks/Inputhooks";
import { Button } from "components/atom/Button";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "Hooks/LocalStoreHook";

import { styled } from "@mui/material/styles";
import { IconUser } from "../../components/molecule/IconSelector";
const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const Paragraph = styled("p")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
}));

export default function Profile() {
  const [fields, , changeField] = useInputsForm({
    account: null,
    alias: "",
    bank: null,
    birthday: "",
    email: "",
    lastName: "",
    name: "",
    phone: "",
    picture: "",
    qualification: 0,
    carga: false,
  });

  const [usuario] = useLocalStorage("usuario", "");

  const borrarUsuario = async () => {
    //const resultado = await api.borrarUsuario();
    //if (resultado.status === 200) {
    localStorage.removeItem("usuario");

    navegar("/");
    window.location.reload();
    // }
  };

  const navegar = useNavigate();

  if (!fields.carga) {
    const api = new Api();
    changeField("carga", true);

    api.profile().then((response) => {
      const data = response.data;
      changeField("account", data.account);
      changeField("alias", data.alias);
      changeField("bank", data.bank);
      changeField("birthday", data.birthday);
      changeField("name", data.name);
      changeField("email", data.email);
      changeField("lastName", data.lastName);

      changeField("phone", data.phone);
      changeField("picture", data.picture);
      changeField("qualification", data.qualification);
    });
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
        <Grid
          item
          xs
          container
          justifyContent="space-around"
          alignItems="center"
          direction="column"
        >
          <Grid
            item
            xs
            container
            justifyContent="space-around"
            alignItems="center"
            direction="column"
          >
            <Grid item xs>
              <Avatar sx={{ bgcolor: green[500] }}>
                <IconUser id={Number(fields.picture)} />
              </Avatar>
            </Grid>
            <Grid item xs>
              {fields.alias}
            </Grid>
            <Grid item xs>
              <Rating value={fields.qualification} readOnly precision={0.1} />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs
          sx={{ width: "80%" }}
          display="flex"
          justifyContent="space-evenly"
        >
          <Grid item xs>
            <Div>
              <Paragraph>Nombre:</Paragraph>
              <Paragraph>
                {fields.name} {fields.lastName}
              </Paragraph>
            </Div>
          </Grid>
          <Grid item xs>
            <Div>
              <Paragraph>Fecha de Nacimiento:</Paragraph>
              <Paragraph>{fields.birthday}</Paragraph>
            </Div>
          </Grid>
        </Grid>
        <Grid
          item
          xs
          sx={{ width: "80%" }}
          display="flex"
          justifyContent="space-evenly"
        >
          <Grid item xs>
            <Div>
              <Paragraph>Teléfono/Celular:</Paragraph>
              <Paragraph>{fields.phone}</Paragraph>
            </Div>
          </Grid>
          <Grid item xs>
            <Div>
              <Paragraph>Email:</Paragraph>
              <Paragraph>{fields.email}</Paragraph>
            </Div>
          </Grid>
        </Grid>
        <Grid
          item
          xs
          sx={{ width: "80%" }}
          display="flex"
          justifyContent="space-evenly"
        >
          {usuario.rol === "ROLE_HOST" && (
            <Grid item xs>
              <Div>
                <Paragraph>Banco:</Paragraph>
                <Paragraph>{fields.bank}</Paragraph>
              </Div>
            </Grid>
          )}
          {usuario.rol === "ROLE_HOST" && (
            <Grid item xs>
              <Div>
                <Paragraph>Cuenta:</Paragraph>
                <Paragraph>{fields.account}</Paragraph>
              </Div>
            </Grid>
          )}
        </Grid>
        <Grid item xs justifyContent="space-evenly" spacing={"2px"}>
          <Grid item xs>
            <Button onClick={() => navegar("editar")}>Editar Datos</Button>
          </Grid>
          <Grid item xs>
            <Button onClick={() => navegar("cambiar-contrasena")}>
              Cambiar Contraseña
            </Button>
          </Grid>
          {usuario.rol === "ROLE_GUEST" && (
            <Grid item sx>
              <Button onClick={() => borrarUsuario()} color="error">
                Borrar Usuario
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
