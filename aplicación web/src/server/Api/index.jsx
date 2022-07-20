import axios from "axios";
import { parseParams } from "components/util/functions";

// 401 para desconectar al usuario

export default class Api {
  constructor() {
    //localStorage.getItem("token")

    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let token = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("token")
    ) {
      token = usuario.token;
    }
    this.api_token = token;
    this.client = null;
    this.api_url = process.env.REACT_APP_API_ENDPOINT;
  }
  init = (header = {}) => {
    //this.api_token = getCookie("ACCESS_TOKEN");

    let headers = header;
    if (this.api_token && this.api_token !== "") {
      headers.Authorization = `Bearer ${this.api_token}`;
    }
    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });
    return this.client;
  };

  login = (data) => {
    return this.init().post("auth/login", data);
  };
  adminCreate = (data) => {
    return this.init().post("admin/signup", data);
  };

  guestCreate = (data) => {
    return this.init().post("auth/signup/guest", data);
  };
  recoverPassword = (email) => {
    return this.init().get("auth/recover-password/" + email);
  };
  validateCode = (email, code) => {
    return this.init().get("auth/validate-code/" + email + "/" + code);
  };
  verificarReserva = (id, to, from) => {
    return this.init().get("guests/booking/verify");
  };
  changePassword = (email, data) => {
    return this.init().post("auth/recover/change-password/" + email, data);
  };
  changePasswordProfile = (
    data = {
      alias: "prueba1",
      oldPassword: "prueba2",
      newPassword: "prueba1",
    }
  ) => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));

    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }
    data.alias = alias;
    return this.init().put("user/update/password", data);
  };
  editUserProfile = async (data) => {
    let resultado = await this.init().put("user/update-profile", data);

    return [resultado.data, resultado.status];
  };

  hostCreate = (data) => {
    return this.init({ "Content-Type": "multipart/form-data" }).post(
      "auth/signup/host",
      data
    );
  };
  profile = (data) => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));

    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }
    return this.init({ "Content-Type": "multipart/form-data" }).get(
      "user/profile/" + alias,
      data
    );
  };

  details = async (id) => {
    try {
      const response = await this.init().get("data/accommodation/info/" + id);
      return response.data;
    } catch (e) {}
  };

  filter = async (params) => {
    /* return await this.init({ "Content-Type": "multipart/form-data" }).get(
      "/data/accommodation/search" + alias,
      data
    );
    */
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_ENDPOINT + "data/accommodation/search",
        { params, paramsSerializer: (params) => parseParams(params) }
      );
      return response.data.accommodations;
    } catch (e) {}
  };

  features = () => {
    return this.init().get("data/features");
  };
  creacionAlojamiento = (data) => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }

    return this.init({ "Content-Type": "multipart/form-data" }).post(
      "hosts/accommodation/add/" + alias,
      data
    );
  };
  editarAlojamiento = (id, data) => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }

    return this.init({ "Content-Type": "multipart/form-data" }).post(
      "hosts/accommodation/update/" + id,
      data
    );
  };

  listadoUsuarios = () => {
    return this.init().get("admin/users");
  };
  alojamientosAnfitrion = async () => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }
    let resultado = await this.init().get("hosts/accommodation/list/" + alias);

    return resultado.data;
  };
  reservasHuesped = async () => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }
    let resultado = await this.init().get("guests/bookings/" + alias);

    return resultado.data;
  };

  listadoReservas = async () => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }
    let resultado = await this.init().get(
      "hosts/bookings/" + alias + "?nroPag=0&cantReg=100"
    );

    return resultado.data;
  };

  detalleReserva = async (id) => {
    let resultado = await this.init().get("/guests/booking/detail/" + id);

    return resultado.data;
  };

  booking = async (data) => {
    let resultado = await this.init().post("booking/guest-web/confirm", data);
    return resultado.data;
  };
  calificarHuesped = async (
    data = {
      qualifyingUser: "anfitrion1",
      qualifiedUser: "prueba1",
      qualification: 4,
    }
  ) => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }
    data.qualifyingUser = alias;
    let resultado = await this.init().post("hosts/qualify-guest", data);
    return resultado.data;
  };
  eliminarCalificacionHuesped = async (guest) => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }
    let resultado = await this.init().delete(
      "hosts/qualify-guest/" + alias + "/" + guest
    );
    return resultado.data;
  };
  calificarAnfitrion = async (
    data = {
      qualifyingUser: "anfitrion1",
      qualifiedUser: "prueba1",
      qualification: 4,
    }
  ) => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }
    data.qualifyingUser = alias;
    let resultado = await this.init().post("guests/qualify-host", data);
    return resultado.data;
  };
  eliminarCalificacionAnfitrion = async (guest) => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }
    let resultado = await this.init().delete(
      "guests/qualify-host/" + alias + "/" + guest
    );
    return resultado.data;
  };
  agregarResenaAlojamiento = async (
    data = {
      bookingId: 1,
      description: "todo roto el alojamiento. muy malo",
      qualification: "1",
    }
  ) => {
    let resultado = await this.init().post("guests/review/add", data);
    return resultado.data;
  };
  editarResenaAlojamiento = async (
    data = {
      reviewId: 6,
      qualification: 2,
      description: "Perdia agua la pileta.",
    }
  ) => {
    let resultado = await this.init().put("guests/review/update", data);
    return resultado.data;
  };

  rechazarReserva = async (
    data = {
      booking_id: 0,
    }
  ) => {
    let resultado = await this.init().post("booking/host/reject", data);
    return resultado.data;
  };

  rembolsarReserva = async (
    data = {
      booking_id: 0,
      reimbursedBy: "HOST" | "GUEST",
    }
  ) => {
    let resultado = await this.init().post("booking/refund", data);
    return resultado;
  };

  confirmarReserva = async (
    data = {
      booking_id: 0,
    }
  ) => {
    let resultado = await this.init().post("booking/host/confirm", data);
    return resultado;
  };

  borrarUsuario = async () => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let alias = null;
    if (
      usuario !== null &&
      typeof usuario === "object" &&
      usuario.hasOwnProperty("alias")
    ) {
      alias = usuario.alias;
    }

    let resultado = await this.init().delete("guests/delete/" + alias);
    return resultado;
  };
  obtenerEstadisticas = async () => {
    let resultado = await this.init().get("admin/statistics");
    return resultado.data;
  };
  aceptarUsuarios = (alias) => {
    return this.init().put("admin/approve-host/" + alias);
  };
  bloquearUsuarios = (alias) => {
    return this.init().put("admin/block/" + alias);
  };
  desloquearUsuarios = (alias) => {
    return this.init().put("admin/unlock/" + alias);
  };
  eliminarUsuarios = (alias) => {
    return this.init().put("admin/delete-user/" + alias);
  };
  rechazarUsuarios = (alias) => {
    return this.init().put("admin/reject-host/" + alias);
  };

  eliminarAlojamiento = async (id) => {
    let resultado = await this.init().delete(
      "hosts/accommodation/delete/" + id
    );
    return resultado;
  };

  descargarPagos = (
    ano = new Date().getFullYear(),
    mes = new Date().getMonth()
  ) => {
    axios
      .get(
        process.env.REACT_APP_API_ENDPOINT +
          "admin/payments/" +
          mes +
          "/" +
          ano,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${this.api_token}` },
        }
      )
      .then((response) => {
        window.open(URL.createObjectURL(response.data));
      });
    /*
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
      */
  };
}
