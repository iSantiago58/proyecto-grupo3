import styled from "styled-components";

const ErrorLabel = styled("label")`
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
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
`;
const EmptyLabel = styled("label")`
  border-radius: 8px;
  font-weight: 900;
  font-family: "Arial";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  text-align: center;

  width: 80%;
  height: 15%;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
`;
export { ErrorLabel, EmptyLabel };
