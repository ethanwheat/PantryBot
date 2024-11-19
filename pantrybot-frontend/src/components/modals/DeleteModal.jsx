import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ThemedSpinner from "../spinners/ThemedSpinner";

export default function DeleteModal({ show, onHide, onDeleteConfirm, itemName }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleDelete = async () => {
    setError(false);
    setLoading(true);

    try {
      await onDeleteConfirm();
      onHide();
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      setError(false);
      setLoading(false);
    }
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {itemName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {itemName}?</Modal.Body>
        <Modal.Footer className="d-flex flex-column align-items-end">
          <div className="d-flex gap-2">
            <Button variant="gray" onClick={onHide}>
              Close
            </Button>
            <Button variant="danger" disabled={loading} onClick={handleDelete}>
              {!loading ? "Delete" : <ThemedSpinner size="sm" />}
            </Button>
          </div>
          {error && <p className="text-danger">Something went wrong!</p>}
        </Modal.Footer>
      </Modal>
    </>
  );
}
