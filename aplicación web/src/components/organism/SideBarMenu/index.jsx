import * as React from "react";
import {
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  FormControl,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useNavigate } from "react-router-dom";
import { ModalSmall } from "components/atom/Modal";
import { useLocalStorage, DefaultBusqueda } from "Hooks/LocalStoreHook";
import Api from "server/Api";
import { TextFieldSmall } from "components/atom/Textfield";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import * as locales from "react-date-range/dist/locale";
import { useInputsForm } from "Hooks/Inputhooks";
import { useGlobalState } from "Hooks/GlobalHook";

import { formatDate } from "components/util/functions";

function GetCaracteristicas() {
  const backend = new Api();
  return backend.features();
}

const drawerWidth = 240;

export default function SideBarMenu() {
  const navegar = useNavigate();
  const [alertaCerrarSesion, setAlerta] = React.useState(false);

  const handleOpen = () => setAlerta(true);
  const handleClose = () => setAlerta(false);

  return (
      <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
      >
        <Toolbar />
        <ModalSmall abrirModal={alertaCerrarSesion} onCloseModal={handleClose}>
          <Stack spacing={2} direction="column">
            <label>¿Desea cerrar sesión?</label>
            <Stack spacing={2} direction="row">
              <Button
                  variant="contained"
                  onClick={() => {
                    handleClose();
                    localStorage.removeItem("usuario");
                    navegar("/");
                  }}
              >
                Si
              </Button>
              <Button variant="contained" onClick={handleClose}>
                No
              </Button>
            </Stack>
          </Stack>
        </ModalSmall>
        <Divider />
        <List>
          <ListItem key={"usuarios"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"usuarios"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
              key={"Perfil"}
              disablePadding
              onClick={() => navegar("/perfil")}
          >
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Perfil"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Cerrar Sesión"} disablePadding onClick={handleOpen}>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Cerrar Sesión"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
  );
}
export function SideBarFilter({ filtrar }) {
  const [state] = useGlobalState();

  React.useEffect(() => {
    pasarFiltro();

    return () => {};
  }, [state]);

  const [fields, handleFieldChange, changeField] = useInputsForm({
    fechas: [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ],
    servicios: [],
    caracteristicas: [],

    apiCargada: false,
  });
  const pasarFiltro = () => {
    filtrar(
        state.busqueda,
        formatDate(fields.fechas[0].startDate),
        formatDate(fields.fechas[0].endDate),
        fields.servicios,
        fields.caracteristicas
    );
  };
  React.useEffect(() => {
    pasarFiltro();
  }, [fields.fechas]);

  if (!fields.apiCargada) {
    changeField("apiCargada", true);

    GetCaracteristicas().then((resultado) => {
      resultado.data.servicios.map((item) => (item.valor = false));
      resultado.data.caracteristicas.map((item) => (item.cantidad = 0));
      changeField("servicios", resultado.data.servicios);
      changeField("caracteristicas", resultado.data.caracteristicas);
    });
  }
  return (
      <Box
          sx={{
            bgcolor: "#ffffff",
            gap: "10px",
            paddingBlock: "15px",
            paddingInline: "10px",
          }}
      >
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
        >
          <Grid
              container
              item
              xs="auto"
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
          >
          <div>
            <label>Rango de Fechas:</label>
          </div>
            <FormControl fullWidth variant="filled" sx={{ minWidth: 120 }}>
              <DateRange
                  editableDateInputs={true}
                  locale={locales["es"]}
                  key="datefilter"
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  onChange={(ranges) => {
                    const { selection } = ranges;

                    changeField("fechas", [selection]);
                  }}
                  ranges={fields.fechas}
              />
              <Grid
                  container
                  key="serviciosfilter"
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  sx
                  spacing={1}
                  columns={2}
                  width={"300px"}
              >
                {fields.servicios && fields.servicios.length > 0 && (
                    <>
                      <Grid item sx>
                        <label>Servicios:</label>
                      </Grid>
                      <Grid item sx>
                        {fields.servicios.map(function renderFields(servicio, index) {
                          return (
                              <div>
                              <FormControlLabel
                                  key={"servicio" + index}
                                  control={
                                    <Checkbox
                                        checked={servicio.valor}
                                        onChange={(value) => {
                                          let _servicios = fields.servicios;
                                          _servicios[index].valor =
                                              !_servicios[index].valor;
                                          changeField("servicios", _servicios);
                                          pasarFiltro();
                                        }}
                                    />
                                  }
                                  label={servicio.name}
                              />
                              </div>
                          );
                        })}
                      </Grid>
                    </>
                )}
              </Grid>
              <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={2}
                  columns={3}
                  key="caracteristicasfilter"
              >
                <Grid item sx>
                  <label>Caracteristicas:</label>
                </Grid>
                {fields.caracteristicas &&
                    fields.caracteristicas.length > 0 &&
                    fields.caracteristicas.map(function renderFields(
                        caracteristica,
                        index
                    ) {
                      return (
                            <Grid item xs key={"caracteristicaGrid" + index}>
                              <TextFieldSmall
                                  xs={{
                                    width: "100px",
                                  }}
                                  key={"caracteristica" + index}
                                  label={caracteristica.name}
                                  value={caracteristica.cantidad}
                                  onChange={(value) => {
                                    let _caracteristica = fields.caracteristicas;
                                    _caracteristica[index].cantidad = value.target.value;
                                    changeField("caracteristicas", _caracteristica);
                                    pasarFiltro();
                                  }}
                              ></TextFieldSmall>
                            </Grid>
                      );
                    })}
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
  );
}
