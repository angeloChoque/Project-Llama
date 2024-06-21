import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { HashRouter  } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import theme from "../src/assets/color/theme.js";

dayjs.locale("en");
dayjs.extend(utc);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
