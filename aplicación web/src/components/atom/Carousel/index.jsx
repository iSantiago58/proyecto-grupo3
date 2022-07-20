import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, IconButton } from "@mui/material";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function CustomCarousel2({ fotos, ...props }) {
  let imagenes = [];

  fotos.map((foto, i) => {
    imagenes.push({
      original: process.env.REACT_APP_API_IMG + foto.photo,
      thumbnail: process.env.REACT_APP_API_IMG + foto.photo,
      thumbnailHeight: "70px",
      originalHeight: "600px",
    });
  });
  return (
    <ImageGallery
      thumbnailPosition={"bottom"}
      items={imagenes}
      slideDuration={1200}
      showPlayButton={false}
      renderLeftNav={(onClick, disabled) => {
        return (
          <IconButton
            sx={{
              padding: "50px 10px",
              top: "50%",
              transform: "translateY(-50%)",
              position: "absolute",
              zIndex: 4,
              height: "50px",
              width: "50px",
            }}
            aria-label="delete"
            disabled={disabled}
            onClick={onClick}
          >
            <ArrowLeftIcon
              sx={{ fontSize: 80, color: "#213eb3" }}
            ></ArrowLeftIcon>
          </IconButton>
        );
      }}
      renderRightNav={(onClick, disabled) => {
        return (
          <IconButton
            sx={{
              padding: "50px 10px",
              top: "50%",
              transform: "translateY(-50%)",
              position: "absolute",
              zIndex: 4,
              right: 0,
              height: "50px",
              width: "50px",
            }}
            aria-label="delete"
            disabled={disabled}
            onClick={onClick}
          >
            <ArrowRightIcon
              sx={{ fontSize: 80, color: "#213eb3" }}
            ></ArrowRightIcon>
          </IconButton>
        );
      }}
    />
  );
}
/*
export function CustomCarousel({ fotos, ...props }) {
  return (
    <Carousel {...props}>
      {fotos.map((foto, i) => (
        <Paper
          sx={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <img
            style={{
              display: "flex",
              height: "500px",
              justifyContent: "center",
              borderRadius: "20px",
            }}
            key={i}
            src={process.env.REACT_APP_API_IMG + foto.photo}
          />
        </Paper>
      ))}
    </Carousel>
  );
}
*/
