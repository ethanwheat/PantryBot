import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import routes from "../constants/routes";
import { useAuth } from "../providers/AuthProvider";

export default function WelcomeLayout() {
  const { session } = useAuth();

  // Redirect user to login page if logged in.
  if (session) {
    return <Navigate to={routes.app.dashboard} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
