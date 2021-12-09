import React from "react";
import { render } from "react-dom";
import AppProvider from "./App.provider";
import App from "./App";
import "./index.css";

const mountNode = document.getElementById("app");
render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  mountNode,
);
