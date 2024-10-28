import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import ThemedNavbar from "../components/navigation/ThemedNavbar";
import routes from "../constants/routes";
import { useAuth } from "../providers/AuthProvider";

export default function WelcomeLayout() {
  const { user } = useAuth();

  // Redirect user to login page if not logged in.
  if (user) {
    return <Navigate to={routes.dashboard} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
