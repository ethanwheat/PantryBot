import React, { useContext } from "react";
import {
  Accordion,
  AccordionContext,
  Card,
  useAccordionButton,
} from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";

export default function ThemedAccordian({ open, title, right, children }) {
  return (
    <Accordion defaultActiveKey={open && 0}>
      <Card>
        <ThemedAccordian.Header eventKey={0} title={title} right={right}/>
        <Accordion.Collapse eventKey={0}>
          <Card.Body>{children}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

ThemedAccordian.Header = function ThemedAccordianHeader({
  eventKey,
  callback,
  title,
  right,
}) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Card.Header className={`d-flex justify-content-between align-items-center gap-3 ${isCurrentEventKey && 'bg-secondary'}`}>
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
          <div>{title}</div>
          {isCurrentEventKey ? <ChevronUp size={25}/> : <ChevronDown size={25}/>}
        </div>
      </button>
      {right}
    </Card.Header>
  );
};
