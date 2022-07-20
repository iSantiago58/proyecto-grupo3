import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  NativeSelect,
  Box,
  Rating,
  Container,
  Divider,
} from "@mui/material";
import TextField from "components/atom/Textfield";
import React from "react";
import { DateRange } from "react-date-range";
import * as locales from "react-date-range/dist/locale";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "components/atom/Button";
import Api from "server/Api";
import { useLocalStorage } from "Hooks/LocalStoreHook";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {
  calcularEstado,
  cambiarFormatoFecha,
  obtenerDate,
} from "components/util/functions";
import { db, firebaseConfig } from "server/Firebase";
import firebase from "firebase/compat/app";

firebase.initializeApp(firebaseConfig);

const Reserva = ({ reserva }) => {
  const api = new Api();
  const [usuario] = useLocalStorage("usuario", "");

  const [rating, setRating] = React.useState(reserva.guestQualification);
  const [estado, setEstado] = React.useState(reserva.bookingStatus);

  const aceptarReserva = async () => {
    const response = await api.confirmarReserva({
      booking_id: reserva.bookingId,
    });

    if (response.status === 200) {
      setEstado("ACEPTADA");
      const [dayI, monthI, yearI] = reserva.startDate.split("/");
      const [dayF, monthF, yearF] = reserva.endDate.split("/");
      const mensajeDefecto = "Reserva Confirmada";
      const id =
        `${reserva.guestAlias}` +
        "-" +
        `${usuario.alias}` +
        "-" +
        `${reserva.accommodationId}` +
        "-" +
        `${reserva.bookingId}`;
      await setDoc(doc(db, "chats", id), {
        anfitrion: usuario.alias,
        fechaFinReserva: Timestamp.fromDate(
          new Date(+yearF, monthF - 1, +dayF)
        ),
        fechaInicioReserva: Timestamp.fromDate(
          new Date(+yearI, monthI - 1, +dayI)
        ),
        huesped: reserva.guestAlias,
        idAlojamiento: reserva.accommodationId,
        idReserva: reserva.bookingId,
        nombreAlojamiento: reserva.accommodationName,
      });
      await addDoc(collection(db, "chats", id, "mensajes"), {
        texto: mensajeDefecto,
        de: usuario.alias,
        para: reserva.guestAlias,
        fechaCreacion: Timestamp.fromDate(new Date()),
      });

      await setDoc(doc(db, "ultimosMsg", id), {
        texto: mensajeDefecto,
        para: reserva.guestAlias,
        de: usuario.alias,
        fechaCreacion: Timestamp.fromDate(new Date()),
        noLeido: true,
      }).then(() => console.log("seteo"));
    }
  };
  const rechazarReserva = () => {
    api.rechazarReserva({ booking_id: reserva.bookingId });
    setEstado("CANCELADA");
  };
  const rembolsarReserva = async () => {
    const response = await api.rembolsarReserva({
      booking_id: reserva.bookingId,
      reimbursedBy: "HOST",
    });

    if (response.status === 200) {
      setEstado("CANCELADA");

      const id =
        `${reserva.guestAlias}` +
        "-" +
        `${usuario.alias}` +
        "-" +
        `${reserva.accommodationId}` +
        "-" +
        `${reserva.bookingId}`;
      let date = new Date();
      date.setFullYear(date.getFullYear() - 1);
      await updateDoc(doc(db, "chats", id), {
        fechaFinReserva: Timestamp.fromDate(date),
      });
    }
  };
  /*
    accommodationId: 18;
    accommodationName: "Alojamiento 15 Anfitrion 1";
    bookingId: 29;
    bookingStatus: "PENDIENTE";
    endDate: "17/08/2022";
    guestAlias: "edwin";
    guestEmail: "edwin@test.com";
    guestName: "Edwin";
    guestPhone: "099999999";
    guestQualification: 0;
    paymentStatus: "PENDIENTE";
    startDate: "16/08/2022";
    */
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
    <Paper
      elevation={6}
      sx={{ marginBottom: "5px", marginTop: "5px", padding: "0 15px" }}
    >
      <Box p={1} flexDirection={"row"}>
        <Typography sx={{ textAlign: "end" }}>
          Estado: {estadoActual}
        </Typography>{" "}
        <Divider />
        <Grid container direction="row" spacing={2}>
          <Grid item xs>
            <Box>
              <Grid container direction="row" spacing={2} wrap={"nowrap"}>
                <Grid item xs>
                  <Typography>
                    <strong>Nombre:</strong> {reserva.guestName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs>
                <Typography>
                  <strong>Alias:</strong> {reserva.guestAlias}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography>
                  <strong>Contacto:</strong> {reserva.guestPhone}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography>
                  <strong>Email:</strong> {reserva.guestEmail}
                </Typography>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs>
            <Typography>
              <strong>Período de Reserva</strong>
            </Typography>
            <Typography>
              {reserva.startDate} hasta {reserva.endDate}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ marginBlock: "10px" }} />
        {estadoActual === "PENDIENTE" && (
          <Grid
            container
            direction="row"
            spacing={2}
            justifyContent={"space-evenly"}
          >
            <Grid item xs>
              <Button onClick={aceptarReserva}>Aceptar</Button>
            </Grid>
            <Grid item xs>
              <Button onClick={rechazarReserva}>Rechazar</Button>
            </Grid>
          </Grid>
        )}
        {estadoActual === "COMPLETADA" && (
          <Container fixed>
            <Grid
              container
              direction="row"
              spacing={2}
              justifyContent={"space-evenly"}
            >
              <Grid item xs>
                <Typography>Calificar Huésped</Typography>
              </Grid>
              <Grid item xs>
                <Rating
                  value={rating}
                  onChange={(e) => {
                    let val = e.target.value;

                    if (Number(val) === rating) {
                      val = 0;
                      api.eliminarCalificacionHuesped(reserva.guestAlias);
                    } else {
                      api.calificarHuesped({
                        qualifiedUser: reserva.guestAlias,
                        qualification: val,
                      });
                    }
                    setRating(Number(val));
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        )}
        {estadoActual === "ACEPTADA" && (
          <Container fixed>
            <Grid
              container
              direction="row"
              spacing={2}
              justifyContent={"space-evenly"}
            >
              <Grid item xs>
                <div style={{ width: "50%" }}>
                  <Button onClick={rembolsarReserva}>Reembolsar</Button>
                </div>
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
    </Paper>
  );
};

export default function FiltroReservas({ idAlojamiento, reservas }) {
  const [buscar, setbuscar] = React.useState("");
  const [select, setSelect] = React.useState("TODOS");
  const [fecha, setFecha] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filtrar</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ marginTop: "10px" }}
          >
            <Grid item>
              <TextField
                type="text"
                placeholder="Buscar"
                label="Buscar"
                value={buscar}
                onChange={(e) => setbuscar(e.target.value)}
              />
            </Grid>
            <Grid item>
              <div>
                <label htmlFor="">Estado:</label>
              </div>
              <NativeSelect
                value={select}
                inputProps={{
                  name: "age",
                  id: "uncontrolled-native",
                }}
                sx={{ height: "100%" }}
                onChange={(e) => {
                  setSelect(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option value={"TODOS"}>Todos</option>
                <option value={"PENDIENTE"}>Pendientes</option>
                <option value={"ACEPTADA"}>Aceptadas</option>
                <option value={"RECHAZADA"}>Rechazadas</option>
                <option value={"CANCELADA"}>Canceladas</option>RECHAZADA Nombre:
                Ana Alias: AnitaGG57 Contacto: 96574893 Email:
                anitagg57galante@gmail.com Período de Reserva
                <option value={"COMPLETADA"}>Completada</option>
              </NativeSelect>
            </Grid>
            <Grid item>
              <div>
                <label htmlFor="">Filtrar por Rango:</label>
              </div>
              <DateRange
                style={{ paddingLeft: "0 !important" }}
                editableDateInputs={true}
                locale={locales["es"]}
                key="datefilter"
                onChange={(ranges) => {
                  const { selection } = ranges;
                  setFecha([selection]);
                }}
                ranges={fecha}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {typeof reservas != "undefined" &&
        reservas.length > 0 &&
        reservas.map(function (reserva, index) {
          if (reserva.accommodationId === idAlojamiento) {
            console.log(reserva.paymentStatus);
            console.log(calcularEstado(reserva));
            console.log(reserva.startDate);
            console.log(obtenerDate(reserva.endDate));
            console.log(reserva.endDate);
            console.log(obtenerDate(reserva.endDate));
            console.log(fecha[0].endDate);
            console.log(obtenerDate(reserva.endDate) === fecha[0].endDate);

            console.log(obtenerDate(reserva.endDate));
            console.log(new Date());
            console.log(fecha[0].startDate === new Date());

            if (
              (select === "TODOS" || select === calcularEstado(reserva)) &&
              (buscar === "" ||
                reserva.guestEmail.includes(buscar) ||
                reserva.guestName.includes(buscar) ||
                reserva.guestPhone.includes(buscar) ||
                reserva.guestAlias.includes(buscar) ||
                reserva.accommodationName.includes(buscar)) &&
              ((fecha[0].startDate.getFullYear() === new Date().getFullYear() &&
                fecha[0].startDate.getMonth() === new Date().getMonth() &&
                fecha[0].startDate.getDate() === new Date().getDate() &&
                fecha[0].endDate.getFullYear() === new Date().getFullYear() &&
                fecha[0].endDate.getMonth() === new Date().getMonth() &&
                fecha[0].endDate.getDate() === new Date().getDate()) ||
                (obtenerDate(reserva.startDate) < fecha[0].startDate &&
                  obtenerDate(reserva.endDate) > fecha[0].endDate))
            ) {
              console.log(reserva);
              return <Reserva key={index} reserva={reserva} />;
            }
          }
        })}
    </>
  );
}
