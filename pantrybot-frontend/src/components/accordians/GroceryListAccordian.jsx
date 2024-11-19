import React, { useContext } from "react";
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
  TrashFill,
} from "react-bootstrap-icons";

export default function GroceryListAccordian({ open, children }) {
  return (
    <>
      <Accordion defaultActiveKey={open && 0}>
        <Card>{children}</Card>
      </Accordion>
    </>
  );
}

GroceryListAccordian.Header = function GroceryListAccordianHeader({
  eventKey,
  callback,
  onDeleteClick,
  list,
}) {
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
        <Button
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
        </Button>
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
              onClick={onDeleteClick}
            >
              <TrashFill />
              <p className="m-0">Delete</p>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
    </>
  );
};

GroceryListAccordian.Collapse = function GroceryListAccordianCollapse({
  children,
  ...otherProps
}) {
  return (
    <Accordion.Collapse {...otherProps}>
      <div>{children}</div>
    </Accordion.Collapse>
  );
};

GroceryListAccordian.Body = function GroceryListAccordianBody({ children }) {
  return <Card.Body>{children}</Card.Body>;
};

GroceryListAccordian.Footer = function GroceryListAccordianFooter({ children }) {
  return <Card.Footer>{children}</Card.Footer>;
};
