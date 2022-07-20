import React from "react";

import Box from "@mui/material/Box";
import {
  Caracteristicas,
  Servicios,
} from "components/molecule/Caracteristicas";
import Api from "server/Api";
import ImageEditor from "components/molecule/ImageEditor";
import { Button } from "components/atom/Button";
import Grid from "@mui/material/Grid";

import { FormTextfield } from "components/atom/Textfield";
import { useInputsForm } from "Hooks/Inputhooks";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GoogleMapPlacesForm } from "components/atom/Googlemap";

function GetCaracteristicas() {
  const backend = new Api();
  return backend.features();
}

export default function NewHousing({ submit }) {
  const navegar = useNavigate();

  const [fields, handleFieldChange, changeField] = useInputsForm({
    serviciosApi: [],
    caracteristicasApi: [],
    locCoordinates: [],
    locCountry: [],
    locRegion: [],
    accPrice: [],
    locStreet: [],
    imagenes: [],
    locDoorNumber: [],
    accName: [],
    accDescription: [],
    apiError: [],
    places: "",
  });

  const [servicios, setServicios] = React.useState([]);
  const [caracteristicas, setCaracteristicas] = React.useState([]);

  if (
    fields.caracteristicasApi.length === 0 ||
    fields.serviciosApi.length === 0
  ) {
    GetCaracteristicas().then((resultado) => {
      resultado.data.servicios.map((item) => (item.valor = false));
      resultado.data.caracteristicas.map((item) => (item.cantidad = 0));
      changeField("serviciosApi", resultado.data.servicios);
      setServicios(resultado.data.servicios);
      changeField("caracteristicasApi", resultado.data.caracteristicas);
      setCaracteristicas(resultado.data.caracteristicas);
    });
  }

  return (
    <Box
      sx={{
        width: "70%",
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#ffffff",

        padding: "4%",
        margin: "auto",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "3px",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();

          submit(
            servicios,
            caracteristicas,
            fields.places,
            fields.locCoordinates,
            fields.locStreet,
            fields.locDoorNumber,
            fields.accPrice,
            fields.accName,
            fields.accDescription,
            fields.imagenes
          )
            .then((response, status) => {
              navegar("/reservas");
            })
            .catch((err) => {
              if (err.response.status === 401) {
                changeField(
                  "apiError",
                  "Tu contraseña es incorrecta o la cuenta ingresada no existe"
                );
              }
            });
          return false;
        }}
      >
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <Typography
              sx={{ textAlign: "center", fontSize: "30px", paddingTop: "20px" }}
            >
              Creacion de Alojamiento
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormTextfield
              id="accName"
              onChange={handleFieldChange}
              nombre="Nombre del alojamiento"
            ></FormTextfield>
          </Grid>
          <Grid item xs={12}>
            <FormTextfield
              id="accDescription"
              onChange={handleFieldChange}
              nombre="Descripcion"
              multiline
              rows={4}
            ></FormTextfield>
          </Grid>
          <Grid
            container
            rowSpacing={4}
            item
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <FormTextfield
                id="accPrice"
                onChange={handleFieldChange}
                nombre="Precio"
                number
              ></FormTextfield>
            </Grid>
            <Grid item xs={6}>
              <GoogleMapPlacesForm
                setData={(e) => {
                  changeField("places", e);
                }}
              ></GoogleMapPlacesForm>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={4}
            item
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <FormTextfield
                id="locStreet"
                onChange={handleFieldChange}
                nombre="Calles"
              ></FormTextfield>
            </Grid>

            <Grid item xs={6}>
              <FormTextfield
                id="locDoorNumber"
                onChange={handleFieldChange}
                nombre="Numero de puerta"
                number
              ></FormTextfield>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={4}
            item
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Servicios
                lista={fields.serviciosApi}
                setValores={setServicios}
              />
            </Grid>

            <Grid item xs={6}>
              <Caracteristicas
                lista={fields.caracteristicasApi}
                setValores={setCaracteristicas}
              />{" "}
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={4}
            item
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <ImageEditor
              itemData={fields.imagenes}
              setItemData={(images) => {
                changeField("imagenes", images);
              }}
            ></ImageEditor>
          </Grid>
          <Grid
            container
            rowSpacing={4}
            item
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ height: "100px" }}
          >
            <Button type="submit">Guardar</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export function NewReserveAndRegister({
  fields,
  handleFieldChange,
  changeField,
  servicios,
  setServicios,
  caracteristicas,
  setCaracteristicas,
}) {
  const [fieldsInternos, , changeFieldInternos] = useInputsForm({
    serviciosApi: [],
    caracteristicasApi: [],
    apiError: [],
    servicioCargado: false,
  });

  if (servicios.length === 0 || caracteristicas.length === 0) {
    GetCaracteristicas().then((resultado) => {
      resultado.data.servicios = resultado.data.servicios.map((item) => ({
        ...item,
        value: false,
      }));
      resultado.data.caracteristicas = resultado.data.caracteristicas.map(
        (item) => ({ ...item, value: 0 })
      );
      setServicios(resultado.data.servicios);
      setCaracteristicas(resultado.data.caracteristicas);
      changeFieldInternos("servicioCargado", true);
    });
  }
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#ffffff",
        display: "flex",
        padding: "4%",
        paddingTop: "0",
        margin: "auto",
        marginTop: "2%",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "3px",
      }}
    >
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Typography
            sx={{ textAlign: "center", fontSize: "30px", paddingTop: "20px" }}
          >
            Creación de Alojamiento
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FormTextfield
            id="accName"
            onChange={handleFieldChange}
            value={fields.accName}
            nombre="Nombre del alojamiento"
          ></FormTextfield>
        </Grid>
        <Grid item xs={12}>
          <FormTextfield
            id="accDescription"
            onChange={handleFieldChange}
            nombre="Descripción"
            value={fields.accDescription}
            multiline
            rows={4}
          ></FormTextfield>
        </Grid>
        <Grid
          container
          rowSpacing={4}
          item
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6}>
            <FormTextfield
              id="accPrice"
              value={fields.accPrice}
              onChange={handleFieldChange}
              nombre="Precio por noche"
            ></FormTextfield>
          </Grid>
          <Grid item xs={6}>
            <GoogleMapPlacesForm
              setData={(e) => {
                changeField("places", e);
              }}
            ></GoogleMapPlacesForm>
          </Grid>
        </Grid>
        <Grid
          container
          rowSpacing={4}
          item
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6}>
            <FormTextfield
              id="locStreet"
              onChange={handleFieldChange}
              value={fields.locStreet}
              nombre="Calle"
            ></FormTextfield>
          </Grid>

          <Grid item xs={6}>
            <FormTextfield
              id="locDoorNumber"
              value={fields.locDoorNumber}
              onChange={handleFieldChange}
              nombre="Número de puerta"
              number
            ></FormTextfield>
          </Grid>
        </Grid>
        <Grid
          container
          rowSpacing={4}
          item
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6}>
            <p>Seleccion los servicios del alojamiento:</p>
            <Servicios lista={servicios} setValores={setServicios} />
          </Grid>

          <Grid item xs={6}>
            <p>Selecciona características del alojamiento:</p>
            <Caracteristicas
              lista={caracteristicas}
              setValores={setCaracteristicas}
            />
          </Grid>
        </Grid>

        <Grid
          container
          rowSpacing={4}
          item
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <ImageEditor
            itemData={fields.imagenes}
            setItemData={(images) => {
              changeField("imagenes", images);
            }}
          ></ImageEditor>
        </Grid>
        <Grid
          container
          rowSpacing={4}
          item
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ height: "100px" }}
        ></Grid>
      </Grid>
    </Box>
  );
}

