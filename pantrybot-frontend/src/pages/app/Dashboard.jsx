import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../../providers/AuthProvider";
import routes from "../../constants/routes"; // Import routes

export default function Dashboard() {
  const {
    session: { _id, username, email, onboarded },
    logout,
  } = useAuth();

  const navigate = useNavigate(); // Initialize navigate

  const goToPantry = () => {
    navigate(routes.app.pantry); // Navigate to the Pantry page
  };

  return (
    <Container fluid>
      <h1>Dashboard</h1>
      <p>Id: {_id}</p>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Onboarded: {onboarded ? "true" : "false"}</p>
      <p>Put dashboard here.</p>
    </Container>
  );
}
