import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../../providers/AuthProvider";
import routes from "../../constants/routes"; // Import routes

export default function Dashboard() {
  const {
    session: { _id, username, email, onboarded, profile },
  } = useAuth();

  return (
    <Container fluid>
      <h1>Dashboard</h1>
      <p>Id: {_id}</p>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Onboarded: {onboarded ? "true" : "false"}</p>
      <p>{profile.firstName}</p>
      <p>Put dashboard here.</p>
    </Container>
  );
}
