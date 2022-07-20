import px2vw from "resources/const/px2vw";
import styled from "styled-components";

/*
usar para que el contenido quede bien con el footer
*/
export const Container = styled("div")`
  width: 100%;
  height: 100%;
  display: block;
  min-height: 100%;
  height: auto !important;
  height: 100%;
  /* margin: 0 auto -100px; */
  margin: auto;
`;

export const Page = styled.div`
  & {
    display: flex;

    width: ${px2vw(320, 320)};
    margin: auto;
    height: 100vh;
    ${({ backgroundImg }) =>
      backgroundImg !== "" &&
      `
    background-image: url(${backgroundImg});
    background-size: cover;
    background-position: center center;
    background-repeat: repeat-x;
    animation: animatedBackground 10s cubic-bezier(0.47, 0, 0.75, 0.72)  infinite alternate;    
    @keyframes animatedBackground {
      from {
        background-position: 0 0;
      }
      to {
        background-position: 100% 0;
      }
    }  
  `}
    @media (min-width: 768px) {
      width: ${px2vw(620, 768)};
      height: fit-content;
    }

    @media (min-width: 1024px) {
      height: fit-content;
    }
  }
`;
