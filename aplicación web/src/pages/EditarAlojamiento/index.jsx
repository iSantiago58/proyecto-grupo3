import React from "react";
import { EditHousing } from "components/organism/NewHousing";
import Api from "server/Api";
import { useParams } from "react-router-dom";

const actualizarAlojamiento = () => {
  console.log("actualizar");
};

export default function EditarAlojamiento() {
  const { id } = useParams();
  const [alojamientoOriginal, setAlojamientoOriginal] = React.useState({});
  React.useEffect(() => {
    const obtenerData = async () => {
      const api = new Api();

      const data = await api.details(id);

      setAlojamientoOriginal(data);
    };
    obtenerData();
    return () => {};
  }, []);
  if (Object.keys(alojamientoOriginal).length == 0) {
    return <div></div>;
  }

  return (
    <EditHousing
      data={alojamientoOriginal}
      submit={actualizarAlojamiento}
      type={""}
    />
  );
}
