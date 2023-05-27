import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { AuthStateProvider } from "./state/useAuthState.ts";
import { HttpApiProvider } from "./state/useHttpApi.ts";
import { AuthStateSharedProvider } from "./state/useAuthStateShared.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <HttpApiProvider>
        <AuthStateSharedProvider>
          <AuthStateProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </AuthStateProvider>
        </AuthStateSharedProvider>
      </HttpApiProvider>
    </BrowserRouter>
  </React.StrictMode>
);
