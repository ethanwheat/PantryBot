import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Controller, useForm } from "react-hook-form";
import ThemedSpinner from "../spinners/ThemedSpinner";
import useModal from "../../hooks/UseModal";
import AddRecipeToListModal from "../../components/modals/AddRecipeToListModal";

export default function ViewRecipeModal({
  modal,
  recipeDetails,
  getRecipeById,
  deleteRecipe,
  addItemsToList,
}) {
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

  const groceryModal = useModal();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const { show, data, onSubmit, hideModal } = modal;

  useEffect(() => {
    const fetchRecipe = async () => {
      if (show) {
        setError(false);
        setDeleteError(false);
        setLoading(true);

        try {
          await getRecipeById(data);
          setLoading(false);
        } catch (e) {
          console.log(e);
          setError(e);
          setLoading(false);
        }
      }
    };

    fetchRecipe();
  }, [show]);

  const handleDelete = async () => {
    try {
      await deleteRecipe(data);
      hideModal();
    } catch (e) {
      console.log(e);
      setDeleteError(e);
    }
  };

  const handleAdd = async () => {
    hideModal();
    groceryModal.showModal({
      data: recipeDetails.ingredients,
      onSubmit: addItemsToList,
    });
  };

  return (
    <>
      <Modal show={show} onHide={hideModal}>
        {loading ? (
          <ThemedSpinner variant="primary" />
        ) : error ? (
          <>
            <Modal.Header className="text-truncate" closeButton>
              <h3>Error</h3>
            </Modal.Header>
            <Modal.Body>
              <p className="text-danger">Failed to load recipe details</p>
            </Modal.Body>
          </>
        ) : recipeDetails ? (
          <>
            <Modal.Header className="text-truncate" closeButton>
              <h3>{recipeDetails.name}</h3>
            </Modal.Header>
            <Modal.Body>
              <div>
                <p>
                  <strong>Description/Instructions:</strong>
                </p>
                <p>{recipeDetails.description}</p>
                <p>
                  <strong>Estimated Time:</strong> {recipeDetails.estimatedTime}{" "}
                  minutes
                </p>
                <p>
                  <strong>Ingredients:</strong>
                </p>
                <ul>
                  {recipeDetails.ingredients?.length > 0 ? (
                    recipeDetails.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.quantity} {ingredient.unit} of{" "}
                        {ingredient.name}
                      </li>
                    ))
                  ) : (
                    <p>No ingredients listed.</p>
                  )}
                </ul>
              </div>
            </Modal.Body>
          </>
        ) : (
          <>
            <Modal.Body>
              <p>No recipe selected.</p>
            </Modal.Body>
          </>
        )}
        <Modal.Footer className="d-flex flex-column">
          <div className="d-flex gap-2">
            <Button variant="danger" onClick={handleDelete}>
              Delete Recipe
            </Button>
            <Button variant="primary" onClick={handleAdd}>
              Add Items To List
            </Button>
          </div>
          {deleteError && (
            <p className="text-danger">Failed to delete recipe</p>
          )}
        </Modal.Footer>
      </Modal>
      <AddRecipeToListModal modal={groceryModal} />
    </>
  );
}
