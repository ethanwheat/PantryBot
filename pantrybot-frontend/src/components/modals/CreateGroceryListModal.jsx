import { useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Controller, useForm } from "react-hook-form";
import ThemedSpinner from "../spinners/ThemedSpinner";

export default function CreateGroceryListModal({ modal }) {
  // Import useForm hook and set default values to empty strings
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const { loading, error, show, onSubmit, hideModal } = modal;

  useEffect(() => {
    if (show) {
      reset();
    }
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Grocery List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            className="d-flex flex-column gap-2 px-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group id="formName">
              <Form.Label>Grocery List Name</Form.Label>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "A grocery list name is required.",
                }}
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    placeholder="Grocery list name here"
                    maxLength={256}
                    disabled={loading}
                    isInvalid={errors.name ? true : false}
                    {...field}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column align-items-end">
          <div className="d-flex gap-2">
            <Button variant="gray" onClick={hideModal}>
              Cancel
            </Button>
            <Button variant="primary" disabled={loading} onClick={handleSubmit(onSubmit)}>
              {!loading ? "Create" : <ThemedSpinner size="sm" />}
            </Button>
          </div>
          {error && <p className="text-danger">Something went wrong!</p>}
        </Modal.Footer>
      </Modal>
    </>
  );
}
