import React from "react";

//Style
import { LoginBase, LayoutTextField, LayoutOptions } from "./style";

//react component
import { Button } from "components/atom/Button";
import { ForkLeft } from "@mui/icons-material";
import { borderRadius } from "@mui/system";
import { Grid, Typography } from "@mui/material";

const rutaImages = require.context("resources/images/", true);

export default function BannerHome({ tituloBanner, imagenBanner }) {
  return (
    <div
      style={{
        display: "block",
        borderRadius: "15px",
        margin: "auto",
        width: "100%",
        //maxWidth:"1228px",
        minHeight: "600px",
        //maxHeight:"719px",
        backgroundImage: `url('${rutaImages("./" + imagenBanner)}')`,
        textAlign: "center",
        backgroundPosition: "bottom",
        backgroundAttachment: "cover",
        backgroundSize: "cover",
        height: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignContent: "flex-end",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Grid item display="flex" justifyContent="center" width={"100%"}>
          <Typography
            variant="h4"
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: "4px",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "48px",
              width: "70%",
            }}
          >
            {tituloBanner}
          </Typography>
        </Grid>
        <Grid
          item
          display="flex"
          justifyContent="center"
          width={"100%"}
          marginBottom={"3%"}
        ></Grid>
      </Grid>
    </div>
  );
}
