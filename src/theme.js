import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#ff9800",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontSize: 13,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    h1: {
      fontSize: "4rem",
      fontWeight: 500,
      lineHeight: 1.18,
    },
    h2: {
      fontSize: "3rem",
    },
    h3: {
      fontSize: "2rem",
    },
    caption: {
      fontSize: "0.7rem",
    },
  },
  spacing: 5,
  shape: {
    borderRadius: 25,
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: "#689f38",
        color: "#fff",
      },
    },
  },
  props: {
    MuiAppBar: {
      color: "inherit",
    },
  },
});

export default theme;
