import React, { useContext, useState } from "react";
import {
  Accordion,
  AccordionContext,
  Button,
  Card,
  Dropdown,
  useAccordionButton,
} from "react-bootstrap";
import {
  ChevronDown,
  ChevronUp,
  ThreeDotsVertical,
  Trash,
  TrashFill,
} from "react-bootstrap-icons";
import EllipsisButton from "../buttons/EllipsisButton";
import DeleteModal from "../modals/DeleteModal";

export default function GroceryListAccordian({ open, list, onDelete, children }) {
  return (
    <Accordion defaultActiveKey={open && 0}>
      <Card>
        <GroceryListAccordian.Header eventKey={0} list={list} onDelete={onDelete} />
        <Accordion.Collapse eventKey={0}>
          <Card.Body>{children}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

GroceryListAccordian.Header = function GroceryListAccordianHeader({
  eventKey,
  callback,
  onDelete,
  list,
}) {
  const [showModal, setShowModal] = useState(false);

  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <>
      <Card.Header
        className={`d-flex justify-content-between align-items-center gap-3 ${
          isCurrentEventKey && "bg-secondary"
        }`}
      >
        <button
          type="button"
          className="h-100 w-100"
          style={{
            background: "none",
            color: "inherit",
            border: "none",
            padding: 0,
            font: "inherit",
            cursor: "pointer",
            outline: "inherit",
          }}
          onClick={decoratedOnClick}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-start">
              <h4 className="m-0">{list.name}</h4>
              <p className="m-0">{new Date(list.dateCreated).toLocaleDateString()}</p>
            </div>
            {isCurrentEventKey ? <ChevronUp size={25} /> : <ChevronDown size={25} />}
          </div>
        </button>
        <Dropdown>
          <Dropdown.Toggle
            variant="link"
            className="text-black p-0 dropdown-toggle-hide"
            id="dropdown"
          >
            <ThreeDotsVertical size={22.5} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              eventKey="1"
              className="d-flex align-items-center gap-2 text-danger"
              onClick={() => setShowModal(true)}
            >
              <TrashFill />
              <p className="m-0">Delete</p>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
      <DeleteModal
        showModal={showModal}
        onHideModal={() => setShowModal(false)}
        onDelete={onDelete}
        title={list.name}
        text={`Are you sure you want to delete ${list.name}?`}
      />
    </>
  );
};
