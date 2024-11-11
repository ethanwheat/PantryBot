import { Button, Card, Container, Form } from "react-bootstrap";
import { useState } from "react";
import endpoints from "../constants/endpoints";
import { useAuth } from "../providers/AuthProvider";
import { Controller, useForm } from "react-hook-form";
import ThemedSpinner from "../components/spinners/ThemedSpinner";

export default function Onboarding() {
  const { refreshSession } = useAuth();

  const [loading, setLoading] = useState(false);

  // Import useForm hook and set default values to empty strings
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      zipCode: "",
      diets: "",
      allergies: "",
    },
  });

  const onSubmit = async ({ firstName, lastName, zipCode, diets, allergies }) => {
    setLoading(true);

    const dietsArray = diets.split(",").map((item) => item.trim());
    const allergiesArray = allergies.split(",").map((item) => item.trim());

    await fetch(endpoints.profile.onboard, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        zipCode,
        diets: dietsArray,
        allergies: allergiesArray,
      }),
    });

    await refreshSession();

    setLoading(false);
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ padding: "5rem" }}
    >
      <Card className="bg-secondary rounded-5" style={{ width: "22.5rem" }}>
        <Card.Body>
          <Card.Title className="text-center">Onboarding</Card.Title>
          <Card.Body>
            <Form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="d-flex flex-column gap-2"
            >
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{
                    required: "A first name is required.",
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="text"
                      placeholder="First name here"
                      maxLength={256}
                      disabled={loading}
                      isInvalid={errors.firstName ? true : false}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.firstName?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Controller
                  name="lastName"
                  control={control}
                  rules={{
                    required: "A last name is required.",
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="text"
                      placeholder="Last name here"
                      maxLength={256}
                      disabled={loading}
                      isInvalid={errors.lastName ? true : false}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.lastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group id="zipCode">
                <Form.Label>Zip Code</Form.Label>
                <Controller
                  name="zipCode"
                  control={control}
                  rules={{
                    required: "A zip code is required.",
                    pattern: {
                      value: /^\d{5}(?:[-\s]\d{4})?$/,
                      message: "Invalid zip code.",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="number"
                      placeholder="Zip Code here"
                      maxLength={5}
                      disabled={loading}
                      isInvalid={errors.zipCode ? true : false}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.zipCode?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group id="diets">
                <Form.Label>Diets (comma-separated)</Form.Label>
                <Controller
                  name="diets"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      as="textarea"
                      type="text"
                      placeholder="Diets (comma-separated) here"
                      disabled={loading}
                      isInvalid={errors.diets ? true : false}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.diets?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group id="allergies">
                <Form.Label>Allergies (comma-separated)</Form.Label>
                <Controller
                  name="allergies"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      as="textarea"
                      type="text"
                      placeholder="Allergies (comma-separated) here"
                      disabled={loading}
                      isInvalid={errors.allergies ? true : false}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.allergies?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="mt-3 d-flex flex-column align-items-center">
                <Button type="submit" disabled={loading}>
                  {!loading ? "Complete Onboarding" : <ThemedSpinner size="sm" />}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card.Body>
      </Card>
    </Container>
  );
}
