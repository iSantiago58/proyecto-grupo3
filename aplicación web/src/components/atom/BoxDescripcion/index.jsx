import { ColumnaGrid } from "./style";

const rutaImages = require.context("resources/images/", true);

export function BoxDescripcion({ Titulo, Texto, Imagen }) {
  return (
    <ColumnaGrid
      container
      style={{
        margin: "15px 0px",
        backgroundColor: "#fff",
        borderRadius: "15px",
      }}
    >
      <ColumnaGrid
        item
        style={{
          paddingLeft: "10px",
        }}
        md={8}
      >
        <h4>{Titulo}</h4>
        <p>{Texto}</p>
      </ColumnaGrid>
      <ColumnaGrid item md={4}>
        <img
          src={rutaImages(`./${Imagen}`)}
          alt={Imagen}
          style={{
            width: "100%",
            backgroundPosition: "center",
            backgroundSize: "contain",
            borderRadius: "0px 15px 15px 0px",
          }}
        />
      </ColumnaGrid>
    </ColumnaGrid>
  );
}
