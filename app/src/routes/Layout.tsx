import React from "react";
import { Outlet } from "react-router-dom";
import GlobalHeader from "components/GlobalHeader";

const Layout: React.FC = (): JSX.Element => (
  <div>
    <GlobalHeader title="App" />
    <Outlet />
  </div>
);

export default Layout;
