import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const rutaImages = require.context("resources/images/", true);

function CardCategorias({ Lugar, Imagen, EnlaceLink }) {
  //const navegar = useNavigate();
  //navegar.call(Ruta)
  return (
    <Link style={{ textDecoration: "none" }} to={EnlaceLink}>
      <Card
        sx={{
          maxWidth: 345,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <CardMedia
          component="img"
          height={"100%"}
          image={rutaImages(`./${Imagen}`)}
          alt="green iguana"
        />
        <CardContent height={"100%"}>
          <Typography gutterBottom variant="h5" component="div">
            {Lugar}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export { CardCategorias };
