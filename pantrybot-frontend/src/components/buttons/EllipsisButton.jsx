import React from "react";
import { Button } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";

export default function EllipsisButton({ size, ...otherProps }) {
  return (
    <Button variant="link" className="text-black p-0" {...otherProps}>
      <ThreeDotsVertical size={size} />
    </Button>
  );
}
