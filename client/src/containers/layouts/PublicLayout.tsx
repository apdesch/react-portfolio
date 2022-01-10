import React from "react";
import { Outlet } from "react-router-dom";
import GlobalHeader from "components/GlobalHeader";

const PublicLayout: React.FC = (): JSX.Element => (
  <div>
    <GlobalHeader
      to="/"
      title="Home"
      nav={[{ path: "/admin", label: "Dashboard" }]}
    />
    <Outlet />
  </div>
);

export default PublicLayout;