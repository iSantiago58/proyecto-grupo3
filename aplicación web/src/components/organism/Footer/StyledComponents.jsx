import styled from "styled-components";

const FooterContainer = styled("div")`
  /* dimension=HD desktop */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  gap: 31px;
  position: relative;
  background: #ffffff;
  bottom: 0;
  width: 100%;
`;
const Creditos = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 22px;

  width: 1226px;
  height: 23px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;
const ItemCreditos = styled("div")`
  /* © 2022 Go And Rent , Inc. */

  height: 23px;

  /* Text - Normal */

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height, or 140% */

  color: #222222;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;
const Informacion = styled("div")`
  /* Row */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  height: 155px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;
const ItemInfo = styled("div")`
  /* Menu */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 29px;

  height: 155px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 1;
`;
const LogoInfo = styled("div")`
  /* Logo+nombre */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  width: 175px;
  height: 64px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;
const TituloInfo = styled("div")`
  /* Asistencia */

  width: 125px;
  height: 27px;

  /* Heading - H5 */

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 26px;
  /* identical to box height, or 110% */

  color: #000000;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;
const LinksList = styled("div")`
  /* Opciones */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0px;
  gap: 15px;

  height: 99px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;
const LinkInfo = styled("div")`
  /* Politicas de cancelación */

  height: 23px;

  /* Text - Normal */

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height, or 140% */

  color: #000000;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export {
  FooterContainer,
  Creditos,
  ItemCreditos,
  Informacion,
  ItemInfo,
  LogoInfo,
  TituloInfo,
  LinksList,
  LinkInfo,
};
