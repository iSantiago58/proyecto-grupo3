import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import px2vw from "resources/const/px2vw";

export const ButtonBase = styled(Button)`
  width: ${(props) => props.width || 100}%;

  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const TextBase = styled(Button)`
  height: 5vh;
  font-size: 1rem;
  @media (min-width: 768px) {
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;
