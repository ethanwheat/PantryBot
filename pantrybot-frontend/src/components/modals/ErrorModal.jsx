import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ErrorModal({ showModal, onHideModal, error }) {
  return (
    <>
      <Modal show={showModal} onHide={onHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>An Error Occured</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="gray" onClick={onHideModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
