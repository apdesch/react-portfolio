import React from "react";
import { render } from "react-dom";
import "./index.css";

const mountNode = document.getElementById("app");
render(
  <React.StrictMode>
    <h1>App</h1>
  </React.StrictMode>,
  mountNode,
);
