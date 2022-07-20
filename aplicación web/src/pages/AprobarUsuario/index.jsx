import {
  Card,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import Api from "server/Api";
import Loading from "components/atom/Loading";
import { GoogleMapLocation } from "components/atom/Googlemap";

import Carousel from "components/atom/Carousel";


import {botonAceptar,botonRechazar} from "components/molecule/BotoneraEstados"
export default function AprobarUsuario() {
  const { id,alias,startDate,endDate } = useParams();

  const api = new Api();
  const [galeria, setGaleria] = React.useState([]);
  const [alojamiento, setAlojamiento] = React.useState(null);

 


  const obtenerDatos = async () => {
    const data = await api.details(id);
    //console.log(data);
    data.photos.map(function (foto) {
      setGaleria([
        ...galeria,
        {
          original: process.env.REACT_APP_API_IMG + foto,
          thumbnail: process.env.REACT_APP_API_IMG + foto,
        },
      ]);
    });
    setAlojamiento(data);
  };

  React.useEffect(() => {
    obtenerDatos();
    return;
  }, []);

  if (alojamiento == null) {
    return <Loading />;
  }

  console.log(alias);
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
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "relative"
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
            </Container>
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
              {alojamiento.features.map(function (feature, index) {
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
              {alojamiento.services.map(function (service, index) {
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
              })}
            </Container>
          </Container>
        </Container>
        <Container>
        <Grid container  
           direction="row"
           justifyContent="space-evenly"
           alignItems="stretch"
           
          sx={{ margin: "50px" }} columnSpacing={{ xs: 3 }}>
          <Grid item xs    justifyContent="space-evenly" >
            {botonRechazar(alias)}
          </Grid>
          <Grid item xs    justifyContent="space-evenly" >
            
            {botonAceptar(alias)}
          </Grid>
        </Grid>
        
          
        </Container>

      </Card>
    </Card>
  );
}
