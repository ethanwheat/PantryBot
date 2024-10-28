import React from "react";
import { Button, Container } from "react-bootstrap";
import { useAuth } from "../../providers/AuthProvider";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <Container>
      <h1>Dashboard</h1>
      <p>User jwt: {user?.token}</p>
      <p>Put dashboard here.</p>
      <Button variant="primary" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
}
