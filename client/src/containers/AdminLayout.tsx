import React from "react";
import { Outlet } from "react-router-dom";
import GlobalHeader from "../components/GlobalHeader";

const AdminLayout: React.FC = (): JSX.Element => (
  <div>
    <GlobalHeader to="/admin" title="Admin" />
    <Outlet />
  </div>
);

export default AdminLayout;
