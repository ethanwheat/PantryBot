import { useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Controller, useForm } from "react-hook-form";
import ThemedSpinner from "../spinners/ThemedSpinner";
import GroceryItemInputBox from "../inputs/inputBoxes/GroceryItemInputBox";

export default function addGroceryItemModal({ modal }) {
  // Import useForm hook and set default values to empty strings
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      quantity: "",
      unit: "",
    },
  });

  const {
    loading,
    error,
    show,
    data: { listId, listName },
    onSubmit,
    hideModal,
  } = modal;

  const handleAddItem = ({ name }) => {
    onSubmit({ listId, name });
  };

  useEffect(() => {
    if (show) {
      reset();
    }
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item to {listName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate className="d-flex flex-column gap-2 px-1">
            <Controller
              name="name"
              control={control}
              rules={{
                required: "A grocery list name is required.",
              }}
              render={({ field }) => (
                <GroceryItemInputBox
                  label="Grocery Item"
                  error={errors.name}
                  disabled={loading}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column align-items-end">
          <div className="d-flex gap-2">
            <Button variant="gray" onClick={hideModal}>
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={loading}
              onClick={handleSubmit(handleAddItem)}
            >
              {!loading ? "Add" : <ThemedSpinner size="sm" />}
            </Button>
          </div>
          {error && <p className="text-danger">Something went wrong!</p>}
        </Modal.Footer>
      </Modal>
    </>
  );
}
