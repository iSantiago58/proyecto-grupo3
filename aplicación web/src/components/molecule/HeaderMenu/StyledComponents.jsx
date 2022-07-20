import styled from "styled-components";
import { styled as materialStyle } from "@mui/system";
import Link from "@mui/material/Link";

const MenuContainer = styled("div")`
  /* Menu */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 25px;

  margin-right: 3%;

  width: fit-content;

  /* Inside auto layout */

  flex: none;
  order: 2;
  flex-grow: 0;
`;

const Item = materialStyle(Link)`
  width: fit-content;
  left: 19px;

  /* Text - Normal */

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height, or 140% */

  text-align: center;

  color: #000000;
`;

export { MenuContainer, Item };
