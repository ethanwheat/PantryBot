import { useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Controller, useForm } from "react-hook-form";
import ThemedSpinner from "../spinners/ThemedSpinner";
import GroceryItemInputBox from "../inputs/inputBoxes/GroceryItemInputBox";
import QuantityInputBox from "../inputs/inputBoxes/QuantityInputBox";
import UnitSelect from "../inputs/selects/UnitSelect";

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
      quantity: "1",
      unit: "units",
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

  const handleAddItem = ({ name, quantity, unit }) => {
    onSubmit({ listId, name, quantity, unit });
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
          <Modal.Title className="text-truncate">Add Item to {listName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            className="d-flex flex-column gap-2 px-1"
            onSubmit={handleSubmit(handleAddItem)}
          >
            <Form.Group id="formItem">
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "A grocery item is required.",
                }}
                render={({ field }) => (
                  <GroceryItemInputBox
                    label="Grocery Item"
                    error={errors.name}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={loading}
                  />
                )}
              />
            </Form.Group>
            <div className="d-flex justify-content-center gap-3">
              <Form.Group id="formQuantity">
                <Controller
                  name="quantity"
                  control={control}
                  render={({ field }) => (
                    <QuantityInputBox
                      style={{ width: "10rem" }}
                      label="Quantity"
                      error={errors.quantity}
                      value={field.value}
                      onChange={field.onChange}
                      hideIncrementDecrement
                      disabled={loading}
                    />
                  )}
                />
              </Form.Group>
              <Form.Group id="formUnit">
                <Controller
                  name="unit"
                  control={control}
                  render={({ field }) => (
                    <UnitSelect
                      style={{ width: "10rem" }}
                      label="Unit"
                      error={errors.unit}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={loading}
                    />
                  )}
                />
              </Form.Group>
            </div>
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
