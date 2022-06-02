import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";

const theme = createTheme({
  typography: {
    h3: {
      fontFamily: "Oswald",
      lineHeight: "1.1",
    },
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "Oxygen-Sans",
      "Ubuntu",
      "Cantarell",
      '"Helvetica Neue"',
      "sans-serif",
      "Oswald",
    ].join(","),
  },
  palette: {
    danger: "#A00000",
    primary: {
      main: "#203c58",
      light: "#4d6685",
      dark: "#00162f",
    },
    secondary: {
      main: "#be3c3c",
      light: "#f66d67",
      dark: "#870016",
    },
    light: {
      main: "#e9ecef",
    },
    gray: {
      main: "#666666",
    },
    all: { main: "inherit" },
  },
});

const CustomTheme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default CustomTheme;

CustomTheme.propTypes = {
  children: PropTypes.node.isRequired,
};
