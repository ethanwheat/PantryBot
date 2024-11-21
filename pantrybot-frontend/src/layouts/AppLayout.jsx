import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import routes from "../constants/routes";
import Sidebar from "../components/navigation/Sidebar";

export default function AppLayout() {
  const { session } = useAuth();

  // Redirect user to login page if not logged in.
  if (!session) {
    return <Navigate to={routes.index} />;
  }

  // Redirect user if not onboarded.
  if (!session.onboarded) {
    return <Navigate to={routes.onboarding} />;
  }

  return (
    <>
      <div
        className="d-none d-sm-block position-fixed bg-body-tertiary shadow"
        style={{
          height: "calc(100vh - 83px)",
          minWidth: "17.5rem",
          width: "15%",
        }}
      >
        <Sidebar />
      </div>
      <div className="d-flex w-100">
        <div
          className="d-none d-sm-block"
          style={{ minWidth: "17.5rem", width: "15%" }}
        />
        <div className="flex-grow-1 px-5 py-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
