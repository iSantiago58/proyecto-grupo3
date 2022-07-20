import React from "react";

import { Box } from "@mui/system";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Grid } from "@mui/material";
import TextField from "components/atom/Textfield";

export function Servicios({ lista, setValores }) {
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    setValores((existingItems) => {
      var current = existingItems[value];

      if (!("value" in existingItems[value])) {
        existingItems[value].value = true;
      } else {
        existingItems[value].value = !existingItems[value].value;
      }
      return [
        ...existingItems.slice(0, value),
        current,
        ...existingItems.slice(value + 1),
      ];
    });

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <Box>
      <Grid container spacing={3}>
        {lista.map((caracteristica, i) => {
          const labelId = `checkbox-list-label-${i}`;

          return (
            <Grid item xs key={"grid" + i}>
              <ListItemButton
                role={undefined}
                onClick={() => {
                  handleToggle(i);
                }}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    key={i}
                    edge="start"
                    checked={caracteristica.value | (checked.indexOf(i) !== -1)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={caracteristica.name} />
              </ListItemButton>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
export function Caracteristicas({ lista, setValores }) {
  return (
    <Box>
      <Grid container spacing={3}>
        {lista.map((caracteristica, i) => {
          return (
            <Grid item xs key={"grid" + i}>
              <TextField
                key={i}
                label={caracteristica.name}
                type="number"
                defaultValue={caracteristica.value | 0}
                onChange={(e) => {
                  setValores((existingItems) => {
                    var current = existingItems[i];
                    existingItems[i].value = e.target.value;
                    return [
                      ...existingItems.slice(0, i),
                      current,
                      ...existingItems.slice(i + 1),
                    ];
                  });
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
