import React from "react";
import type { RouteObject } from "react-router-dom";
import PrivateRoutes from "routes/PrivateRoutes";
import AdminLayout from "containers/layouts/AdminLayout";
import PublicLayout from "containers/layouts/PublicLayout";
import NotFound from "containers/views/NotFound";
import Home from "containers/views/Home";
import Portfolio from "containers/views/Portfolio";
import Dashboard from "containers/views/admin/Dashboard";
import Assets from "containers/views/admin/Assets";
import Register from "containers/views/admin/Register";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home title="Welcome" /> },
      { path: "/portfolio", element: <Portfolio title="Portfolio" /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/register",
        element: <Register title="Create Account" />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          { index: true, element: <Dashboard title="Dashboard" /> },
          { path: "/admin/assets", element: <Assets title="File Bin" /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
];

export default routes;
