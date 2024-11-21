import React from "react";
import { Spinner } from "react-bootstrap";

export default function ThemedSpinner(otherProps) {
  return (
    <Spinner animation="border" role="status" {...otherProps}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
