import React, { useState } from "react";
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./mapa.css";

export default function Mapa() {
  const [state, setState] = useState({
    currentLocation: { lat: 52.52437, lng: 13.41053 },
    zoom: 13,
  });
  return (
    <MapContainer
      style={{ width: "1300px", height: "1100px" }}
      center={[51.0, 19.0]}
      zoom={4}
      maxZoom={18}
    ></MapContainer>
  );
}
