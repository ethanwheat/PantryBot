import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function QuantityInputBox({ quantity, onQuantityChange }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center gap-2"
      style={{ height: "2.5rem" }}
    >
      <Button
        variant="none"
        className="p-0"
        onClick={() => onQuantityChange(quantity > 1 ? quantity - 1 : quantity)}
      >
        -
      </Button>
      <Form.Control
        value={quantity || ""}
        type="text"
        onChange={(e) => onQuantityChange(parseFloat(e.target.value))}
        onBlur={() => !quantity && onQuantityChange(1)}
        className="m-0 text-center"
        style={{ width: "4rem" }}
      />
      <Button
        variant="none"
        className="p-0"
        onClick={() => onQuantityChange(quantity + 1)}
      >
        +
      </Button>
    </div>
  );
}
