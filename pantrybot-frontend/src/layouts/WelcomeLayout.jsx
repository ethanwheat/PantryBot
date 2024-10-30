import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import routes from "../constants/routes";
import { useAuth } from "../providers/AuthProvider";

export default function WelcomeLayout() {
  const { token } = useAuth();

  // Redirect user to login page if not logged in.
  if (token) {
    return <Navigate to={routes.dashboard} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
