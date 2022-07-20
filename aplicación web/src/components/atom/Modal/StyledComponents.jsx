import styled from "styled-components";
import { styled as materialStyle } from "@mui/system";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const ModalSC = materialStyle(Modal)`
  background: ${(props) => props.background || 0};
  
`;

const BoxSC = materialStyle(Box)`
 /* foto=derecha */


/* Auto layout */

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;

position: absolute;
width: 982px;
height: 444px;
left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

/* Color - White */

border-radius: 30px;
`;
const BoxSmall = materialStyle(Box)`
 /* foto=derecha */


/* Auto layout */

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;

position: absolute;
width: 300px;
height: 150px;
left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  

/* Color - White */

border-radius: 30px;
  background: white;

`;

export { ModalSC, BoxSC, BoxSmall };
