import React, { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Button, Form, Container } from "react-bootstrap";
import endpoints from "../../constants/endpoints";

export default function Settings() {
  const {
    session: {
      _id,
      username,
      email,
      onboarded,
      profile: { firstName, lastName, zipCode, diet_res, allergies },
    },
    refreshSession,
  } = useAuth();

  const [formData, setFormData] = useState({
    firstName,
    lastName,
    zipCode,
    diet_res,
    allergies,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(endpoints.profile.onboard, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error updating profile:", errorText);
        alert("Failed to update profile. Please try again.");
        return;
      }

      await refreshSession();
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <Container>
      <h1>Settings</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formZipCode">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formDietRes">
          <Form.Label>Dietary Restrictions</Form.Label>
          <Form.Control
            type="text"
            name="diet_res"
            value={formData.diet_res}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formAllergies">
          <Form.Label>Allergies</Form.Label>
          <Form.Control
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
}
