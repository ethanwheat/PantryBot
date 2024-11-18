import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DeleteModal({ showModal, onHideModal, onDelete, title, text }) {
  const handleOnDelete = () => {
    onHideModal();
    onDelete();
  };

  return (
    <>
      <Modal show={showModal} onHide={onHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="gray" onClick={onHideModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleOnDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
