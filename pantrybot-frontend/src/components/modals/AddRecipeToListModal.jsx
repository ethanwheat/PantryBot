import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Controller, useForm } from "react-hook-form";
import ThemedSpinner from "../spinners/ThemedSpinner";
import useRecipes from "../../hooks/UseRecipes";

export default function AddRecipeToListModal({ modal }) {
  // Import useForm hook and set default values to empty strings
  const { groceryLists, loadGroceryLists } = useRecipes();

  const [listsLoading, setListsLoading] = useState(false);
  const [listError, setListError] = useState(null);
  const [selectedList, setSelectedList] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectedList: "",
    },
  });
  
  const { loading, error, show, onSubmit, hideModal } = modal;

  useEffect(() => {
    const fetchLists = async () => {
      if (show) {
        setListError(false);
        setListsLoading(true);

        try {
          await loadGroceryLists();
          setListsLoading(false);
        } catch (e) {
          console.log(e);
          setListError(e);
          setListsLoading(false);
        }
      }
    };

    fetchLists();
  }, [show]);

  // Reset the selected list when modal closes
  useEffect(() => {
    if (!show) {
      setSelectedList("");
    }
  }, [show]);

  const handleAddToList = (data) => {
    console.log("Selected Grocery List:", data);
  };

  return (
    <>
      <Modal show={show} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Recipe To Grocery List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {listsLoading ? (
            <ThemedSpinner variant="primary" />
          ) : listError ? (
            <>
              <p className="text-danger">Failed to load grocery lists.</p>
            </>
          ) : groceryLists.length > 0 ? (
            <Form>
              <Form.Group>
                <Form.Label>Select a Grocery List</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedList}
                  onChange={(e) => setSelectedList(e.target.value)}
                >
                  <option key="" value="" disabled>
                    -- Select a List --
                  </option>
                  {groceryLists.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          ) : (
            <p>No Grocery Lists Found. Create one in the "Grocery Lists" page.</p>
          )} 
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column align-items-end">
          <div className="d-flex gap-2">
            <Button variant="gray" onClick={hideModal}>
              Cancel
            </Button>
            <Button variant="primary" disabled={loading}>
              {!loading ? "Add Items" : <ThemedSpinner size="sm" />}
            </Button>
          </div>
          {error && <p className="text-danger">Something went wrong!</p>}
        </Modal.Footer>
      </Modal>
    </>
  );
}
