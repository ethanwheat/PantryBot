import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import useGroceryItems from "../../../hooks/UseGroceryItems";
import ThemedSpinner from "../../spinners/ThemedSpinner";

export default function GroceryItemInputBox({
  label,
  error,
  value,
  onChange,
  className,
  style,
  ...otherProps
}) {
  const {
    error: groceryItemsError,
    groceryItems,
    searchGroceryItems,
  } = useGroceryItems();

  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState(value);
  const timeoutRef = useRef(null);

  // Determine is popup can be shown.
  const showPopup = isFocused && searchQuery !== "" && value !== searchQuery;

  // Determine if there are groceries.
  const hasGroceries = groceryItems.length !== 0;

  // Set the search query.
  const handleChange = (e) => {
    setLoading(true);

    const search = e.target.value;

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

  const handleClick = ({ item }) => {
    onChange(item);
  };

  // Set focused to true.
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Set focused to false and reset search query to intial value.
  const handleBlur = () => {
    setIsFocused(false);
    setSearchQuery(value);
  };

  // Set search query to initial value when it changes.
  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  // Set loading to false when new grocery items are loaded.
  useEffect(() => {
    setLoading(false);
  }, [groceryItems]);

  return (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <div className="d-flex flex-column gap-1">
        <div className={`position-relative ${className}`} style={style}>
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
          {error && !showPopup && (
            <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
          )}
        </div>
        <div className="position-relative">
          {showPopup && (
            <Card className="position-absolute w-100 d-flex justify-content-center align-items-center flex-column py-1">
              {loading ? (
                <ThemedSpinner className="text-primary m-3" />
              ) : groceryItemsError ? (
                <p className="m-3">Something went wrong!</p>
              ) : hasGroceries ? (
                groceryItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="inactive"
                    className="w-100 text-start rounded-0"
                    onMouseDown={() => handleClick({ item })}
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
    </>
  );
}
