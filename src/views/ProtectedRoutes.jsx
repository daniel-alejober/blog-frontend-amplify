import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const itemLS = localStorage.getItem("persist:root");
  const usuario = JSON.parse(itemLS);
  const dataUser = JSON.parse(usuario.user);

  if (dataUser.user !== null) return <Outlet />;
  return <Navigate to="/" />;
};

export default ProtectedRoutes;
