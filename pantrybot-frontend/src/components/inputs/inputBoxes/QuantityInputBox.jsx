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

  const handleChange = (e) => {
    const validInput = /^[0-9]*(\.?)[0-9]*$/.test(e.target.value);

    if (validInput) {
      setInputValue(e.target.value);
    }
  };

  const handleDecrement = () => {
    setInputValue(inputValue > 1 ? inputValue - 1 : inputValue);
  };

  const handleIncrement = () => {
    setInputValue(inputValue + 1);
  };

  const handleBlur = () => {
    if (!inputValue) {
      setInputValue(1);

      return;
    }

    setInputValue(value);
  };

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
          <Button variant="none" className="p-0" onClick={handleDecrement}>
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
            onChange={handleChange}
            disabled={disabled}
            onBlur={handleBlur}
            isInvalid={error ? true : false}
            {...otherProps}
          />
          <Form.Control.Feedback type="invalid">
            {error?.message}
          </Form.Control.Feedback>
        </div>
        {!hideIncrementDecrement && !disabled && (
          <Button variant="none" className="p-0" onClick={handleIncrement}>
            +
          </Button>
        )}
      </div>
    </>
  );
}
