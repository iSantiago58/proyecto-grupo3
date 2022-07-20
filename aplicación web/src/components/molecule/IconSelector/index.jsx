import React from "react";
import {Grid, Avatar, Icon} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Assignment from "@mui/icons-material/Assignment";
import { green, pink, red } from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function IconSelector({ avatar, setAvatar }) {
  if (avatar == 0) {
    setAvatar(1);
  }
  const rutaImages = require.context("resources/svgs/avatares", true);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="stretch"
      spacing={1}
    >
      <IconButton onClick={() => setAvatar(1)}>
        <Avatar
          sx={{ bgcolor: green[500] }}
          style={{
            border: avatar == 1 ? "2px solid black" : "",
          }}
        >
          <IconUser id={1} />
        </Avatar>
      </IconButton>
      <IconButton onClick={() => setAvatar(2)}>
        <Avatar
          sx={{ bgcolor: pink[600] }}
          style={{
            border: avatar == 2 ? "2px solid black" : "",
          }}
        >
          <IconUser id={2} />
        </Avatar>
      </IconButton>
      <IconButton onClick={() => setAvatar(3)}>
        <Avatar
          style={{
            border: avatar == 3 ? "2px solid black" : "",
          }}
        >
          <IconUser id={3} />
        </Avatar>
      </IconButton>
    </Grid>
  );
}

export function IconUser({ id }) {
  const rutaImages = require.context("resources/svgs/avatares", true);
  switch (id) {
    case 1:
      return (
        <IconButton>
          <Avatar sx={{ bgcolor: "#C6B5D4" }}>
            <Icon>
              <img width="25" src={rutaImages(`./man.svg`)}/>
            </Icon>
          </Avatar>
        </IconButton>
      );
      break;
    case 2:
      return (
        <IconButton>
          <Avatar sx={{ bgcolor: "#F2E2CE" }}>
            <Icon>
              <img width="25" src={rutaImages(`./woman.svg`)}/>
            </Icon>
          </Avatar>
        </IconButton>
      );
      break;
    case 3:
      return (
        <IconButton>
          <Avatar sx={{ bgcolor: "#97CFC9" }}>
            <Icon>
              <img width="25" src={rutaImages(`./yoda.svg`)}/>
            </Icon>
          </Avatar>
        </IconButton>
      );
      break;
    default:
      return (
        <IconButton>
          <Avatar sx={{ bgcolor: red[700] }}>
            <AssignmentIcon />
          </Avatar>
        </IconButton>
      );
      break;
  }
}
