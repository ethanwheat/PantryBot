import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Dropdown, Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import useGroceryItems from "../../../hooks/UseGroceryItems";
import ThemedSpinner from "../../spinners/ThemedSpinner";

export default function GroceryItemInputBox({
  label,
  error,
  value,
  onChange,
  ...otherProps
}) {
  const { groceryItems, error: lookupError, searchGroceryItems } = useGroceryItems();
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState(value);
  const timeoutRef = useRef(null);

  const hasQuery = searchQuery !== "";
  const hasGroceries = groceryItems.length !== 0;
  const showPopup = hasQuery && isFocused;

  const handleChange = (e) => {
    const search = e.target.value;

    setLoading(true);
    setSearchQuery(search);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (search !== "") {
        searchGroceryItems({ item: search });
      }
    }, 500);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setSearchQuery(value);
  };

  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  useEffect(() => {
    setLoading(false);
  }, [groceryItems]);

  return (
    <div className="d-flex flex-column gap-1">
      <Form.Group id="formItem">
        {label && <Form.Label>{label}</Form.Label>}
        <div className="position-relative">
          <Form.Control
            type="text"
            placeholder="Search grocery item"
            maxLength={256}
            value={searchQuery}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            isInvalid={error ? true : false}
            {...otherProps}
          />
          {!error && (
            <Search
              className="position-absolute top-50 translate-middle"
              style={{ right: ".25rem" }}
            />
          )}
          <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
        </div>
      </Form.Group>
      <div className="position-relative">
        {showPopup && (
          <Card className="position-absolute w-100 d-flex justify-content-center align-items-center flex-column py-1">
            {loading ? (
              <ThemedSpinner className="text-primary m-3" />
            ) : lookupError ? (
              <p className="m-3">Something went wrong!</p>
            ) : hasGroceries ? (
              groceryItems.map((item, index) => (
                <Button
                  key={index}
                  variant="inactive"
                  className="w-100 text-start rounded-0"
                  onMouseDown={() => onChange(item)}
                >
                  {item}
                </Button>
              ))
            ) : (
              <p className="m-3">No grocery items found.</p>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
