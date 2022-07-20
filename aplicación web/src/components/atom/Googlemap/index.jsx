import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { BusquedaContainer } from "./StyledComponents";
import { useLocalStorage, DefaultBusqueda } from "Hooks/LocalStoreHook";
import { useGlobalState } from "Hooks/GlobalHook";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleMapReact from "google-map-react";

export default function GoogleMapPlaces({ setData }) {
  /*
  const [busqueda, , setBusqueda] = useLocalStorage(
    "busqueda",
    DefaultBusqueda
  );
  let mapVal = busqueda.place;*/
  const navegar = useNavigate();

  const [state, dispatch] = useGlobalState();
  const location = useLocation();

  const valor = state.busqueda;
  return (
    <BusquedaContainer>
      <GooglePlacesAutocomplete
        style={{
          innerHeight: "100%",
        }}
        apiKey={process.env.REACT_APP_API_GOOGLEMAP}
        apiOptions={{ language: "es", region: "es" }}
        types={"geocode"}
        autocompletionRequest={{
          bounds: [
            { lat: 50, lng: 50 },
            { lat: 100, lng: 100 },
          ],
        }}
        selectProps={{
          valor,
          onChange: (e) => {
            dispatch({ busqueda: e });
            if (location.pathname != "/busqueda") {
              navegar("/busqueda");
            }
            //setBusqueda("place", e);
          },
        }}
      />
    </BusquedaContainer>
  );
}

export function GoogleMapPlacesForm({ setData, value = "" }) {
  const [busqueda, setBusqueda] = React.useState(value);
  return (
    <BusquedaContainer>
      <GooglePlacesAutocomplete
        styles={{
          textInputContainer: {
            innerHeight: "100%",
            fontFamily: "Roboto,Helvetica,Arial,sans-serif",
            fontWeight: "400",
            fontSize: "1rem",
            lineHeight: "1.4375em",
            letterSpacing: "0.00938em",
            color: "rgba(72, 135, 218, 0.87)",
            boxSizing: "border-box",
            position: "relative",
            cursor: "text",
            display: "inline-flex",
            height: "100%",
            alignItems: "center",
            width: "100%",
            position: "relative",
            borderRadius: "4px",
          },
          textInput: {
            font: "inherit",
            letterSpacing: "inherit",
            color: "currentColor",
            padding: "4px 0 5px",
            border: 0,
            boxSizing: "content-box",
            background: "none",
            height: "1.4375em",
            margin: 0,
            display: "block",
            minWidth: 0,
            width: "100%",
            animationName: "mui-auto-fill-cancel",
            animationDuration: "10ms",
            padding: "16.5px 14px",
          },
        }}
        apiKey={process.env.REACT_APP_API_GOOGLEMAP}
        apiOptions={{ language: "es", region: "es" }}
        types={"geocode"}
        autocompletionRequest={{
          bounds: [
            { lat: 50, lng: 50 },
            { lat: 100, lng: 100 },
          ],
        }}
        selectProps={{
          defaultInputValue: value,
          value: busqueda,
          onChange: (e) => {
            setBusqueda(e);
            setData(e);
          },
        }}
      />
    </BusquedaContainer>
  );
}

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMapLocation() {
  /*
  const [busqueda, , setBusqueda] = useLocalStorage(
    "busqueda",
    DefaultBusqueda
  );
  let mapVal = busqueda.place;*/
  const navegar = useNavigate();

  const [state, dispatch] = useGlobalState();
  const location = useLocation();

  const valor = state.busqueda;
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_GOOGLEMAP }}
        defaultCenter={{
          lat: -34.906123565084464,
          lng: -56.18609223221018,
        }}
        defaultZoom={11}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
