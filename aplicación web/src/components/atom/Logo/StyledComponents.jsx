import styled from "styled-components";

const AtomoLogo = styled("div")`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  transform: scale(0.7);
  cursor: pointer;
`;

const Imagen = styled("svg")`
  /* Frame 9921 */

  width: 64px;
  height: 64px;

  border-radius: 10px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Nombre = styled("h4")`
  /* GO&RENT */

  width: 111px;
  height: 48px;

  font-family: "Bebas Neue";
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 48px;
  /* identical to box height */

  /* Color - Primary */

  color: #0064bb;
  user-select: none;
  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export { AtomoLogo, Imagen, Nombre };
