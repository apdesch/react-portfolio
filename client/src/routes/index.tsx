import React from "react";
import loadable from "@loadable/component";
import type { RouteObject } from "react-router-dom";
const PrivateRoutes = loadable(() => import("routes/PrivateRoutes"));
const AdminLayout = loadable(
  () => import("containers/layouts/AdminLayout/AdminLayout"),
);
const PublicLayout = loadable(() => import("containers/layouts/PublicLayout"));
const NotFound = loadable(() => import("containers/views/NotFound/NotFound"));
const Portfolio = loadable(() => import("containers/views/Portfolio"));
const Resume = loadable(() => import("containers/views/Resume"));
const About = loadable(() => import("containers/views/About"));
const Dashboard = loadable(() => import("containers/views/admin/Dashboard"));
const Assets = loadable(() => import("containers/views/admin/Assets"));
const Register = loadable(() => import("containers/views/admin/Register"));
const Projects = loadable(() => import("containers/views/admin/Projects"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Portfolio title="Portfolio" /> },
      { path: "/resume", element: <Resume title="Resume" /> },
      { path: "/about", element: <About title="About" /> },
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
