import React from "react";
import { Button, Form } from "react-bootstrap";

export default function QuantityInputBox({
  label,
  error,
  value,
  onChange,
  disabled = false,
  hideIncrementDecrement = false,
  className,
  style,
  ...otherProps
}) {
  const valueToFloat = parseFloat(value);

  return (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <div className="d-flex align-items-center gap-2">
        {!hideIncrementDecrement && !disabled && (
          <Button
            variant="none"
            className="p-0"
            onClick={() =>
              onChange(valueToFloat > 1 ? valueToFloat - 1 : valueToFloat)
            }
          >
            -
          </Button>
        )}
        <div className={className} style={{ width: "4rem", ...style }}>
          <Form.Control
            className={`m-0 w-100 ${
              className?.includes("text-left") ? "text-left" : "text-center"
            }`}
            value={valueToFloat || ""}
            type="text"
            onChange={(e) => onChange(parseFloat(e.target.value))}
            disabled={disabled}
            onBlur={() => !valueToFloat && onChange(1)}
            isInvalid={error ? true : false}
            {...otherProps}
          />
          <Form.Control.Feedback type="invalid">
            {error?.message}
          </Form.Control.Feedback>
        </div>
        {!hideIncrementDecrement && !disabled && (
          <Button
            variant="none"
            className="p-0"
            onClick={() => onChange(valueToFloat + 1)}
          >
            +
          </Button>
        )}
      </div>
    </>
  );
}
