import styled from "styled-components";

const RegisterAdmin = styled("div")``;

const ItemForm = styled("div")`
  justify-content: center;
`;

const BtnContainer = styled("div")`
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
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

export { RegisterAdmin, ItemForm, BtnContainer, H1, EmptyLabel, ErrorLabel };
