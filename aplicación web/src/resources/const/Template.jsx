import { createTheme } from "@mui/material/styles";
import px2vw from "resources/const/px2vw";
import { purple, red, yellow, deepOrange, blue } from "@mui/material/colors";
import * as locales from "@mui/material/locale";

export const customColors = {
  gray: "#eaeaea",
  primary: "#2699fb",
};

export const theme = createTheme(
  {
    palette: {
      primary: {
        50: "#e3f2fd",
        100: "#bbdefb",
        200: "#90caf9",
        300: "#64b5f6",
        400: "#42a5f5",
        500: "#2196f3",
        600: "#1e88e5",
        700: "#1976d2",
        800: "#1565c0",
        900: "#0d47a1",
        A100: "#82b1ff",
        A200: "#448aff",
        A400: "#2979ff",
        A700: "#2962ff",
      },
      secondary: purple,
      error: red,
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
    components: {
      // Name of the component
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            borderRadius: 10,
            fontSize: "1rem",
            "@media (min-width: 768px)": {
              fontSize: "1rem",
            },
            "@media (min-width: 1024px)": {
              fontSize: "1rem",
            },
          },
        },
        variants: [
          {
            props: { variant: "contained", size: "ultrasmall" },
            style: {
              fontSize: "0.5rem",
              color: "primary",
              "@media (min-width: 768px)": {
                fontSize: "0.5rem",
                color: "primary",
              },
              "@media (min-width: 1024px)": {
                fontSize: "1rem",
                color: "primary",
              },
            },
          },
        ],
      },
      MuiPaper: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            backgroundColor: customColors.gray,
            borderRadius: 10,
          },
        },
      },
    },
  },
  locales.esES
);

const myTheme = {
  fonts: {
    title: {
      size: "17px",
      family: "Helvetica",
      weight: "normal",
    },
    subtitle: {
      family: "Roboto",
      style: "normal",
      weight: "400",
      size: "1rem",
    },
    text: {
      size: "1rem",
      family: "Helvetica",
      weight: "normal",
    },
  },
  size: {
    logo: "100px",
  },
  defaultText: {
    text: "TextoDefault",
    listText: ["texto1", "texto2", "texto3"],
  },
};

export { myTheme };
