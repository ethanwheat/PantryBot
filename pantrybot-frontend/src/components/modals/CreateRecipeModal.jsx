import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Plus, X } from "react-bootstrap-icons";
import { Controller, useForm } from "react-hook-form";
import ThemedSpinner from "../spinners/ThemedSpinner";
import GroceryItemInputBox from "../inputs/inputBoxes/GroceryItemInputBox";
import QuantityInputBox from "../inputs/inputBoxes/QuantityInputBox";
import UnitSelect from "../inputs/selects/UnitSelect";
import useRecipes from "../../hooks/UseRecipes";

export default function CreateRecipeModal({ modal, loadRecipes }) {
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
      unit: "unit(s)",
    },
  });

    const {
    loading,
    error,
    show,
    data,
    onSubmit,
    hideModal,
  } = modal;

  const { createRecipe } = useRecipes();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [addedIngredients, setAddedIngredients] = useState([]);

  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [estimatedTimeError, setEstimatedTimeError] = useState(false);
  const [ingredientsError, setIngredientsError] = useState(false);
  const [createError, setCreateError] = useState(false);

  const [createLoading, setCreateLoading] = useState(false);

  const resetFields = () => {
    setName("");
    setDescription("");
    setEstimatedTime("");
    setAddedIngredients([]);
  }

  const resetErrors = () => {
    setNameError(false);
    setDescriptionError(false);
    setEstimatedTimeError(false);
    setIngredientsError(false);
    setCreateError(false);
  }

  const validateFields = () => {
    resetErrors();
    const nameHasError = name.trim() === "";
    const descriptionHasError = description.trim() === "";
    const estimatedTimeHasError = estimatedTime.trim() === "";
    const ingredientsHaveError = addedIngredients.length === 0;

    setNameError(nameHasError);
    setDescriptionError(descriptionHasError);
    setEstimatedTimeError(estimatedTimeHasError);
    setIngredientsError(ingredientsHaveError);

    return !(nameHasError || descriptionHasError || estimatedTimeHasError || ingredientsHaveError);
  };

  const handleAddItem = ({ name, quantity, unit }) => {
    setAddedIngredients((prev) => [
      ...prev,
      { name, quantity, unit },
    ]);
  };

  const handleRemoveItem = (index) => {
    setAddedIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateRecipe = async () => {
    if (validateFields()) {

      try {
        setCreateLoading(true);
        await createRecipe(name, description, estimatedTime, addedIngredients)
        loadRecipes();
        hideModal();
      } catch (e) {
        console.log(e)
        setCreateError(true);
      } finally {
        setCreateLoading(false);
      }
    }
  }

  useEffect(() => {
    if (show) {
      reset();
      resetFields();
      resetErrors();
    }
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={hideModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title><h2>Create New Recipe</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Recipe Name:</h5>         
          <Form.Control 
            autoComplete="off" 
            placeholder="Enter a Recipe Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && (<Form.Text className="text-danger">Please Enter a Name</Form.Text>)}
          <hr style={{ margin: "10px 0" }} />

          <h5>Recipe Description/Instructions:</h5>         
          <Form.Control
            as="textarea"
            style={{ resize: "none" }}
            rows={3}
            placeholder="Enter a Recipe Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {descriptionError && (<Form.Text className="text-danger">Please Enter a Description</Form.Text>)}
          <hr style={{ margin: "10px 0" }} />

          <div className="d-flex align-items-center">
            <span className="me-3" style={{ whiteSpace: "nowrap" }}>
            <h5>Estimated Time:</h5>         
            </span>
            <Form.Control 
              type="number"
              autoComplete="off" 
              placeholder="(in minutes)" 
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              min="1"
            />
          </div>
          {estimatedTimeError && (<Form.Text className="text-danger">Please Enter an Estimated Time </Form.Text>)}
          <hr style={{ margin: "10px 0" }} />

          <h5>Ingredients:</h5>
          {ingredientsError && (<Form.Text className="text-danger">Please Add Some Ingredients </Form.Text>)}
          <Form
            noValidate
            className="d-flex flex-column gap-2 px-1"
            onSubmit={handleSubmit(handleAddItem)}
          >
            <div className="d-flex justify-content-start gap-3">
              <Form.Group id="formName">
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: "An ingredient name is required.",
                  }}
                  render={({ field }) => (
                    <GroceryItemInputBox
                    style={{ width: "20rem" }}
                      label="Ingredient Name"
                      error={errors.name}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={createLoading}
                    />
                  )}
                />
              </Form.Group>
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
                      disabled={createLoading}
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
                      disabled={createLoading}
                    />
                  )}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Add</Form.Label>
                <Button
                  variant="primary"
                  disabled={createLoading}
                  onClick={handleSubmit(handleAddItem)}
                >
                <Plus size={24} />
                </Button>
              </Form.Group>
            </div>
          </Form>
          <hr style={{ margin: "10px 0" }} />
          <div>
            {addedIngredients.length > 0 ? (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Ingredient</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Quantity</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Unit</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {addedIngredients.map((item, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid black", padding: "8px", width: "70%"  }}>{item.name}</td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>{item.quantity}</td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>{item.unit}</td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        <Button 
                          onClick={() => handleRemoveItem(index)}
                          size="sm"
                          variant="danger"
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div
                style={{
                  border: "1px solid black",
                  padding: "16px",
                  textAlign: "center",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                }}
              >
                No ingredients added yet.
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column align-items-end">
          <div className="d-flex gap-2">
            {createError && <p className="text-danger">Something went wrong!</p>}
            <Button variant="gray" onClick={hideModal}>
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={createLoading}
              onClick={handleCreateRecipe}
            >
              {!createLoading ? "Create Recipe" : <ThemedSpinner size="sm" />}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
