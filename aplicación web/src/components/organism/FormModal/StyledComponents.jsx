import styled from "styled-components";
import { styled as materialStyle } from "@mui/system";
import TextField from "@mui/material/TextField";
import OutlinedInput, {
  outlinedInputClasses,
} from "@mui/material/OutlinedInput";
import { theme, customColors } from "resources/const/Template";

import CiudadNoche from "resources/svgs/CiudadNoche.svg";

import Switch from "@mui/material/Switch";
import { SsidChart } from "@mui/icons-material";

const FormContainer = styled("div")`
  /* Color - White */
  /* foto=derecha */

  /* Auto layout */

  display: flex;
  flex-direction: row-reverse;

  justify-content: center;
  align-items: center;
  padding: 0px;

  position: absolute;
  width: 100%;
  height: 100%;
`;

const Columna = styled("div")`
  /* Frame 11 */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 19px;
  width: 491px;
  height: 100%;
  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
  background: #ffffff;
`;

const Center = styled("div")`
  padding: 0px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 19px;
  box-sizing: border-box;
`;

const Imagen = styled("div")`
  /* Rectangle 41 */

  background: url(${CiudadNoche});

  background-position: center;
  background-size: cover;
  width: 492px;
  height: 445px;
  /* Inside auto layout */
  position: relative;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 1;

  -webkit-animation: bg-pan-right 60s infinite both;
  animation: bg-pan-right 60s infinite both;
  animation-direction: ${(props) => props.direccion};
  @-webkit-keyframes bg-pan-right {
    0% {
      background-position: 0 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
  @keyframes bg-pan-right {
    0% {
      background-position: 0 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`;

const Titulo = styled("label")`
  /* Heading - H2 */

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 53px;
  /* identical to box height, or 110% */
  position: absolute;

  bottom: 2%;
  right: ${(props) => props.right || 0}%;
  left: ${(props) => props.left || 0}%;

  user-select: none;
  color: #ffffff;
`;
const Form = styled("form")`
  /* Inside auto layout */
  /* Auto layout */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* Inside auto layout */
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  align-items: center;
  justify-content: center;
  gap: 2%;
`;

const H1 = styled("h1")`
  /* Titulo */

  /* Heading - H4 */

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 35px;
  /* identical to box height, or 110% */

  text-align: center;

  color: #000000;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const InputsContainer = styled("div")`
  /* Frame 14 */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8px;

  width: 80%;
  padding-left: 10%;

  /* Inside auto layout */

  flex: none;
  align-self: stretch;
  flex-grow: 0;
`;

const Input = materialStyle(TextField)`
/* Atomo| InputForm */


width: 100%;
height: 73px;


/* Inside auto layout */

flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;
`;

const CustomOutilinedInput = materialStyle(OutlinedInput)(`
  & .${outlinedInputClasses.notchedOutline} {
    border-color: ${customColors.primary};
  }
  &:hover .${outlinedInputClasses.notchedOutline} {
    border-color: blue;
  }
  &.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline} {
    border-color: lime;
  }
`);

const CustomSwitch = materialStyle(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: 200,
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));
const Subtitulo = styled("label")`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 26px;
`;

const FilaRegistro = styled("div")`
  /* rows */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;

  width: 483px;

  /* Inside auto layout */

  flex: none;
`;

const BtnContainer = styled("div")`
  height: 45px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Pregunta = styled("a")`
  /* ¿Olvidaste la contraseña ? */

  width: 120px;
  height: 11px;
  margin-top: 8px;
  cursor: pointer;
  font-family: "Arial";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 11px;
  text-decoration-line: underline;

  color: #000000;

  /* Inside auto layout */

  flex: none;
  flex-grow: 0;
`;

const BtnRow = styled("div")`
  /* botones */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 2.44px;

  width: 80%;

  /* Inside auto layout */

  flex: none;
  order: 4;
  flex-grow: 0;
`;

const ColumnaSecundaria = styled("div")`
  /* Frame 15 */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 235.5px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 1;
`;

const ErrorLabel = styled("label")`
  width: 70%;
  background: #ff7a7a;
  border-radius: 8px;
  font-weight: 900;
  font-family: "Arial";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  text-align: center;

  color: #000000;
  padding: 7px;
`;
const EmptyLabel = styled("label")`
  width: 70%;
  border-radius: 8px;
  font-weight: 900;
  font-family: "Arial";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 17px;
  /* identical to box height */

  text-align: center;

  color: #000000;
  padding: 7px;
`;

export {
  FormContainer,
  Columna,
  ColumnaSecundaria,
  Imagen,
  Titulo,
  Form,
  H1,
  InputsContainer,
  Input,
  Center,
  CustomOutilinedInput,
  BtnContainer,
  Pregunta,
  CustomSwitch,
  BtnRow,
  FilaRegistro,
  ErrorLabel,
  EmptyLabel,
  Subtitulo,
};
