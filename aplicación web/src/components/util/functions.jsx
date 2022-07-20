export function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export function formatDate(date) {
  if (typeof date === "string") {
    date = new Date(date);
  }
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}
export function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}
export const parseParams = (params) => {
  const keys = Object.keys(params);
  let options = "";

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === "object";
    const isParamTypeArray = isParamTypeObject && params[key].length >= 0;

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach((element) => {
        options += `${key}=${element}&`;
      });
    }
  });
  return options ? options.slice(0, -1) : options;
};

export const cambiarFormatoFecha = (fecha) => {
  if (typeof fecha !== "string" && fecha !== "") {
    return new Date();
  }
  var dateParts = fecha.split("-");
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
};

export const calcularEstado = (reserva) => {
  let estadoActual = reserva.bookingStatus;

  var datePartsEnd = reserva.endDate.split("/");
  var datePartsStart = reserva.startDate.split("/");

  // month is 0-based, that's why we need dataParts[1] - 1
  var lastDate = new Date(
    +datePartsEnd[2],
    datePartsEnd[1] - 1,
    +datePartsEnd[0]
  );

  var startDate = new Date(
    +datePartsStart[2],
    datePartsStart[1] - 1,
    +datePartsStart[0]
  );
  if (lastDate < new Date() && estadoActual === "ACEPTADA") {
    estadoActual = "COMPLETADA";
  } else if (lastDate < new Date() && estadoActual === "PENDIENTE") {
    estadoActual = "CANCELADA";
  } else if (
    startDate < new Date() &&
    lastDate > new Date() &&
    estadoActual === "PENDIENTE"
  ) {
    estadoActual = "EN CURSO";
  }
  return estadoActual;
};

export const obtenerDate = (dateString) => {
  var dateParts = dateString.split("/");
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
};
