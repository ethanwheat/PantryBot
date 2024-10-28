import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import routes from "../../constants/routes";
import { Link } from "react-router-dom";
import { useAuth } from '../../providers/AuthProvider';
import ThemedSpinner from "../../components/spinners/ThemedSpinner";

export default function Signup() {
  // Import useForm hook and set default values to empty strings
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  // Import auth functions
  const { signup } = useAuth();

  const [loading, setLoading] = useState(false);

  // Function to handle when the form is submitted without errors on the client side
  const onSubmit = async ({username, email, password}) => {
    setLoading(true);

    const { errorMessage } = await signup(username, email, password)

    if (errorMessage) {
      setError("username");
      setError("email");
      setError("password");
      setError("confirmPassword", {
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
          <Card.Title className="text-center">Sign Up</Card.Title>
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
              <Form.Group id="formEmail">
                <Form.Label>Email</Form.Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "A email is required.",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid email.",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="text"
                      placeholder="Email here"
                      maxLength={256}
                      disabled={loading}
                      isInvalid={errors.email ? true : false}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.email?.message}
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
              <Form.Group id="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: "Repeat your password.",
                    validate: {
                      value: (value, formValues) =>
                        value == formValues.password || "Passwords do not match.",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password here"
                      maxLength={256}
                      disabled={loading}
                      isInvalid={errors.confirmPassword ? true : false}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.confirmPassword?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="mt-3 d-flex flex-column align-items-center">
                <Button type="submit" disabled={loading}>{!loading ? "Sign up" : <ThemedSpinner size="sm"/>}</Button>
                <Button as={Link} to={routes.login} variant="link" className="text-black">
                  Login
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card.Body>
      </Card>
    </Container>
  );
}
