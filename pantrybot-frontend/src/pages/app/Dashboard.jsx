import React from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../../providers/AuthProvider";

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