export function EditHousing({ data, submit, id }) {
  const [fields, handleFieldChange, changeField] = useInputsForm({
    serviciosApi: data.services,
    caracteristicasApi: data.features,
    locCoordinates: [],
    places: [data.location.city, data.location.province, data.location.country],
    accPrice: data.accommodation.price,
    locStreet: data.location.street,
    imagenes: data.photos,
    locDoorNumber: data.location.doorNumber,
    accName: data.accommodation.name,
    accDescription: data.accommodation.description,
    apiError: [],
  });
  const navegar = useNavigate();

  const [servicios, setServicios] = React.useState(data.services);
  const [caracteristicas, setCaracteristicas] = React.useState(data.features);

  if (
    fields.caracteristicasApi.length === 0 ||
    fields.serviciosApi.length === 0
  ) {
    GetCaracteristicas().then((resultado) => {
      resultado.data.servicios.map((item) => (item.valor = false));
      resultado.data.caracteristicas.map((item) => (item.cantidad = 0));
      changeField("caracteristicasApi", resultado.data.caracteristicas);
      setCaracteristicas(resultado.data.caracteristicas);
    });
  }

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
      <form
        onSubmit={(e) => {
          e.preventDefault();

          submit(
            id,
            servicios,
            caracteristicas,
            fields.places,
            fields.locCoordinates,
            fields.locStreet,
            fields.locDoorNumber,
            fields.accPrice,
            fields.accName,
            fields.accDescription,
            fields.imagenes
          )
            .then((response, status) => {
              navegar("/reservas");
            })
            .catch((err) => {
              console.log(err);
              if (err.response.status === 401) {
                changeField(
                  "apiError",
                  "Tu contraseña es incorrecta o la cuenta ingresada no existe"
                );
              }
            });
          return false;
        }}
      >
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <Typography
              sx={{ textAlign: "center", fontSize: "30px", paddingTop: "20px" }}
            >
              Creacion de Alojamiento
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormTextfield
              id="accName"
              onChange={handleFieldChange}
              nombre="Nombre del alojamiento"
              value={fields.accName}
            ></FormTextfield>
          </Grid>
          <Grid item xs={12}>
            <FormTextfield
              id="accDescription"
              onChange={handleFieldChange}
              nombre="Descripcion"
              multiline
              value={fields.accDescription}
              rows={4}
            ></FormTextfield>
          </Grid>
          <Grid
            container
            rowSpacing={4}
            item
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <FormTextfield
                id="accPrice"
                onChange={handleFieldChange}
                nombre="Precio"
                number
                value={fields.accPrice}
              ></FormTextfield>
            </Grid>
            <Grid item xs>
              <GoogleMapPlacesForm
                setData={(e) => {
                  changeField("places", e);
                }}
                value={
                  data.location.city +
                  " " +
                  data.location.province +
                  " " +
                  data.location.country
                }
              ></GoogleMapPlacesForm>
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={4}
            item
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <FormTextfield
                id="locStreet"
                onChange={handleFieldChange}
                nombre="Calles"
              ></FormTextfield>
            </Grid>
            <Grid item xs={6}>
              <FormTextfield
                id="locDoorNumber"
                onChange={handleFieldChange}
                nombre="Numero de puerta"
                number
                value={fields.locDoorNumber}
              ></FormTextfield>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={4}
            item
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Servicios
                lista={fields.serviciosApi}
                setValores={setServicios}
              />
            </Grid>

            <Grid item xs={6}>
              <Caracteristicas
                lista={fields.caracteristicasApi}
                setValores={setCaracteristicas}
              />{" "}
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={4}
            item
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <ImageEditor
              itemData={fields.imagenes}
              setItemData={(images) => {
                changeField("imagenes", images);
              }}
            ></ImageEditor>
          </Grid>
          <Grid
            container
            rowSpacing={4}
            item
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ height: "100px" }}
          >
            <Button type="submit">Guardar</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
