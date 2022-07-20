import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Typography from "@mui/material/Typography";
import { useInputsForm } from "Hooks/Inputhooks";
import StepLabel from "@mui/material/StepLabel";
import { formatDate } from "components/util/functions";
import {
  FormTextfield,
  PasswordTextfield,
  DatePicker,
} from "components/atom/Textfield";
import { Grid, MenuItem, FormControl, InputLabel } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Button } from "components/atom/Button";
import { NewReserveAndRegister } from "../NewHousing";
import {
  Columna,
  Form,
  H1,
  ErrorLabel,
  EmptyLabel,
} from "components/organism/FormModal/StyledComponents";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import IconSelector from "../../molecule/IconSelector";

const steps = [
  "Información del usuario",
  "Información de alojamiento",
  "Finalizar",
];

export default function RegisterHost({ submit }) {
  const navegar = useNavigate();
  const [fields, handleFieldChange, changeField] = useInputsForm({
    skipped: new Set(),
    activeStep: 0,
    alias: "",
    email: "",
    contra: "",
    apellido: "",
    nombre: "",
    telefono: "",
    bank: "",
    account: "",
    fechaNacimiento: new Date(
      new Date().setFullYear(new Date().getFullYear() - 18)
    ),
    avatar: 0,
    apiError: "",
    locCoordinates: [],
    locCountry: [],
    locRegion: [],
    accPrice: [],
    locStreet: [],
    imagenes: [],
    locDoorNumber: [],
    accName: [],
    accDescription: [],
    usuarioRegistrado: false,
  });
  const [servicios, setServicios] = React.useState([]);
  const [caracteristicas, setCaracteristicas] = React.useState([]);
  const [avatar, setAvatar] = React.useState(0);

  const callSubmit = () => {
    submit(
      fields.alias,
      fields.email,
      fields.contra,
      fields.apellido,
      fields.nombre,
      fields.telefono,
      fields.avatar,
      formatDate(new Date(fields.fechaNacimiento)),
      fields.bank,
      fields.account,
      fields.locCoordinates,
      fields.places,
      fields.accPrice,
      fields.locStreet,
      fields.imagenes,
      fields.locDoorNumber,
      fields.accName,
      fields.accDescription,
      servicios,
      caracteristicas
    )
      .then((response) => {
        console.log(response);

        changeField("apiError", "");
        navegar("/completado/registro-anfitrion");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          changeField("apiError", "Datos incorrectos");
        } else {
          changeField("apiError", err.response.data);
        }
      });
  };

  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return fields.skipped.has(step);
  };

  const handleNext = () => {
    if (fields.activeStep === 0) {
      if (
        fields.alias === "" ||
        fields.email === "" ||
        fields.contra === "" ||
        fields.apellido === "" ||
        fields.nombre === "" ||
        fields.telefono === "" ||
        fields.bank === "" ||
        fields.account === "" ||
        fields.fechaNacimiento === {}
      ) {
        changeField("apiError", "Debe completar todos los campos");
        return;
      } else {
        changeField("apiError", "");
      }
    }

    let newSkipped = fields.skipped;
    if (isStepSkipped(fields.activeStep)) {
      newSkipped = new Set(newSkipped.values());

      newSkipped.delete(fields.activeStep);
    }
    changeField("activeStep", fields.activeStep + 1);

    changeField("skipped", newSkipped);
  };

  const handleBack = () => {
    changeField("activeStep", fields.activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(fields.activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    changeField("activeStep", fields.activeStep + 1);
    const newSkipped = new Set(fields.skipped.values());
    newSkipped.add(fields.activeStep);

    changeField("skipped", newSkipped);
  };
  const handleReset = () => {
    changeField("activeStep", 0);
  };

  const datosAnfitrion = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px",
          width: "100%",
          minHeight: "50vh",
          marginTop: "2%",

          height: "100%",
        }}
      >
        <Columna sx={{ minHeight: "50vh" }}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            <H1>Registro</H1>
            <Box
              sx={{
                marginInline: "5%",
                minHeight: "50vh",
                width: "80%",
                margin: "auto",
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="stretch"
                sx={{ px: 2 }}
                style={{ width: "100%", height: "100%" }}
                spacing={2}
              >
                <Grid item sm sx={{ mt: 2 }}>
                  <p>Elige un avatar:</p>
                  <IconSelector avatar={avatar} setAvatar={setAvatar} />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={0}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                columns={12}
              >
                <Grid item container direction="column" xs spacing={6}>
                  <Grid item xs>
                    <FormTextfield
                      id="alias"
                      onChange={handleFieldChange}
                      nombre="Alias"
                      value={fields.alias}
                    />
                  </Grid>
                  <Grid item xs>
                    <FormTextfield
                      id="nombre"
                      onChange={handleFieldChange}
                      nombre="Nombre"
                      value={fields.nombre}
                    />
                  </Grid>
                  <Grid item xs>
                    <PasswordTextfield
                      id="contra"
                      onChange={handleFieldChange}
                      nombre="Contraseña"
                      value={fields.contra}
                    />
                  </Grid>
                  <Grid item xs>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Banco
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="bank"
                        name="bank"
                        value={fields.bank}
                        onChange={(e) => {
                          changeField("bank", e.target.value);
                        }}
                        fullWidth
                        label="Banco"
                      >
                        <MenuItem value={"SANTANDER"}>SANTANDER</MenuItem>
                        <MenuItem value={"BROU"}>BROU</MenuItem>
                        <MenuItem value={"BBVA"}>BBVA</MenuItem>
                        <MenuItem value={"ITAU"}>ITAU</MenuItem>
                        <MenuItem value={"SCOTIABANK"}>SCOTIABANK</MenuItem>
                        <MenuItem value={"HSBC"}>HSBC</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs>
                    <FormTextfield
                      id="telefono"
                      onChange={handleFieldChange}
                      nombre="Teléfono/Celular"
                      value={fields.telefono}
                    />
                  </Grid>
                </Grid>
                <Grid item container direction="column" xs spacing={7}>
                  <Grid item xs>
                    <FormTextfield
                      id="email"
                      onChange={handleFieldChange}
                      nombre="Correo electrónico"
                      value={fields.email}
                    />
                  </Grid>
                  <Grid item xs>
                    <FormTextfield
                      id="apellido"
                      onChange={handleFieldChange}
                      nombre="Apellido"
                      value={fields.apellido}
                    />
                  </Grid>

                  <Grid item xs>
                    <DatePicker
                      id="fechaNacimiento"
                      label="Fecha de nacimiento"
                      fecha={fields.fechaNacimiento}
                      format="DD/MM/YYYY"
                      mayorDeEdad={true}
                      minDate={new Date("1/1/2004").toString()}
                      onChange={(e) => {
                        changeField("fechaNacimiento", e);
                      }}
                      value={fields.fechaNacimiento}
                    ></DatePicker>
                  </Grid>

                  <Grid item xs>
                    <FormTextfield
                      id="account"
                      onChange={handleFieldChange}
                      nombre="Numero de cuenta"
                      value={fields.account}
                    />
                  </Grid>
                  <Grid item xs></Grid>
                </Grid>
              </Grid>
            </Box>
          </Form>
        </Columna>
      </Box>
    );
  };

  const datosAlojamiento = () => {
    return (
      <NewReserveAndRegister
        fields={fields}
        handleFieldChange={handleFieldChange}
        changeField={changeField}
        servicios={servicios}
        setServicios={setServicios}
        setCaracteristicas={setCaracteristicas}
        caracteristicas={caracteristicas}
      ></NewReserveAndRegister>
    );
  };

  const finalizar = () => {
    return (
        <>
          <p>Gracias por tu interés en registrarte en Go&Rent.
            Tras enviar este formulario, un administrador debe confirmar la cuenta antes de que puedas ingresar sesión.
            Una vez confirmada, podrás ingresar sesión en la plataforma, y empezar a recibir reservas en tus alojamientos registrados</p>
        </>
    );
  };

  const renderSwitch = (key) => {
    switch (key) {
      case 0:
        return datosAnfitrion();
      case 1:
        return datosAlojamiento();
      case 2:
        return finalizar();
      default:
        return <div></div>;
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "50vh",
        marginTop: 0,
        marginBottom: "auto",
      }}
    >
      {fields.usuarioRegistrado ? (
        <Typography></Typography>
      ) : (
        <>
          <Box
            sx={{
              width: "80%",
              height: "100%",
              minHeight: "50vh",
              marginTop: 0,
              alignContent: "center",
              margin: "auto",
            }}
          >
            <Stepper activeStep={fields.activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {fields.activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {renderSwitch(fields.activeStep)}

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={fields.activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Volver
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {isStepOptional(fields.activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Saltar
                    </Button>
                  )}
                  {fields.apiError !== "" ? (
                    <ErrorLabel>{fields.apiError}</ErrorLabel>
                  ) : (
                    <EmptyLabel />
                  )}

                  {fields.activeStep === steps.length - 1 ? (
                    <Button onClick={callSubmit}> Finalizar</Button>
                  ) : (
                    <Button onClick={handleNext}> Siguiente</Button>
                  )}
                </Box>
              </React.Fragment>
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "fit-content",
              top: 0,
              alignContent: "center",
            }}
          ></Box>
        </>
      )}
    </Box>
  );
}
