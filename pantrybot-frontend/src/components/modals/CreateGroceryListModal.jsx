import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function CreateGroceryListModal({ showModal, onHideModal, onSubmit }) {
  const handleSubmit = () => {
    onHideModal();
    onSubmit();
  };

  return (
    <>
      <Modal show={showModal} onHide={onHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Grocery List</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="gray" onClick={onHideModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
