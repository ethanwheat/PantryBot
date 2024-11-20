import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DeleteModal({ modal }) {
  const {
    show,
    data: { message },
    hideModal,
  } = modal;

  return (
    <>
      <Modal show={show} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Something went wrong!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer className="d-flex flex-column align-items-end">
          <div className="d-flex gap-2">
            <Button variant="gray" onClick={hideModal}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
