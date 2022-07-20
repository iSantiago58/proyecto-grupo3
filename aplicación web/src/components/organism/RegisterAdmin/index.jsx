import React from "react";
import {
  FormTextfield,
  PasswordTextfield,
  DatePicker,
} from "components/atom/Textfield";
import { Form } from "../FormModal/StyledComponents";
import { useInputFormHook } from "../../../Hooks/Inputhooks";
import { Button } from "../../atom/Button";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { BtnContainer, H1, EmptyLabel, ErrorLabel } from "./StyledComponents";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Avatar from "@mui/material/Avatar";
import { green, pink, red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { formatDate } from "components/util/functions";

export default function RegisterAdmin({ submit }) {
  const [contrasena, setContrasena, , controlContrasena] = useInputFormHook({});

  const [nombre, setNombre, nombreError, controlNombre] = useInputFormHook({
    nombre: {
      msg: "El nombre es muy corto",
    },
    tamMin: 4,
  });
  const [alias, setAlias, aliasError, controlAlias] = useInputFormHook({
    alias: {
      msg: "El alias es incorrecto",
    },
  });
  const [email, setEmail, emailError, controlEmail] = useInputFormHook({
    email: {
      msg: "El formato de email es incorrecto",
    },
  });

  const [apellido, setApellido, apellidoError, controlApellido] =
    useInputFormHook({});

  const [telefono, setTelefono, telefonoError, controlTelefono] =
    useInputFormHook({});

  const [fechaNacimiento, setFechaNacimiento, , ,] = useInputFormHook(
    {},
    new Date(new Date().setFullYear(new Date().getFullYear() - 18))
  );

  const [apiError, setApiError] = React.useState("");

  const [avatar, setAvatar, ,] = useInputFormHook({});

  return (
    <Box
      sx={{
        width: "70%",
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#ffffff",

        padding: "4%",
        paddingTop: "0",
        margin: "auto",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "3px",
      }}
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(fechaNacimiento);

          console.log(formatDate(fechaNacimiento));
          submit(
            alias,
            nombre,
            apellido,
            contrasena,
            email,
            telefono,
            avatar,
            formatDate(fechaNacimiento)
          )
            .then((response) => {
              setApiError("");
            })
            .catch((err) => {
              if (err.response.status === 401) {
                setApiError("Datos incorrectos");
              }
            });
          return false;
        }}
      >
        <H1>Registrar administrador</H1>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <FormTextfield
              id="alias"
              onChange={(e) => {
                setAlias(e.target.value);
              }}
              error={aliasError}
              onBlur={controlAlias}
              nombre="Alias"
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              error={emailError}
              onBlur={controlEmail}
              nombre="Correo electrónico"
            />
          </Grid>

          <Grid item xs={6}>
            <PasswordTextfield
              id="contra"
              onChange={(e) => {
                setContrasena(e.target.value);
              }}
              onBlur={controlContrasena}
              nombre="Contraseña"
            />
          </Grid>

          <Grid item xs={6}>
            <FormTextfield
              id="nombre"
              onChange={(e) => {
                setNombre(e.target.value);
              }}
              error={nombreError}
              onBlur={controlNombre}
              nombre="Nombre"
            />
          </Grid>

          <Grid item xs={6}>
            <FormTextfield
              id="apellido"
              onChange={(e) => {
                setApellido(e.target.value);
              }}
              error={apellidoError}
              onBlur={controlApellido}
              nombre="Apellido"
            />
          </Grid>

          <Grid item xs={6}>
            <FormTextfield
              id="telefono"
              onChange={(e) => {
                setTelefono(e.target.value);
              }}
              error={telefonoError}
              onBlur={controlTelefono}
              nombre="Teléfono/Celular"
            />
          </Grid>

          <Grid item xs={6}>
            <DatePicker
              label="Fecha de nacimiento"
              fecha={fechaNacimiento}
              onChange={(newValue) => {
                console.log(newValue);
                setFechaNacimiento(newValue);
              }}
              mayorDeEdad={true}
            ></DatePicker>
          </Grid>

          <Grid item xs={6}>
            <IconButton onClick={() => setAvatar(1)}>
              <Avatar
                sx={{ bgcolor: green[500] }}
                style={{
                  border: avatar === 1 ? "2px solid black" : "",
                }}
              >
                <AssignmentIcon />
              </Avatar>
            </IconButton>
            <IconButton onClick={() => setAvatar(2)}>
              <Avatar
                sx={{ bgcolor: pink[600] }}
                style={{
                  border: avatar === 2 ? "2px solid black" : "",
                }}
              >
                <AssignmentIcon />
              </Avatar>
            </IconButton>
            <IconButton onClick={() => setAvatar(3)}>
              <Avatar
                sx={{ bgcolor: red[700] }}
                style={{
                  border: avatar === 3 ? "2px solid black" : "",
                }}
              >
                <AssignmentIcon />
              </Avatar>
            </IconButton>
          </Grid>
          {apiError !== "" ? (
            <ErrorLabel>{apiError}</ErrorLabel>
          ) : (
            <EmptyLabel />
          )}
          <BtnContainer>
            <Button size="ultrasmall" type="submit">
              Crear Admin
            </Button>
          </BtnContainer>
        </Grid>
      </Form>
    </Box>
  );
}
