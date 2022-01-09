import React from "react";
import { Outlet, Link } from "react-router-dom";
import GlobalHeader from "components/GlobalHeader";

const AdminLayout: React.FC = (): JSX.Element => (
  <div>
    <GlobalHeader to="/admin" title="Admin" />
    <Link to="/">Home</Link>
    <Outlet />
  </div>
);

export default AdminLayout;
