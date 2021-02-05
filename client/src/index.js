import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const theme = createMuiTheme({
  typography: {
    fontFamily: `'Noto Serif', serif;`,
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#FF9900",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
