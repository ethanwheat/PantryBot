import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import routes from "../constants/routes";
import Cookies from "js-cookie"
import ThemedNavbar from "../components/navigation/ThemedNavbar";

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
