import React from "react";
import { Button, Container } from "react-bootstrap";
import { useAuth } from "../../providers/AuthProvider";

export default function Dashboard() {
  const {
    session: { _id, username, email, onboarded },
    logout,
  } = useAuth();

  return (
    <Container style={{ height: "100rem" }}>
      <h1>Dashboard</h1>
      <p>Id: {_id}</p>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Onboarded: {onboarded ? "true" : "false"}</p>
      <p>Put dashboard here.</p>
      <Button variant="primary" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
}
