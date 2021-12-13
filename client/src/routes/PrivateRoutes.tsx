import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes: React.FC = (): JSX.Element => {
  const location = useLocation();
  return localStorage.getItem("authToken") ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} />
  );
};

export default PrivateRoutes;
