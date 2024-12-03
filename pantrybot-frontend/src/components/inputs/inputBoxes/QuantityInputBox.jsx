import React, { useEffect, useState } from "react";
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
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const validFloat = /^\d*\.?\d+$/.test(inputValue);

    if (validFloat) {
      onChange(parseFloat(inputValue));
    }
  }, [inputValue]);

  return (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <div className="d-flex align-items-center gap-2">
        {!hideIncrementDecrement && !disabled && (
          <Button
            variant="none"
            className="p-0"
            onClick={() =>
              setInputValue(inputValue > 1 ? inputValue - 1 : inputValue)
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
            value={inputValue || ""}
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            disabled={disabled}
            onBlur={() =>
              inputValue ? setInputValue(value) : setInputValue(1)
            }
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
            onClick={() => setInputValue(inputValue + 1)}
          >
            +
          </Button>
        )}
      </div>
    </>
  );
}
