import React from "react";
import type { RouteObject } from "react-router-dom";
import PrivateRoutes from "routes/PrivateRoutes";
import AdminLayout from "containers/layouts/AdminLayout/AdminLayout";
import PublicLayout from "containers/layouts/PublicLayout";
import NotFound from "containers/views/NotFound/NotFound";
import Portfolio from "containers/views/Portfolio";
import Resume from "containers/views/Resume";
import Dashboard from "containers/views/admin/Dashboard";
import Assets from "containers/views/admin/Assets";
import Register from "containers/views/admin/Register";
import Projects from "containers/views/admin/Projects";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Portfolio title="Portfolio" /> },
      { path: "/resume", element: <Resume title="Resume" /> },
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
          { path: "/admin/projects", element: <Projects title="Projects" /> },
          {
            path: "/admin/projects/:id",
            element: <Projects title="Projects" />,
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
];

export default routes;
