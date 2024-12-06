import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Controller, useForm } from "react-hook-form";
import ThemedSpinner from "../spinners/ThemedSpinner";
import useRecipes from "../../hooks/UseRecipes";

export default function AddRecipeToListModal({ modal }) {
  // Import useForm hook and set default values to empty strings
  const { groceryLists, searchResults, loadGroceryLists, addRecipeToList } =
    useRecipes();

  const [listsLoading, setListsLoading] = useState(false);
  const [listError, setListError] = useState(null);
  const [selectedList, setSelectedList] = useState("");
  const [addError, setAddError] = useState(null);
  const [addLoading, setAddLoading] = useState(false);
  const [excludePantry, setExcludePantry] = useState(false);
  const [excludeList, setExcludeList] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const {
    loading,
    data: ingredients,
    error,
    show,
    onSubmit,
    hideModal,
  } = modal;

  useEffect(() => {
    const fetchLists = async () => {
      if (show) {
        setListError(null);
        setAddError(null);
        setListsLoading(true);
        setAddLoading(false);
        setExcludePantry(false);
        setExcludeList(false);

        try {
          await loadGroceryLists();
        } catch (e) {
          console.log(e);
          setListError(e);
        } finally {
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

  const handleAddToList = async () => {
    try {
      setAddLoading(true);
      await addRecipeToList(
        selectedList,
        ingredients,
        excludePantry,
        excludeList
      );
      onSubmit();
      hideModal();
    } catch (e) {
      console.log(e);
      setAddError(e);
    } finally {
      setAddLoading(false);
    }
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
                <Form.Label>Select a Grocery List:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedList}
                  onChange={(e) => setSelectedList(e.target.value)}
                >
                  <option key="" value="" disabled>
                    -- Select a List --
                  </option>
                  {groceryLists.map((list) => (
                    <option key={list._id} value={list._id}>
                      {list.name}
                    </option>
                  ))}
                </Form.Control>
                <hr style={{ margin: "10px 0" }} />
                <p>Options...</p>
                <Form.Check
                  name="group1"
                  id="any-switch"
                  label="Exclude Items Already in Pantry"
                  checked={excludePantry}
                  onChange={() => setExcludePantry(!excludePantry)}
                />
                <Form.Check
                  name="group1"
                  id="list-switch"
                  label="Exclude Items Already in List"
                  checked={excludeList}
                  onChange={() => setExcludeList(!excludeList)}
                />
              </Form.Group>
            </Form>
          ) : (
            <p>
              No Grocery Lists Found. Create one in the "Grocery Lists" page.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column align-items-end">
          <div className="d-flex gap-2">
            <Button variant="gray" onClick={hideModal}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddToList}
              disabled={listsLoading || addLoading || !selectedList}
            >
              {!listsLoading && !addLoading ? (
                "Add Items"
              ) : (
                <ThemedSpinner size="sm" />
              )}
            </Button>
          </div>
          {addError && (
            <p className="text-danger">Failed to add recipe to list</p>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
