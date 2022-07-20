import styled from "styled-components";

const RouterContainer = styled("div")`
  /* Registro Huésped */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 10px;
  /* Background */
  height: auto;

  position: relative;
  min-height: 100vh;

  background: #dee7fa;
`;
const Container = styled("div")`
  width: 100%;
  display: block;
  min-height: 100%;
  height: 100%;
  top: 0;
  margin: auto;
  margin-top: 0;
`;
export { RouterContainer, Container };
