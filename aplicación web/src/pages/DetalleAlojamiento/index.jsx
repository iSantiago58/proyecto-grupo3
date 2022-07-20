import { Card, Chip, Container, Grid, Rating, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Api from "server/Api";
import Loading from "components/atom/Loading";
import { GoogleMapLocation } from "components/atom/Googlemap";
import { Button } from "components/atom/Button";
import { ReservarAlojamiento } from "components/organism/FormModal";
import { formatDate } from "components/util/functions";
import { DateRange } from "react-date-range";
import * as locales from "react-date-range/dist/locale";

import { useModalHook } from "Hooks/ModalHooks";
import Carousel from "components/atom/Carousel";
import { cambiarFormatoFecha } from "components/util/functions";
import ListaReviews from "components/molecule/ListaReviews";
import { useLocalStorage } from "Hooks/LocalStoreHook";

export default function DetalleAlojamiento() {
  const { id, startDate, endDate } = useParams();
  const [, setGaleria] = React.useState([]);
  const [alojamiento, setAlojamiento] = React.useState(null);
  const [abrirReserva, setAbrirReserva] = React.useState(false);
  const [usuario] = useLocalStorage("usuario", "");

  const [
    reservaModal,
    abrirReservaModal,
    cerrarReservaModal,
    despuesReservaModal,
  ] = useModalHook();

  const [fecha, setFecha] = React.useState([
    {
      startDate: cambiarFormatoFecha(startDate),
      endDate: cambiarFormatoFecha(endDate),
      key: "selection",
    },
  ]);

  React.useEffect(() => {
    const api = new Api();

    const obtenerDatos = async () => {
      const data = await api.details(id);
      setGaleria([
        data.photos.map(function (foto) {
          return {
            original: process.env.REACT_APP_API_IMG + foto,
            thumbnail: process.env.REACT_APP_API_IMG + foto,
          };
        }),
      ]);
      setAlojamiento(data);
    };
    obtenerDatos();
    return;
  }, [id]);

  if (alojamiento == null) {
    return <Loading />;
  }

  const realizarReserva = async () => {
    setAbrirReserva(true);
    abrirReservaModal();
  };
  const confirmarReserva = async () => {
    const api = new Api();

    let alias = JSON.parse(localStorage.getItem("usuario")).alias;
    let payload = {
      idAccommodation: id,
      aliasGuest: alias,
      start_date: formatDate(new Date(fecha[0].startDate)),
      end_date: formatDate(new Date(fecha[0].endDate)),
    };

    const response = await api.booking(payload);

    const newWindow = window.open(response.replace("redirect:", ""), "_self");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flexStart",
        width: "80%",
        background: "#ffffff",

        height: "10%",
        margin: "auto",

        borderRadius: "31px",
      }}
    >
      {abrirReserva && (
        <ReservarAlojamiento
          abrirModal={reservaModal}
          cerrarModal={abrirReservaModal}
          onCloseModal={cerrarReservaModal}
          onAfterOpen={despuesReservaModal}
          submit={confirmarReserva}
          reserva={{
            datos: alojamiento,
            fecha: fecha[0],
          }}
        ></ReservarAlojamiento>
      )}

      <Typography
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 0px",
          gap: "10px",
          width: "100%",
          height: "84px",
          borderRadius: "36px",
          flex: "none",
          order: 0,
          alignSelf: "stretch",
          flexGrow: 0,
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: 700,
          fontSize: "40px",
          lineHeight: "44px",
          textAlign: "center",
        }}
      >
        {alojamiento.accommodation.name}
      </Typography>

      <Card
        sx={{
          width: "100%",
          height: "inherit",
          background: "#FFFFFF",
          flex: "none",
          margin: "auto",
          borderRadius: "0px",

          order: 1,
          flexGrow: 0,
        }}
      >
        <Container
          sx={{
            marginBottom: "50px",
          }}
        >
          {
            /*Galeria de imagenes */
            <Carousel
              style={{ height: "500px" }}
              fotos={alojamiento.photos}
            ></Carousel>
          }
        </Container>
        <Container
          sx={{
            /* Auto layout */
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            height: "100%",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              width: "30%",
              height: "60%",

              /* Inside auto layout */

              flex: "none",
              order: 0,
              alignSelf: "stretch",
              flexGrow: 1,
              padding: 0,
            }}
            style={{
              paddingLeft: "0px !important",
              paddingRight: "0px !important",
            }}
          >
            {usuario.rol === "ROLE_GUEST" && (
              <Container
                sx={{
                  order: 0,
                  alignSelf: "stretch",
                  flexGrow: 1,
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Container
                  sx={{
                    flex: "none",
                    order: 0,
                    alignSelf: "stretch",
                    flexGrow: 1,
                    marginLeft: " 0 !important",
                    paddingLeft: " 0 !important",
                    marginTop: "20px",
                  }}
                  style={{ paddingLeft: "0 !important" }}
                >
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
                </Container>

                <Container sx={{ paddingBottom: "10px" }}>
                  <Button
                    onClick={() => {
                      realizarReserva();
                    }}
                  >
                    Reservar
                  </Button>
                </Container>
              </Container>
            )}

            <Container
              sx={{
                flex: "none",
                order: 0,
                alignSelf: "stretch",
                flexGrow: 1,
                height: "200px",
                width: "100%",
                padding: "0 !important",
              }}
            >
              <GoogleMapLocation></GoogleMapLocation>
            </Container>
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              padding: "0px",
              height: "50%",

              width: "40%",

              /* Inside auto layout */

              flex: "none",
              order: 0,
              alignSelf: "stretch",
              flexGrow: 1,
            }}
          >
            <Container
              sx={{
                flex: "none",
                alignItems: "start",
                order: 0,
                alignSelf: "stretch",
                flexGrow: 1,
                gap: "20px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  width: "100%",
                  textDecorationLine: "underline",
                  marginBottom: "30px",
                }}
              >
                Descripcion del apartamento
              </Typography>
              <Typography
                variant="p"
                sx={{
                  textAlign: "center",
                  width: "100%",
                  marginTop: "10px",
                  height: "50%",
                }}
              >
                {alojamiento.accommodation.description}
              </Typography>
            </Container>
            <Container
              sx={{
                flex: "none",
                order: 0,
                alignSelf: "stretch",
                flexGrow: 1,
                height: "50%",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  width: "100%",
                  textDecorationLine: "underline",
                  marginBottom: "30px",
                }}
              >
                Caracteristicas
              </Typography>
              {alojamiento.features
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map(function (feature, index) {
                  return (
                    <Chip
                      sx={{
                        margin: "5px",
                      }}
                      key={"feature" + index}
                      label={feature.name + " : " + feature.value}
                    />
                  );
                })}
              {alojamiento.services
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map(function (service, index) {
                  if (service.value) {
                    return (
                      <Chip
                        sx={{
                          margin: "5px",
                        }}
                        key={"service" + index}
                        label={service.name}
                      />
                    );
                  }
                  return null;
                })}
            </Container>
          </Container>
        </Container>
        <Grid container sx={{ margin: "50px" }}>
          <Grid item xs>
            <Typography variant="h5">
              Calificacion del Alojamiento{" "}
              <Rating
                readOnly
                size="large"
                precision={0.1}
                value={alojamiento.accommodation.qualification}
              ></Rating>
            </Typography>
          </Grid>
        </Grid>
        <Container sx={{ marginY: "50px" }} maxWidth="sm">
          <ListaReviews reviews={alojamiento.reviews}></ListaReviews>
        </Container>
      </Card>
    </Card>
  );
}
