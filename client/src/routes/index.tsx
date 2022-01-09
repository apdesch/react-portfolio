import type { RouteObject } from "react-router-dom";
import PrivateRoutes from "routes/PrivateRoutes";
import AdminLayout from "containers/AdminLayout";
import PublicLayout from "containers/PublicLayout";
import NotFound from "views/NotFound";
import Home from "views/Home";
import About from "views/About";
import Dashboard from "views/admin/Dashboard";
import Assets from "views/admin/Assets";
import Register from "views/admin/Register";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home title="Welcome" /> },
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
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
];

export default routes;
