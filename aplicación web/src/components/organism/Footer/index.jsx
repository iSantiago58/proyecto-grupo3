import React from "react";

import Logo from "components/atom/Logo";

import {
  FooterContainer,
  Creditos,
  ItemCreditos,
  Informacion,
  ItemInfo,
  LogoInfo,
  TituloInfo,
  LinksList,
  LinkInfo,
} from "./StyledComponents";

export default function Footer() {
  return (
    <FooterContainer>
      <Informacion>
        <LogoInfo>
          <Logo />
        </LogoInfo>
        <ItemInfo>
          <TituloInfo>Asistencia</TituloInfo>
          <LinksList>
            <LinkInfo>Politicas de cancelación</LinkInfo>
            <LinkInfo>Contactanos</LinkInfo>
            <LinkInfo>Sobre nosotros</LinkInfo>
          </LinksList>
        </ItemInfo>
        <ItemInfo>
          <TituloInfo>Acerca de</TituloInfo>
          <LinksList>
            <LinkInfo>App mobile</LinkInfo>
            <LinkInfo>Perfiles de usuarios</LinkInfo>
          </LinksList>
        </ItemInfo>
      </Informacion>
      <Creditos>
        <ItemCreditos>© 2022 Go And Rent , Inc.</ItemCreditos>
        <ItemCreditos>Privacidad</ItemCreditos>{" "}
        <ItemCreditos>Términos</ItemCreditos>
      </Creditos>
    </FooterContainer>
  );
}
