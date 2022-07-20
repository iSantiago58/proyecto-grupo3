import * as React from "react";
import ModalBasico from "components/atom/Modal";
import { useInputFormHook } from "Hooks/Inputhooks";
import {
  FormTextfield,
  PasswordTextfield,
  DatePicker,
} from "components/atom/Textfield";
import { Button } from "components/atom/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Avatar from "@mui/material/Avatar";
import { green, pink, red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { formatDate } from "components/util/functions";
import { Divider } from "@mui/material";
import { useInputsForm } from "Hooks/Inputhooks";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {
  FormContainer,
  Columna,
  Imagen,
  Titulo,
  Form,
  InputsContainer,
  H1,
  BtnContainer,
  Pregunta,
  BtnRow,
  ErrorLabel,
  EmptyLabel,
} from "./StyledComponents";

import { FormRequestCode, FormSendCode, FormChangePassword } from "../Forms";
import { Label } from "@mui/icons-material";
import IconSelector from "../../molecule/IconSelector";

export default function LoginModal({
  abrirModal = false,
  onCloseModal,
  onOlvidaste,
  onPrincipal,
  onSecundario1,
  onSecundario2,
  cerrarModal,
  setUsuario,
}) {
  const navegar = useNavigate();

  const [email, setEmail, emailError, controlEmail] = useInputFormHook({
    email: {
      msg: "El formato de email es incorrecto",
    },
  });
  const [contrasena, setContrasena, , controlContrasena] = useInputFormHook({});

  const [apiError, setApiError] = React.useState("");

  return (
    <ModalBasico
      abrirModal={abrirModal}
      onCloseModal={() => {
        onCloseModal();
        setEmail("");
        setContrasena("");
      }}
    >
      <FormContainer>
        <Columna>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              onPrincipal(email, contrasena)
                .then((response, status) => {
                  setApiError("");

                  setUsuario(response.data);
                  cerrarModal();

                  navegar("/");
                })
                .catch((err) => {
                  setApiError(err.response.data.mensaje);
                });
              return false;
            }}
          >
            <H1>Ingresar Sesión</H1>
            <InputsContainer>
              <FormTextfield
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                error={emailError}
                onBlur={controlEmail}
                nombre="Correo electronico"
              ></FormTextfield>
              <PasswordTextfield
                id="contra"
                onChange={(e) => {
                  setContrasena(e.target.value);
                }}
                onBlur={controlContrasena}
                nombre="Contraseña"
              />
            </InputsContainer>
            {apiError !== "" ? (
              <ErrorLabel>{apiError}</ErrorLabel>
            ) : (
              <EmptyLabel />
            )}
            <Pregunta
              onClick={(e) => {
                onOlvidaste();
                cerrarModal();
              }}
            >
              ¿Olvidaste la contraseña?
            </Pregunta>
            <BtnContainer>
              <Button type="submit" width={70}>
                Iniciar Sesion
              </Button>
            </BtnContainer>
            <Divider />
            <Divider />

            <Typography>Registrarse como</Typography>
            <BtnRow>
              <Button
                id="registro-anfitrion"
                onClick={() => {
                  onSecundario1();
                  cerrarModal();
                }}
              >
                Anfitrion
              </Button>
              <Button
                onClick={() => {
                  onSecundario2();
                  cerrarModal();
                }}
              >
                Huésped
              </Button>
            </BtnRow>
          </Form>
        </Columna>
        <Imagen rel="preload" />
      </FormContainer>
    </ModalBasico>
  );
}

