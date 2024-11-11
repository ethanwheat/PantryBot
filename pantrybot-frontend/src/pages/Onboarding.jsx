import { Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import endpoints from "../constants/endpoints";
import { useAuth } from "../providers/AuthProvider";

export default function Onboarding() {
  const { refreshSession } = useAuth();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [diets, setDiets] = useState("");
  const [allergies, setAllergies] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const dietsArray = diets.split(",").map((item) => item.trim());
    const allergiesArray = allergies.split(",").map((item) => item.trim());

    console.log("Sending data:", {
        firstname,
        lastname,
        zipcode,
        diets: dietsArray,
        allergies: allergiesArray,
    }); // Log the data being sent

    const res = await fetch(`http://localhost:5001/api/profile/onboard`, {
      method: "POST",
      credentials: "include",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          firstname,
          lastname,
          zipcode,
          diets: dietsArray,
          allergies: allergiesArray,
      }),
  });
  

  if (res.ok) {
    await refreshSession();
    navigate('/dashboard'); // Redirect to the dashboard page
  } else {
    console.error("Failed to complete onboarding");
  }
};


  return (
    <Container>
      <h1>Onboarding</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="zipcode">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="diets">
          <Form.Label>Diets (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            value={diets}
            onChange={(e) => setDiets(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="allergies">
          <Form.Label>Allergies (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Complete Onboarding</Button>
      </Form>
    </Container>
  );
}
