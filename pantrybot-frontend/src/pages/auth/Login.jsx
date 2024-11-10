import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import routes from "../../constants/routes";
import { Link } from "react-router-dom";
import { useAuth } from '../../providers/AuthProvider';
import ThemedSpinner from "../../components/spinners/ThemedSpinner";

export default function Login() {
  // Import useForm hook and set default values to empty strings
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  // Import auth functions
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  // Function to handle when the form is submitted without errors on the client side
  const onSubmit = async ({ username, password }) => {
    setLoading(true);

    const { errorMessage } = await login(username, password);

    if (errorMessage) {
      setError("username");
      setError("password", {
        type: "manual",
        message: errorMessage
      });
    }

    setLoading(false);
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ padding: "5rem" }}
    >
      <Card className="bg-secondary rounded-5" style={{ width: "22.5rem" }}>
        <Card.Body>
          <Card.Title className="text-center">Log In</Card.Title>
          <Card.Body>
            <Form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="d-flex flex-column gap-2"
            >
              <Form.Group id="formUsername">
                <Form.Label>Username</Form.Label>
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: "A username is required.",
                    minLength: {
                      value: 6,
                      message: "Username must be 6 characters or longer.",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="text"
                      placeholder="Username here"
                      maxLength={12}
                      disabled={loading}
                      isInvalid={errors.username ? true : false}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.username?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group id="formPassword">
                <Form.Label>Password</Form.Label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "A password is required.",
                    minLength: {
                      value: 6,
                      message: "Password must be 6 characters or longer.",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="password"
                      placeholder="Password here"
                      maxLength={256}
                      disabled={loading}
                      isInvalid={errors.password ? true : false}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.password?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="mt-3 d-flex flex-column align-items-center">
                <Button type="submit" disabled={loading}>{!loading ? "Log In" : <ThemedSpinner size="sm"/>}</Button>
                <Button as={Link} to={routes.signup} variant="link" className="text-black">
                  Sign Up
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card.Body>
      </Card>
    </Container>
  );
}
