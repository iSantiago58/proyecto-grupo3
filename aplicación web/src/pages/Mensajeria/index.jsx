import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";

import { useLocalStorage } from "Hooks/LocalStoreHook";

import { firebaseConfig } from "server/Firebase";
import { db } from "server/Firebase";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import React from "react";
import SendIcon from "@mui/icons-material/Send";
import {
  Divider,
  TextField,
  Typography,
  Grid,
  Paper,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
  Chip,
  Stack,
} from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";
import EmailIcon from "@mui/icons-material/Email";
import { Container } from "@mui/system";
firebase.initializeApp(firebaseConfig);

const PreviewChat = ({ data, onClick, soy, seleccionado }) => {
  const [info, setInfo] = React.useState(null);
  let alias = data.huesped;
  if (soy === "ROLE_GUEST") {
    alias = data.anfitrion;
  }
  let style = {};
  if (seleccionado) {
    style = {
      backgroundColor: "#fff",
      filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    };
  }

  React.useEffect(() => {
    const id =
      `${data.huesped}` +
      "-" +
      `${data.anfitrion}` +
      "-" +
      `${data.housingId}` +
      "-" +
      `${data.bookingId}`;
    let unsub = onSnapshot(doc(db, "ultimosMsg", id), (doc) => {
      setInfo(doc.data());
    });
    return () => unsub();
  }, []);
  let inactivo = data.endDate.toDate() < new Date();

  return (
    <ListItem sx={style} button key="RemySharp" onClick={onClick}>
      <ListItemIcon>
        {info !== null && info.noLeido && info.de === soy ? (
          <EmailIcon />
        ) : (
          <DraftsIcon />
        )}
      </ListItemIcon>
      <ListItemText
        primary={alias}
        secondary={
          <Stack direction="row">
            {inactivo ? (
              <Chip label={"Inactivo"} color="warning" size="small"></Chip>
            ) : (
              <Chip label={"Activo"} color="primary" size="small"></Chip>
            )}
          </Stack>
        }
      />
      <ListItemText
        primary={data.housingName}
        secondary={
          <>{info !== null && <Typography>{info.texto}</Typography>}</>
        }
        align="right"
      ></ListItemText>
    </ListItem>
  );
};

