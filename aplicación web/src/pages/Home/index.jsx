import React from "react";
import styled from "styled-components";

import Mapa from "components/atom/Mapa";
import CategoriaBox from "components/molecule/CategoriaBox";
import BannerHome from "components/molecule/BannerHome";
import { BoxDescripcion } from "components/atom/BoxDescripcion";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  width: 90%;
  text-align: center;
  padding: "10px";
  margin: auto;
  margin-top: 0;
  justify-content: center;
`;

export default function HomePage() {
  return (
    <Container
      style={{
        padding: "10px",
        marginTop: "1%",
      }}
    >
      <BannerHome
        tituloBanner="Hospedaje en las habitaciones más confortantes"
        imagenBanner="bannerHome.jpg"
      ></BannerHome>
      <CategoriaBox></CategoriaBox>
      <BoxDescripcion
        Titulo="Descubre nuevas oportunidades para viajar en nuestra app"
        Texto="Nueva aplicacion disponible para IOS y Android"
        Imagen="celular.jpg"
      ></BoxDescripcion>

      {/* <Mapa></Mapa> */}
    </Container>
  );
}
