import React from "react";
import Container from "@mui/material/Container";

import { SideBarFilter } from "components/organism/SideBarMenu";
import ListaAlojamientos from "components/organism/ListaAlojamientos";
import { Alert, Grid, Snackbar } from "@mui/material";
import Api from "server/Api";

export default function Busqueda() {
  //"Uruguay", "Canelones", "Solymar"

  const api = new Api();
  const [alojamientos, setAlojamientos] = React.useState([]);
  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = async () => {
    return setState({ ...state, open: true });
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const [fechas, setFechas] = React.useState(["", ""]);

  const filtrar = async (
    place,
    startDate = "",
    endDate = "",
    servicios,
    caracteristicas
  ) => {
    setFechas([startDate, endDate]);
    if (typeof place.value === "undefined") {
      await handleClick();
      return;
    }
    let country = place.value.terms[0].value;
    let province = place.value.terms[0].value;
    let city = place.value.terms[0].value;

    if (place.value.terms.length === 3) {
      country = place.value.terms[2].value;
      province = place.value.terms[1].value;
    } else if (place.value.terms.length === 2) {
      country = place.value.terms[1].value;
      province = place.value.terms[0].value;
    }
    let serviciosApi = [];
    servicios.map(function (servicio) {
      if (servicio.valor) {
        serviciosApi.push(servicio.id);
      }
      return servicio;
    });
    let caracteristicaApi = [];
    caracteristicas.map(function (caracteristica) {
      if (caracteristica.cantidad > 0) {
        caracteristicaApi.push(
          caracteristica.id + "-" + caracteristica.cantidad
        );
      }
      return caracteristica;
    });

    if (startDate === endDate) {
      const resultado = await api.filter({
        city: city,
        country: country,
        province: province,
        priceFrom: 0,
        priceTo: 10000000,
        features: caracteristicaApi,
        services: serviciosApi,
      });
      setAlojamientos(resultado);
    } else {
      const resultado = await api.filter({
        city: city,
        country: country,
        province: province,
        priceFrom: 0,
        priceTo: 10000000,
        dateFrom: startDate,
        dateTo: endDate,
        features: caracteristicaApi,
        services: serviciosApi,
      });
      setAlojamientos(resultado);
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
      columns={2}
    >
      <Snackbar
        severity="error"
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleClose}
        message="I love snacks"
        key={"alerta"}
      >
        <Alert severity="error">
          Debe buscarse una localización para obtener un resultado
        </Alert>
      </Snackbar>
      <Grid item>
        <Container
          maxWidth="xs"
          disableGutters
          sx={{
            marginLeft: 0,
            marginTop: "-10px",
            marginBottom: "-10px",
          }}
          xs
        >
          <SideBarFilter filtrar={filtrar} />
        </Container>
      </Grid>
      <Grid item xs>
        <ListaAlojamientos
          alojamientos={alojamientos}
          startDate={fechas[0]}
          endDate={fechas[1]}
        />
      </Grid>
    </Grid>
  );
}
