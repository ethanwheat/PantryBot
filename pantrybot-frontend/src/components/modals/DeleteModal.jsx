import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ThemedSpinner from "../spinners/ThemedSpinner";

export default function DeleteModal({ modal }) {
  const {
    loading,
    error,
    show,
    data: { name },
    onSubmit: onDelete,
    hideModal,
    setLoading,
    setError,
  } = modal;

  const handleDelete = async () => {
    setError(false);
    setLoading(true);

    try {
      await onDelete();
      hideModal();
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
      <Modal show={show} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {name}?</Modal.Body>
        <Modal.Footer className="d-flex flex-column align-items-end">
          <div className="d-flex gap-2">
            <Button variant="gray" onClick={hideModal}>
              Cancel
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
