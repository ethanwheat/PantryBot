import React from "react";
import { Button, Container } from "react-bootstrap";
import { useAuth } from "../../providers/AuthProvider";

export default function Dashboard() {
  const { user, logout } = useAuth();

  const deleteCookie = async () => {
    const res = await fetch("http://localhost:5001/api/auth/test", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <Container>
      <h1>Dashboard</h1>
      <p>User jwt: {user}</p>
      <p>Put dashboard here.</p>
      <Button variant="primary" onClick={logout}>
        Logout
      </Button>
      <Button variant="primary" onClick={deleteCookie}>
        Test Delete Cookie Sever Side
      </Button>
    </Container>
  );
}
