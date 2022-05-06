import React from "react";
import { Outlet } from "react-router-dom";
import "../../styles/app.css";

const PublicLayout: React.FC = (): JSX.Element => (
  <div className="app">
    <Outlet />
  </div>
);

export default PublicLayout;
