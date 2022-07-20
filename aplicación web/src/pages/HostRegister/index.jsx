import Api from "server/Api";
import RegisterHost from "components/organism/RegisterHost";

const registerHost = async function (
  alias,
  email,
  contra,
  apellido,
  nombre,
  telefono,
  avatar,
  fechaNacimiento,
  bank,
  account,
  locCoordinates,
  place,
  accPrice,
  locStreet,
  imagenes,
  locDoorNumber,
  accName,
  accDescription,
  servicios,
  caracteristicas
) {
  const backend = new Api();

  let country = place.value.terms[0].value;
  let province = place.value.terms[0].value;
  let city = place.value.terms[0].value;

  if (place.value.terms.length === 3) {
    country = place.value.terms[2].value;
    province = place.value.terms[1].value;
  } else if (place.value.terms.length === 2) {
    country = place.value.terms[1].value;
    province = place.value.terms[0].value;
  }

  var formData = new FormData(); //formdata object
  servicios.forEach((service) => {
    if (service.hasOwnProperty("value") && service.value) {
      formData.append("services", service.id);
    }
  });
  caracteristicas.forEach((feature) => {
    formData.append("features", feature.id + "-" + feature.value);
  });

  for (const [index, image] of imagenes.entries()) {
    const blob = await fetch(image).then((res) => res.blob());
    formData.append("images", blob, "imagen" + index + ".jpg");
  }
  formData.append("alias", alias);
  formData.append("email", email);
  formData.append("password", contra);
  formData.append("name", nombre);
  formData.append("lastName", apellido);
  formData.append("phone", telefono);
  formData.append("birthday", fechaNacimiento);
  formData.append("picture", avatar);
  formData.append("bank", bank);
  formData.append("account", account);
  formData.append("loc_coordinates", locCoordinates);
  formData.append("loc_country", country);
  formData.append("loc_province", province);
  formData.append("loc_street", locStreet);
  formData.append("loc_doorNumber", locDoorNumber);
  formData.append("acc_price", accPrice);
  formData.append("loc_city", city);
  formData.append("acc_name", accName);
  formData.append("acc_description", accDescription);

  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  return backend.hostCreate(formData);
};

export default function HostHousing() {
  return <RegisterHost submit={registerHost}></RegisterHost>;
}
