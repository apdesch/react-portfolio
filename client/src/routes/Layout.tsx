import React from "react";
import { Outlet } from "react-router-dom";
import GlobalHeader from "components/GlobalHeader";

const Layout: React.FC = (): JSX.Element => (
  <div>
    <GlobalHeader
      to="/"
      title="App"
      nav={[{ path: "/admin", label: "Admin" }]}
    />
    <Outlet />
  </div>
);

export default Layout;
