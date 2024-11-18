import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Controller, useForm } from "react-hook-form";
import ThemedSpinner from "../spinners/ThemedSpinner";

export default function CreateGroceryListModal({
  showModal,
  onHideModal,
  onCreate,
}) {
  // Import useForm hook and set default values to empty strings
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ name }) => {
    setLoading(true);

    try {
      await onCreate({name});
      reset();
    } catch (e) {
      setError("name", "Something went wrong")
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (showModal) {
  //     reset();
  //     setLoading(false);
  //   }
  // }, [showModal])

  return (
    <>
      <Modal show={showModal} onHide={onHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Grocery List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate className="d-flex flex-column gap-2 px-1">
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
        <Modal.Footer>
          <Button variant="gray" onClick={onHideModal}>
            Cancel
          </Button>
          <Button
            type="primary"
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
          >
            {!loading ? "Create" : <ThemedSpinner size="sm" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
