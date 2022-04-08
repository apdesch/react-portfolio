import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "providers/App.provider";
import App from "./App";
import "static/index.css";

const mountNode = document.getElementById("root")!;
const root = createRoot(mountNode);

root.render(
  <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProvider>,
);
