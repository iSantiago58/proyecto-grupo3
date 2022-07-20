import { CategoriaContenedor, ColumnaGrid } from "./style";
import Grid from "@mui/material/Grid";

import { CardCategorias } from "components/atom/CardCategorias";

function CategoriaBox() {
  return (
    <ColumnaGrid
      style={{
        textAlign: "center",
      }}
      container
      spacing={0.5}
    >
      <ColumnaGrid item md={3}>
        <CardCategorias
          Lugar="Montevideo"
          Imagen="montevideo.jpg"
          EnlaceLink="/busqueda?montevideo"
        />
      </ColumnaGrid>
      <ColumnaGrid item md={3}>
        <CardCategorias
          Lugar="Piriapolis"
          Imagen="piriapolis.webp"
          EnlaceLink="/busqueda?piriapolis"
        />
      </ColumnaGrid>
      <ColumnaGrid item md={3}>
        <CardCategorias
          Lugar="Punta del diablo"
          Imagen="puntadeldiablo.jpg"
          EnlaceLink="/busqueda?puntadeldiablo"
        />
      </ColumnaGrid>
      <ColumnaGrid item md={3}>
        <CardCategorias
          Lugar="Punta del este"
          Imagen="puntadeleste.jpg"
          EnlaceLink="/busqueda?puntadeleste"
        />
      </ColumnaGrid>
    </ColumnaGrid>
  );
}

export default CategoriaBox;