export function RegistroHModal({
  abrirModal = false,
  onCloseModal,
  direction = "left",
  onPrincipal,
  cerrarModal,
  backTo,
}) {
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

  const [fechaNacimiento, setFechaNacimiento] = useInputFormHook({});

  const [apiError, setApiError] = React.useState("");

  const [avatar, setAvatar, ,] = useInputFormHook({});

  const back = () => {
    backTo(true);

    cerrarModal(false);
  };

  return (
    <ModalBasico
      abrirModal={abrirModal}
      onCloseModal={() => {
        onCloseModal();
        setEmail("");
        setContrasena("");
      }}
    >
      <Columna>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onPrincipal(
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
                cerrarModal();
              })
              .catch((err) => {
                if (err.response.status == 401) {
                  setApiError("Datos incorrectos");
                }
              });
            return false;
          }}
        >
          <H1>Registro</H1>
          <Box sx={{ marginInline: "5%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              columns={12}
            >
              <Grid item xs={6}>
                <div>
                  <small>Elige un avatar:</small>
                  <IconSelector avatar={avatar} setAvatar={setAvatar} />
                </div>
              </Grid>
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
                    setFechaNacimiento(newValue);
                  }}
                ></DatePicker>
              </Grid>
              {apiError !== "" ? (
                <ErrorLabel>{apiError}</ErrorLabel>
              ) : (
                <EmptyLabel />
              )}
              <BtnContainer>
                <Grid container justifyContent="space-between" spacing={2}>
                  <Grid item xs>
                    <Button onClick={back}>Volver</Button>
                  </Grid>
                  <Grid item xs={8}>
                    <Button type="submit">Registrar</Button>
                  </Grid>
                </Grid>
              </BtnContainer>
            </Grid>
          </Box>
        </Form>
      </Columna>
    </ModalBasico>
  );
}

