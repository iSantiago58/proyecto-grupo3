import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Divider,
  Chip,
  Stack,
  Card,
} from "@mui/material";
import { Button } from "components/atom/Button";
import { useNavigate } from "react-router-dom";
import Api from "server/Api";
import Rating from "@mui/material/Rating";
import FiltroReservas from "../FiltroReservas";
import { RateReview } from "@mui/icons-material";
import TextField from "components/atom/Textfield";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ListaReviews from "components/molecule/ListaReviews";

export default function InfoAlojamiento({
  alojamientoId,
  alojamiento,
  reservas,
}) {
  console.log(alojamiento);
  const navegar = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Grid item xs sx={{ textAlign: "left", minHeight: "500px" }}>
      <Paper variant="o" elevation={0}>
        <Grid
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            flexFlow: "column nowrap",
            alignContent: "stretch",
            justifyContent: "center",
            alignItems: "stretch",
            padding: "10px",
          }}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "#000",
                border: "2px solid #000",
                background: "#fff",
                boxShadow: 24,
                p: 4,
              }}
            >
              {alojamiento.reviews.length > 0 ? (
                <ListaReviews reviews={alojamiento.reviews}></ListaReviews>
              ) : (
                <Typography>Actualmente sin reseñas</Typography>
              )}
            </Box>
          </Modal>
          <Grid item xs>
            <Paper elevation={2}>
              <Typography
                variant="h4"
                gutterBottom
                component="div"
                sx={{ textAlign: "center" }}
              >
                {alojamiento.accommodation.name}{" "}
                <Rating
                  name="read-only"
                  value={alojamiento.accommodation.qualification}
                  readOnly
                />
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Typography sx={{ fontWeight: 600, textAlign: "center" }}>
              Descripcion
            </Typography>
            <Typography paragraph sx={{ textAlign: "start", width: "100%" }}>
              {alojamiento.accommodation.description}
            </Typography>
          </Grid>
          <Divider sx={{ marginY: "15px" }}>
            <Chip label={"Precio por noche"} />
          </Divider>
          <Grid item xs>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="flex-start"
            >
              <Grid item xs>
                <Typography sx={{ textAlign: "center" }}>
                  USD {alojamiento.accommodation.price}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            columns={2}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              flexFlow: "column nowrap",
              alignContent: "stretch",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <Divider sx={{ marginY: "15px" }}>
              <Chip label={"Caracteristicas"} />
            </Divider>
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              ></Grid>

              {alojamiento.features.map(function (feature, i) {
                return (
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{ marginX: "0px", marginY: "0px" }}
                  >
                    <Grid item xs>
                      <Typography>{feature.name}</Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography>{feature.value}</Typography>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
            <Divider sx={{ marginY: "15px" }}>
              <Chip label={"Servicios"} />
            </Divider>
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{ marginX: "0px", marginY: "0px" }}
              ></Grid>
              {alojamiento.services.map(function (service, i) {
                return (
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{ marginX: "0px", marginY: "0px" }}
                  >
                    <Grid item xs>
                      <Typography>{service.name}</Typography>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: "15px" }}>
          <Chip label={"Opciones"} />
        </Divider>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
          sx={{ marginY: "15px" }}
        >
          <Grid item xs>
            <div style={{ padding: "0 15px" }}>
              <Button
                onClick={() => navegar("/reservas/editar/" + alojamientoId)}
              >
                Editar
              </Button>
            </div>
          </Grid>
          <Grid item xs>
            <div style={{ padding: "0 15px" }}>
              <Button
                color="error"
                onClick={async () => {
                  let api = new Api();
                  let resultado = await api.eliminarAlojamiento(alojamientoId);
                  console.log(resultado);
                }}
              >
                Eliminar
              </Button>
            </div>
          </Grid>
          <Grid item xs>
            <div style={{ padding: "0 15px" }}>
              <Button onClick={() => handleOpen()}>Reviews</Button>
            </div>
          </Grid>
        </Grid>
        <FiltroReservas
          reservas={reservas.bookings}
          idAlojamiento={alojamientoId}
        />
      </Paper>
    </Grid>
  );
}
/*
accommodationId: 29
accommodationName: "Apartamento en Punta del Este"
accommodationPhoto: "alojamiento-29/apto5.jpg"
bookingId: 22
bookingStatus: "PENDIENTE"
endDate: "25/06/2022"
finalPrice: 118
hostAlias: "RAngelGGG"
hostEmail: "rangelgggreyes@gmail.com"
hostName: "Angel"
hostQualification: 0
paymentStatus: "PENDIENTE"
reviewDesc: null
reviewId: 0
reviewQualification: 0
startDate: "24/06/2022" s

  */

export function InfoReserva({ reservaId, reserva }) {
  const api = new Api();

  let id = reservaId;

  const [ratingHost, setRatingHost] = React.useState(reserva.hostQualification);
  const [ratingAlojamiento, setRatingAlojamiento] = React.useState(
    reserva.reviewQualification
  );
  const [estado, setEstado] = React.useState(reserva.bookingStatus);
  const [resena, setResena] = React.useState(reserva.reviewDesc);

  let estadoActual = reserva.bookingStatus;

  var datePartsEnd = reserva.endDate.split("/");
  var datePartsStart = reserva.startDate.split("/");

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

  if (
    lastDate < new Date() &&
    estadoActual === "ACEPTADA" &&
    estado !== "COMPLETADA"
  ) {
    estadoActual = "COMPLETADA";
    setEstado("COMPLETADA");
  } else if (
    lastDate < new Date() &&
    estadoActual === "PENDIENTE" &&
    estado !== "CANCELADA"
  ) {
    estadoActual = "CANCELADA";
    setEstado("CANCELADA");
  } else if (
    startDate < new Date() &&
    lastDate > new Date() &&
    estadoActual === "PENDIENTE" &&
    estado !== "EN CURSO"
  ) {
    setEstado("EN CURSO");
    estadoActual = "EN CURSO";
  }

  React.useEffect(() => {
    setRatingHost(reserva.hostQualification);
    setRatingAlojamiento(reserva.reviewQualification);
    setEstado(reserva.bookingStatus);
    if (reserva.reviewDesc === null) {
      setResena("");
    } else {
      setResena(reserva.reviewDesc);
    }
  }, [id]);

  return (
    <Grid item xs sx={{ textAlign: "left", minHeight: "500px" }}>
      <Paper variant="o" elevation={0}>
        <Grid
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            flexFlow: "column nowrap",
            alignContent: "stretch",
            justifyContent: "center",
            alignItems: "stretch",
          }}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs>
            <Paper elevation={2}>
              <Typography
                variant="h4"
                gutterBottom
                component="div"
                sx={{ textAlign: "center" }}
              >
                {reserva.accommodationName}
                <Typography>
                  <strong>Estado:</strong> {estado}
                </Typography>
                <Typography>
                  <strong>Período de Reserva:</strong>
                  {reserva.startDate} a {reserva.endDate}
                </Typography>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="flex-start"
            >
              <Grid item xs>
                <Typography sx={{ fontWeight: 600, textAlign: "center" }}>
                  <strong>Precio:</strong> USD {reserva.finalPrice}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ marginY: "15px" }}>
            <Chip label={"Reseñar Anfitrion"} />
          </Divider>{" "}
          <Grid item xs>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="flex-start"
            >
              <Grid item xs>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-evenly"
                  marginBottom={"5px"}
                >
                  <Typography>
                    <strong>Nombre:</strong>
                    {reserva.hostName}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong>
                    {reserva.hostEmail}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          {estado === "COMPLETADA" && (
            <>
              {" "}
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "center" }}
              >
                <Typography sx={{ fontWeight: 600, textAlign: "center" }}>
                  Calificar Anfitrion
                </Typography>

                <Rating
                  value={ratingHost}
                  onChange={(e) => {
                    let val = e.target.value;

                    if (Number(val) === ratingHost) {
                      val = 0;
                      api.eliminarCalificacionAnfitrion(reserva.hostAlias);
                    } else {
                      api.calificarAnfitrion({
                        qualifiedUser: reserva.hostAlias,
                        qualification: val,
                      });
                    }
                    setRatingHost(Number(val));
                  }}
                />
              </Stack>
              <Divider sx={{ marginY: "15px" }}>
                <Chip label={"Reseña Alojamiento"} />
              </Divider>
              <Grid item xs>
                <Card sx={{ padding: "10px" }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                  >
                    <Grid item xs>
                      <Stack spacing={2}>
                        <TextField
                          placeholder="reseña"
                          label="Reseñar Alojamiento"
                          value={resena}
                          onChange={(e) => {
                            setResena(e.target.value);
                          }}
                        ></TextField>

                        <Stack
                          direction="row"
                          spacing={2}
                          alignContent="space-evenly"
                          justifyContent="space-between"
                          width={"100%"}
                        >
                          <Typography
                            sx={{
                              fontWeight: 600,
                              textAlign: "center",
                              marginY: "15px",
                            }}
                          >
                            Calificación{" "}
                          </Typography>

                          <Rating
                            sx={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            value={ratingAlojamiento}
                            onChange={(e) => {
                              let val = e.target.value;

                              if (Number(val) === ratingAlojamiento) {
                                val = 0;
                              }

                              setRatingAlojamiento(Number(val));
                            }}
                          />
                          <Button
                            width={"40%"}
                            onClick={async () => {
                              if (reserva.reviewId == 0) {
                                await api.agregarResenaAlojamiento({
                                  bookingId: reservaId,
                                  description: resena,
                                  qualification: ratingAlojamiento,
                                });
                                //window.location.reload();
                              } else {
                                await api.editarResenaAlojamiento({
                                  bookingId: reservaId,
                                  description: resena,
                                  qualification: ratingAlojamiento,
                                });
                                //window.location.reload();
                              }
                              /*
                                                await api.agregarResenaAlojamiento({
                                                  booking_id: reserva.bookingId,
                                                  reimbursedBy: "GUEST",
                                                });
                                                window.location.reload();         */
                            }}
                          >
                            Guardar
                          </Button>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </>
          )}
        </Grid>

        {reserva.estado === "CONFIRMADO" && (
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="flex-start"
            sx={{ marginTop: "30px" }}
          >
            <Grid item xs>
              <div style={{ width: "50%" }}>
                <Button
                  onClick={async () => {
                    await api.rembolsarReserva({
                      booking_id: reserva.bookingId,
                      reimbursedBy: "GUEST",
                    });
                    window.location.reload();
                  }}
                >
                  Reembolsar
                </Button>
              </div>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Grid>
  );
}