const Chat = () => {
  const [usuario] = useLocalStorage("usuario", "");
  const [previews, setPreviews] = React.useState("");
  const [ultimoMsg, setUltimoMsg] = React.useState("");

  const [chatSeleccionado, setChatSeleccionado] = React.useState(-1);
  const [msgs, setMsgs] = React.useState([]);
  const [text, setText] = React.useState("");
  const [bloquear, setBloquear] = React.useState(false);
  const [buscar, setBuscar] = React.useState("");

  if (document.getElementById("scrollMsg")) {
    var messageBody = document.getElementById("scrollMsg");
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  }

  React.useEffect(() => {
    const usersRef = collection(db, "chats");
    let rol = "anfitrion";
    if (usuario.rol === "ROLE_GUEST") {
      rol = "huesped";
    }
    const q = query(usersRef, where(rol, "in", [usuario.alias]));

    const unsub = onSnapshot(q, (querySnapshop) => {
      let user = [];
      querySnapshop.forEach((doc) => {
        user.push({
          startDate: doc.data().fechaInicioReserva,
          huesped: doc.data().huesped,
          anfitrion: doc.data().anfitrion,
          endDate: doc.data().fechaFinReserva,
          housingName: doc.data().nombreAlojamiento,
          housingId: doc.data().idAlojamiento,
          bookingId: doc.data().idReserva,
        });
      });
      setPreviews(user.reverse());
    });
    return () => unsub();
  }, [usuario.rol, usuario.alias]);

  const handleSubmit = async () => {
    if (text.trim() !== "") {
      const id =
        `${previews[chatSeleccionado].huesped}` +
        "-" +
        `${previews[chatSeleccionado].anfitrion}` +
        "-" +
        `${previews[chatSeleccionado].housingId}` +
        "-" +
        `${previews[chatSeleccionado].bookingId}`;
      let para = msgs[0].para;
      if (msgs[0].de !== usuario.alias) {
        para = msgs[0].de;
      }
      await addDoc(collection(db, "chats", id, "mensajes"), {
        texto: text,
        de: usuario.alias,
        para: para,
        fechaCreacion: Timestamp.fromDate(new Date()),
      });
      await setDoc(doc(db, "ultimosMsg", id), {
        texto: text,
        para: para,
        de: usuario.alias,
        fechaCreacion: Timestamp.fromDate(new Date()),
        noLeido: true,
      }).then(() => console.log("seteo"));

      setText("");
      setBloquear(false);
    }
  };

  React.useEffect(() => {
    if (chatSeleccionado !== -1) {
      const readMessage = async () => {
        const id =
          `${previews[chatSeleccionado].huesped}` +
          "-" +
          `${previews[chatSeleccionado].anfitrion}` +
          "-" +
          `${previews[chatSeleccionado].housingId}` +
          "-" +
          `${previews[chatSeleccionado].bookingId}`;
        const docSnap = await getDoc(doc(db, "ultimosMsg", id));
        if (docSnap.data()?.de !== usuario.alias) {
          await updateDoc(doc(db, "ultimosMsg", id), { noLeido: false });
        }
      };
      const id =
        `${previews[chatSeleccionado].huesped}` +
        "-" +
        `${previews[chatSeleccionado].anfitrion}` +
        "-" +
        `${previews[chatSeleccionado].housingId}` +
        "-" +
        `${previews[chatSeleccionado].bookingId}`;
      const msgsRef = collection(db, "chats", id, "mensajes");
      const q = query(msgsRef, orderBy("fechaCreacion", "asc"));
      const mens = onSnapshot(q, (querySnapshot) => {
        let msgs = [];
        querySnapshot.forEach((doc) => {
          msgs.push(doc.data());
        });
        setMsgs(msgs);
        readMessage();
      });
      return () => mens();
    }
  }, [chatSeleccionado, previews, usuario.alias]);

  let diaAnterior = 0;
  return (
    <Card sx={{ marginY: "-10px" }}>
      <Grid
        container
        component={Paper}
        sx={{ width: "100%", backgroundColor: "#a3d1ff" }}
      >
        <Grid item xs={3} sx={{ borderRight: "1px solid #e0e0e0" }}>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Buscar..."
              fullWidth
              value={buscar}
              variant="filled"
              sx={{ background: "#ffff", borderRadius: "5px" }}
              onChange={(e) => {
                setBuscar(e.target.value);
              }}
            />
          </Grid>
          <Divider />
          <List>
            {previews !== "" &&
              previews.map((preview, key) => {
                if (
                  buscar === "" ||
                  preview.anfitrion.toLowerCase().includes(buscar) ||
                  preview.housingName.toLowerCase().includes(buscar) ||
                  preview.huesped.toLowerCase().includes(buscar) ||
                  preview.startDate
                    .toDate()
                    .toString()
                    .toLowerCase()
                    .includes(buscar) ||
                  preview.endDate
                    .toDate()
                    .toString()
                    .toLowerCase()
                    .includes(buscar)
                ) {
                  return (
                    <PreviewChat
                      onClick={() => {
                        setChatSeleccionado(key);
                      }}
                      key={key}
                      data={preview}
                      soy={usuario.rol}
                      seleccionado={chatSeleccionado === key}
                    ></PreviewChat>
                  );
                }
              })}
          </List>
        </Grid>
        {chatSeleccionado !== -1 ? (
          <Grid item xs={9} sx={{ backgroundColor: "#dee7fa" }}>
            <List sx={{ height: "70vh", overflowY: "auto" }} id="scrollMsg">
              {msgs.length !== 0 &&
                msgs.map((msg, key) => {
                  console.log(msg);
                  let fecha = msg.fechaCreacion.toDate();

                  let esDistintoDia = diaAnterior !== fecha.getDay();

                  diaAnterior = fecha.getDay();
                  console.log(fecha);
                  if (msg.de === usuario.alias) {
                    return (
                      <>
                        {esDistintoDia && (
                          <ListItem
                            key={"dia" + key}
                            sx={{ placeContent: "center" }}
                          >
                            <Divider sx={{ marginY: "15px" }}>
                              <Chip
                                label={
                                  fecha.getDay() +
                                  "/" +
                                  fecha.getMonth() +
                                  "/" +
                                  fecha.getFullYear()
                                }
                              />
                            </Divider>
                          </ListItem>
                        )}
                        <ListItem key={key}>
                          <Container
                            sx={{
                              backgroundColor: "#ffff",
                              width: "fit-content",
                              marginRight: 0,
                              paddingY: 3,
                              filter:
                                "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                            }}
                          >
                            <Grid container>
                              <Grid item xs={12}>
                                <ListItemText
                                  align="right"
                                  primary={msg.texto}
                                ></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                <ListItemText
                                  align="right"
                                  secondary={
                                    fecha.getHours() + ":" + fecha.getMinutes()
                                  }
                                ></ListItemText>
                              </Grid>
                            </Grid>{" "}
                          </Container>
                        </ListItem>
                      </>
                    );
                  }
                  return (
                    <>
                      {esDistintoDia && (
                        <ListItem
                          key={"dia" + key}
                          sx={{ placeContent: "center" }}
                        >
                          <Divider sx={{ margin: "auto" }}>
                            <Chip
                              label={
                                fecha.getDay() +
                                "/" +
                                fecha.getMonth() +
                                "/" +
                                fecha.getFullYear()
                              }
                            />
                          </Divider>
                        </ListItem>
                      )}
                      <ListItem key={key}>
                        <Container
                          sx={{
                            backgroundColor: "#ffff",
                            width: "fit-content",
                            marginLeft: 0,
                            paddingY: 3,
                            filter:
                              "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                          }}
                        >
                          <Grid container>
                            <Grid item xs={12}>
                              <ListItemText
                                align="left"
                                primary={msg.texto}
                              ></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                              <ListItemText
                                align="left"
                                secondary={
                                  fecha.getHours() + ":" + fecha.getMinutes()
                                }
                              ></ListItemText>
                            </Grid>
                          </Grid>
                        </Container>
                      </ListItem>
                    </>
                  );
                })}
            </List>
            <Divider />
            {previews[chatSeleccionado].endDate.toDate() >= new Date() && (
              <Grid container style={{ padding: "20px" }}>
                <Grid item xs={11}>
                  <TextField
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                    disabled={bloquear}
                    id="outlined-basic-email"
                    label="Escribir mensaje"
                    fullWidth
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                        setBloquear(true);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={1} align="right">
                  <Fab color="primary" aria-label="add" onClick={handleSubmit}>
                    <SendIcon />
                  </Fab>
                </Grid>
              </Grid>
            )}
          </Grid>
        ) : (
          <Grid item xs={9}>
            <List sx={{ height: "70vh", overflowY: "auto" }}></List>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default Chat;
