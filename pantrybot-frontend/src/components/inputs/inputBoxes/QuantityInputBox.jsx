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
  const valueToInt = parseInt(value);

  return (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <div className="d-flex align-items-center gap-2">
        {!hideIncrementDecrement && !disabled && (
          <Button
            variant="none"
            className="p-0"
            onClick={() =>
              onChange(valueToInt > 1 ? valueToInt - 1 : valueToInt)
            }
          >
            -
          </Button>
        )}
        <div className={className} style={{ width: "4rem", ...style }}>
          <Form.Control
            className="m-0 text-center w-100"
            value={valueToInt || ""}
            type="text"
            onChange={onChange}
            disabled={disabled}
            onBlur={() => !valueToInt && onChange(1)}
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
            onClick={() => onChange(valueToInt + 1)}
          >
            +
          </Button>
        )}
      </div>
    </>
  );
}
