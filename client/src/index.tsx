import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "providers/App.provider";
import App from "./App";
import "static/index.css";

render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