export function RegistroAModal({
  abrirModal = false,
  onCloseModal,
  direction = "left",
  onPrincipal,
  cerrarModal,
  backTo,
}) {
  const [, setContrasena, , controlContrasena] = useInputFormHook({});

  const [, setNombre, nombreError, controlNombre] = useInputFormHook({
    nombre: {
      msg: "El nombre es muy corto",
    },
    tamMin: 4,
  });
  const [, setAlias, aliasError, controlAlias] = useInputFormHook({
    alias: {
      msg: "El alias es incorrecto",
    },
  });
  const [, setEmail, emailError, controlEmail] = useInputFormHook({
    email: {
      msg: "El formato de email es incorrecto",
    },
  });

  const [, setApellido, apellidoError, controlApellido] = useInputFormHook({});

  const [, setTelefono, telefonoError, controlTelefono] = useInputFormHook({});

  const [fechaNacimiento, setFechaNacimiento, , ,] = useInputFormHook({});

  const [apiError] = React.useState("");

  const [avatar, setAvatar, ,] = useInputFormHook({});
  const back = () => {
    backTo(true);

    cerrarModal(false);
  };

  //CSS
  let left = 0;
  let right = 0;
  let direccion = "alternate";
  let posImagen;

  if (direction == "left") {
    posImagen = "row";
    right = 4;
    left = "sds";

    direccion = "alternate-reverse";
  } else {
    posImagen = "row-reverse";
    left = 4;
    right = "sds";
  }
  return (
    <ModalBasico
      abrirModal={abrirModal}
      onCloseModal={() => {
        onCloseModal();
        setEmail("");
        setContrasena("");
      }}
    >
      <FormContainer posImagen={posImagen}>
        <Columna>
          <Form action="/" method="POST" onSubmit={onPrincipal}>
            <H1>Registro</H1>
            <Box sx={{ marginInline: "5%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                columns={12}
              >
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
                      setFechaNacimiento(newValue);
                    }}
                  ></DatePicker>
                </Grid>

                <Grid item xs={6}>
                  <IconButton onClick={() => setAvatar(1)}>
                    <Avatar
                      sx={{ bgcolor: green[500] }}
                      style={{
                        border: avatar == 1 ? "2px solid black" : "",
                      }}
                    >
                      <AssignmentIcon />
                    </Avatar>
                  </IconButton>
                  <IconButton onClick={() => setAvatar(2)}>
                    <Avatar
                      sx={{ bgcolor: pink[600] }}
                      style={{
                        border: avatar == 2 ? "2px solid black" : "",
                      }}
                    >
                      <AssignmentIcon />
                    </Avatar>
                  </IconButton>
                  <IconButton onClick={() => setAvatar(3)}>
                    <Avatar
                      sx={{ bgcolor: red[700] }}
                      style={{
                        border: avatar == 3 ? "2px solid black" : "",
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
                  <Button onClick={back} width={40}>
                    Iniciar Sesión
                  </Button>

                  <Button type="submit" width={40}>
                    Registrar
                  </Button>
                </BtnContainer>
              </Grid>
            </Box>
          </Form>
        </Columna>

        <Imagen rel="preload" direccion={direccion}>
          <Titulo left={left} right={right}>
            Anfitrion
          </Titulo>
        </Imagen>
      </FormContainer>
    </ModalBasico>
  );
}
export function CambioCModal({
  abrirModal = false,
  onCloseModal,
  cerrarModal,
  backTo,
  children,
}) {
  const [fields, handleFieldChange, changeField] = useInputsForm({
    step: 0,
    email: "",
    codigo: "",
  });
  const back = () => {
    backTo(true);
    changeField("step", 0);
    changeField("email", "");
    changeField("codigo", "");
    cerrarModal(false);
  };
  const stepName = [
    "Recuperar Contraseña",
    "Ingrese el codigo recibido al correo",
    "Cambie la contraseña",
  ];

  let direccion = "alternate";
  let posImagen;

  posImagen = "row";

  direccion = "alternate-reverse";

  return (
    <ModalBasico abrirModal={abrirModal} onCloseModal={back}>
      <FormContainer posImagen={posImagen}>
        <Columna>
          <H1>{stepName[fields.step]}</H1>
          {(() => {
            switch (fields.step) {
              case 0:
                return (
                  <FormRequestCode onBack={back} setFields={changeField} />
                );
              case 1:
                return (
                  <FormSendCode
                    onBack={back}
                    setFields={changeField}
                    email={fields.email}
                  />
                );
              case 2:
                return (
                  <FormChangePassword
                    onBack={back}
                    setFields={changeField}
                    email={fields.email}
                    codigo={fields.codigo}
                  ></FormChangePassword>
                );
              case 3:
                return (
                  <Grid
                    display="flex"
                    alignItems="center"
                    container
                    direction="column"
                    justifyContent="center"
                    sx={{ width: "100%", height: "100%" }}
                  >
                    <Grid item>
                      <VpnKeyIcon size="large"></VpnKeyIcon>
                    </Grid>
                    <Grid item>
                      <Typography>Contraseña modificada</Typography>
                    </Grid>
                  </Grid>
                );
            }
          })()}
        </Columna>
        <Imagen rel="preload" direccion={direccion} />
      </FormContainer>
    </ModalBasico>
  );
}
export function ReservarAlojamiento({
  abrirModal = true,
  onCloseModal,
  cerrarModal,
  children,
  submit,
  reserva,
}) {
  const [apiError, setApiError] = React.useState("");

  const back = () => {
    cerrarModal(false);
  };
  //CSS
  let left = 0;
  let right = 0;
  let direccion = "alternate";
  let posImagen;

  posImagen = "row";
  right = 4;
  left = "sds";

  direccion = "alternate-reverse";

  console.log(reserva);
  console.log(reserva.fecha.endDate);
  const days = (date_1, date_2) => {
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };
  let pago = -days(reserva.fecha.startDate, reserva.fecha.endDate);
  return (
    <ModalBasico
      sx={{ height: "70%", width: "100%" }}
      abrirModal={abrirModal}
      onCloseModal={back}
      justifyContent
    >
      <FormContainer posImagen={posImagen}>
        <Columna>
          <Form
            action="/"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <H1>Reserva</H1>
            <Box sx={{ marginInline: "5%" }}>
              <Grid container rowSpacin columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid
                  item
                  xs={10}
                  justifyContent={"center"}
                  alignContent={"100%"}
                  width={"100%"}
                >
                  <Typography
                    variant={"h5"}
                    marginBottom={"10px"}
                    justifyContent={"center"}
                    alignContent={"center"}
                    textAlign={"center"}
                  >
                    ¿Desea confirmar la reserva?
                  </Typography>
                </Grid>
                <Grid item xs={10} marginBottom={"10px"}>
                  <Typography>
                    ${reserva.datos.accommodation.price} por noche
                  </Typography>
                </Grid>
                <Grid item xs={10} marginBottom={"10px"}>
                  <Typography>Noches reservadas : {pago}</Typography>
                </Grid>
                <Grid item xs={10} marginBottom={"10px"}>
                  <Typography>
                    Total : ${reserva.datos.accommodation.price * pago}
                  </Typography>
                </Grid>
                {apiError !== "" ? (
                  <ErrorLabel>{apiError}</ErrorLabel>
                ) : (
                  <EmptyLabel />
                )}
                <Grid item xs={10} justifyContent={"center"} width="100%">
                  <BtnContainer>
                    <Button onClick={back} width={40}>
                      Cancelar
                    </Button>

                    <Button type="submit" width={40}>
                      Aceptar
                    </Button>
                  </BtnContainer>
                </Grid>
              </Grid>
            </Box>
          </Form>
        </Columna>
      </FormContainer>
    </ModalBasico>
  );
}
