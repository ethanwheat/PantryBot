import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Card } from "react-bootstrap";
import endpoints from "../../constants/endpoints";
import GroceryItemInputBox from "../../components/inputs/inputBoxes/GroceryItemInputBox";
import { Controller, useForm } from "react-hook-form";
import UnitSelect from "../../components/inputs/selects/UnitSelect";
import QuantityInputBox from "../../components/inputs/inputBoxes/QuantityInputBox";
import ThemedSpinner from "../../components/spinners/ThemedSpinner";

export default function Pantry() {
  const [pantry, setPantry] = useState([]); // Pantry data
  const [rows, setRows] = useState([]); // JSX rows for the table
  const [loading, setLoading] = useState(false);

  // Import useForm hook and set default values to empty strings
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      quantity: "1",
      unit: "units",
    },
  });

  // Helper to update rows when pantry changes
  const updateRows = (updatedPantry) => {
    if (!Array.isArray(updatedPantry)) {
      console.error("Error: updateRows expected an array, but got:", updatedPantry);
      return;
    }

    const newRows = updatedPantry.map((item) => (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{item.unit}</td>
        <td>
          <Button variant="success" onClick={() => handleIncreaseQuantity(item._id)}>
            +
          </Button>
          <Button
            variant="warning"
            onClick={() => handleDecreaseQuantity(item._id, item.quantity)}
          >
            -
          </Button>
          <Button variant="danger" onClick={() => handleDeleteItem(item._id)}>
            Delete
          </Button>
        </td>
      </tr>
    ));
    setRows(newRows);
  };

  const fetchPantry = async () => {
    try {
      const res = await fetch(endpoints.pantry.get, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error fetching pantry:", errorText);
        alert("Failed to fetch pantry items.");
        return;
      }

      const pantryItems = await res.json();
      setPantry(pantryItems);
      updateRows(pantryItems); // Update rows for rendering
    } catch (error) {
      console.error("Error fetching pantry:", error);
      alert("An error occurred while fetching pantry items.");
    }
  };

  const handleAddItem = async ({ name, quantity, unit }) => {
    setLoading(true);

    try {
      const res = await fetch(endpoints.pantry.add, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, quantity, unit, dateCreated: new Date() }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error adding item:", errorText);
        alert("Failed to add item. Please try again.");
        return;
      }

      const updatedPantry = await res.json();
      console.log("Updated Pantry Response:", updatedPantry); // Log the response

      // Extract the items array from the response object
      const updatedItems = updatedPantry.items;

      // Update the state with the extracted array
      setPantry(updatedItems);
      updateRows(updatedItems); // Update rows for rendering
      reset();
    } catch (error) {
      console.error("Error adding item:", error);
      alert("An error occurred while adding the item.");
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseQuantity = async (itemId) => {
    try {
      const res = await fetch(`${endpoints.pantry.updateQuantity}/${itemId}/quantity`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ increment: 1 }), // Send the increment value
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error updating quantity:", errorText);
        alert("Failed to update quantity. Please try again.");
        return;
      }

      const updatedItems = await res.json();
      console.log("Updated Pantry Response:", updatedItems); // Log the response

      // Update the state with the extracted array
      setPantry(updatedItems);
      updateRows(updatedItems); // Update rows for rendering
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("An error occurred while updating the quantity.");
    }
  };

  const handleDecreaseQuantity = async (itemId, currentQuantity) => {
    if (currentQuantity <= 1) {
      alert("Quantity must be at least 1. Use the delete button to remove the item.");
      return;
    }

    try {
      const res = await fetch(`${endpoints.pantry.updateQuantity}/${itemId}/quantity`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ increment: -1 }), // Send the decrement value
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error decreasing quantity:", errorText);
        alert("Failed to decrease quantity.");
        return;
      }

      const updatedItems = await res.json();
      console.log("Updated Pantry Response:", updatedItems); // Log the response

      // Update the state with the extracted array
      setPantry(updatedItems);
      updateRows(updatedItems); // Update rows for rendering
    } catch (error) {
      console.error("Error decreasing quantity:", error);
      alert("An error occurred while decreasing the quantity.");
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`${endpoints.pantry.delete}/${itemId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error deleting item:", errorText);
        alert("Failed to delete item.");
        return;
      }

      const updatedItems = await res.json();
      console.log("Updated Pantry Response:", updatedItems); // Log the response

      // Extract the items array from the response object
      const updatedItemsArray = updatedItems.items;

      // Update the state with the extracted array
      setPantry(updatedItemsArray);
      updateRows(updatedItemsArray); // Update rows for rendering
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("An error occurred while deleting the item.");
    }
  };

  useEffect(() => {
    fetchPantry();
  }, []);

  return (
    <div className="d-flex flex-column gap-3">
      <h1>My Pantry</h1>

      {/* Add Item Form */}
      <Form
        noValidate
        onSubmit={handleSubmit(handleAddItem)}
        className="d-flex flex-column gap-3"
      >
        <Form.Group id="formName">
          <Controller
            name="name"
            control={control}
            rules={{
              required: "A grocery item is required.",
            }}
            render={({ field }) => (
              <GroceryItemInputBox
                label="Grocery Item"
                error={errors.name}
                value={field.value}
                onChange={field.onChange}
                disabled={loading}
              />
            )}
          />
        </Form.Group>

        <Form.Group id="formQuantity">
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <QuantityInputBox
                className="w-100 text-left"
                label="Quantity"
                error={errors.quantity}
                value={field.value}
                onChange={field.onChange}
                disabled={loading}
                hideIncrementDecrement
              />
            )}
          />
        </Form.Group>

        <Form.Group id="formUnit">
          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <UnitSelect
                label="Unit"
                error={errors.unit}
                value={field.value}
                onChange={field.onChange}
                disabled={loading}
              />
            )}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          onClick={handleSubmit(handleAddItem)}
        >
          {!loading ? "Add Item" : <ThemedSpinner size="sm" />}
        </Button>
      </Form>

      {/* Pantry Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}
