import React from "react";
import { useRoutes } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import routes from "./routes";

const App: React.FC = () => {
  const router = useRoutes(routes);
  return router;
};

export default hot(App);
