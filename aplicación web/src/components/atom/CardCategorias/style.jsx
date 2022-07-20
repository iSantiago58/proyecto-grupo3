import styled from "styled-components";
import { styled as materialStyle } from "@mui/system";
import TextField from "@mui/material/TextField";

const BusquedaContainer = styled("a")`
  flex: none;

  order: 1;
  flex-grow: 1;
`;

const Input = materialStyle(TextField)`
    & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #2699fb;
    }
    &.Mui-focused fieldset {
      border-color: #158ef8;
    }
  }
`;

export { BusquedaContainer, Input };