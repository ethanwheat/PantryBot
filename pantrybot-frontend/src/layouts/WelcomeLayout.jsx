import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import routes from "../constants/routes";
import Cookies from "js-cookie"
import ThemedNavbar from "../components/navigation/ThemedNavbar";

export default function WelcomeLayout() {
  const authCookie = Cookies.get("auth");

  // Redirect user to dashboard if logged in.
  if (authCookie) {
    return <Navigate to={routes.dashboard} />;
  }

  return (
    <>
      <ThemedNavbar />
      <Outlet />
    </>
  );
}
