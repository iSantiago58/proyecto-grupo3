import React from "react";
import { Routes, Route } from "react-router-dom";

//React components
import Header from "components/organism/Header";
import Footer from "components/organism/Footer";
//HOOK
import { useLocalStorage } from "Hooks/LocalStoreHook";
//PAGES
import ChangeUserData from "pages/ChangeUserData";
import Busqueda from "pages/Busqueda";
import AdminRegister from "pages/AdminRegister";
import CreateHousing from "pages/CreateHousing";
import HostHousing from "pages/HostRegister";
import Profile from "pages/Profile";
import HomePage from "pages/Home";
import ChangePassword from "pages/ChangePassword";
import { RouterContainer, Container } from "./StyledComponents";
import DetalleAlojamiento from "pages/DetalleAlojamiento";
import UsuariosPage from "pages/Usuarios";
import AprobarUsuario from "pages/AprobarUsuario";
import { ListaReservas } from "pages/Reservas";
import AdministrarReservas from "pages/AdministrarReservas";
import EditarAlojamiento from "pages/EditarAlojamiento";
import Mensajeria from "pages/Mensajeria";
import Estadisticas from "pages/Estadisticas";
import MensajeExito from "pages/MensajeExito";

export const AppRouter = ({ children }) => {
  const [usuario] = useLocalStorage("usuario", "");

  return (
    <RouterContainer>
      <Header />
      <Container>
        <Routes>
          <Route path="/completado/:id" element={<MensajeExito />} />
          <Route path="/reservas" element={<ListaReservas />} />
          <Route path="/reservas/:id" element={<AdministrarReservas />} />
          <Route path="/reservas/editar/:id" element={<EditarAlojamiento />} />

          <Route path="/" element={<HomePage key={Date.now()} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/registrar-anfitrion" element={<HostHousing />} />

          <Route path="/mensajeria" element={<Mensajeria />} />

          <Route path="/perfil" element={<Profile />}></Route>
          <Route
            path="/detalles/:id/:startDate/:endDate"
            element={<DetalleAlojamiento />}
          />
          <Route path="/detalles/:id" element={<DetalleAlojamiento />} />
          <Route
            path="/perfil/cambiar-contrasena"
            element={<ChangePassword />}
          />
          <Route path="/perfil/editar" element={<ChangeUserData />} />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="edit" element={<ChangeUserData />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="/anfitrion">
            <Route path="new-housing" element={<CreateHousing />} />
            <Route path="nuevo-alojamiento" element={<CreateHousing />} />
          </Route>
          <Route path="/busqueda" element={<Busqueda />}></Route>
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/admin">
            <Route path="nuevo-admin" element={<AdminRegister />} />
            <Route path="usuarios" element={<UsuariosPage />} />
            <Route
              path="aprobarUsuarios/:id/:alias"
              element={<AprobarUsuario />}
            />
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
        {children}
      </Container>
      <Footer />
    </RouterContainer>
  );
};
