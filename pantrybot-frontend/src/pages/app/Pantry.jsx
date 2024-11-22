import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import endpoints from "../../constants/endpoints";
import GroceryItemInputBox from "../../components/inputs/inputBoxes/GroceryItemInputBox";

export default function Pantry() {
  const [pantry, setPantry] = useState([]); // Pantry items state
  const [selectedItem, setSelectedItem] = useState(""); // Selected grocery item
  const [quantity, setQuantity] = useState(1); // Quantity of the item
  const [unit, setUnit] = useState("g"); // Unit of the item

  // Fetch pantry items from the backend
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
    } catch (error) {
      console.error("Error fetching pantry:", error);
      alert("An error occurred while fetching pantry items.");
    }
  };

  // Add an item to the pantry
  const handleAddItem = async () => {
    if (!selectedItem || quantity <= 0) {
      alert("Please select an item and enter a valid quantity.");
      return;
    }

    try {
      const res = await fetch(endpoints.pantry.add, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: selectedItem, quantity, unit }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error adding item:", errorText);
        alert("Failed to add item. Please try again.");
        return;
      }

      const updatedItems = await res.json();
      setPantry(updatedItems); // Update pantry table
      setSelectedItem(""); // Clear input
      setQuantity(1); // Reset quantity
      setUnit("g"); // Reset unit
    } catch (error) {
      console.error("Error adding item:", error);
      alert("An error occurred while adding the item.");
    }
  };

  // Increase the quantity of an item
  const handleIncreaseQuantity = async (itemId) => {
    try {
      const res = await fetch(`${endpoints.pantry.updateQuantity}/${itemId}/quantity`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: 1 }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error increasing quantity:", errorText);
        alert("Failed to increase quantity.");
        return;
      }

      const updatedItems = await res.json();
      setPantry(updatedItems); // Update pantry table
    } catch (error) {
      console.error("Error increasing quantity:", error);
      alert("An error occurred while increasing the quantity.");
    }
  };

  // Decrease the quantity of an item
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
        body: JSON.stringify({ quantity: -1 }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error decreasing quantity:", errorText);
        alert("Failed to decrease quantity.");
        return;
      }

      const updatedItems = await res.json();
      setPantry(updatedItems); // Update pantry table
    } catch (error) {
      console.error("Error decreasing quantity:", error);
      alert("An error occurred while decreasing the quantity.");
    }
  };

  // Delete an item from the pantry
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
      setPantry(updatedItems); // Update pantry table
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("An error occurred while deleting the item.");
    }
  };

  // Fetch pantry items on component mount
  useEffect(() => {
    fetchPantry();
  }, []);

  return (
    <Container>
      <h1>My Pantry</h1>

      {/* Add Item Form */}
      <Form className="d-flex flex-column gap-3">
        <GroceryItemInputBox
          label="Search Item"
          value={selectedItem}
          onChange={(item) => setSelectedItem(item)}
          error={selectedItem === "" ? { message: "Please select an item." } : null}
        />

        <Form.Group>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Unit</Form.Label>
          <Form.Select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="g">Grams (g)</option>
            <option value="kg">Kilograms (kg)</option>
            <option value="ml">Milliliters (ml)</option>
            <option value="l">Liters (l)</option>
            <option value="oz">Ounces (oz)</option>
            <option value="lb">Pounds (lb)</option>
          </Form.Select>
        </Form.Group>

        <Button onClick={handleAddItem} variant="primary">
          Add Item
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
        <tbody>
          {pantry.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => handleIncreaseQuantity(item._id)}
                >
                  +
                </Button>
                <Button
                  variant="warning"
                  onClick={() => handleDecreaseQuantity(item._id, item.quantity)}
                >
                  -
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteItem(item._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
