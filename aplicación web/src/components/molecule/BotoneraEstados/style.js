import Card from '@mui/material/Card';
import styled from "styled-components";
import { styled as materialStyle } from "@mui/system";
import Grid from '@mui/material/Grid';

const ColumnaGrid = materialStyle(Grid)`
    margin: 0 auto;
`;

const CategoriaContenedor = materialStyle(Card)`
`;
export { CategoriaContenedor,ColumnaGrid };



