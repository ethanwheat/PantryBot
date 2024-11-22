import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import endpoints from "../../constants/endpoints";

export default function Pantry() {
  // State to store pantry items and form inputs
  const [pantry, setPantry] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("g");

  // Fetch pantry items on component mount
  useEffect(() => {
    fetchPantry(); // Call fetchPantry when the component is first rendered
  }, []);

  // Function to fetch pantry items from the backend
  const fetchPantry = async () => {
    try {
      const res = await fetch(endpoints.pantry.get);
      const data = await res.json();
      setPantry(data.items || []); // Update state with fetched items
    } catch (error) {
      console.error("Error fetching pantry:", error);
    }
  };

  // Function to add a new item to the pantry
  const handleAddItem = async () => {
    if (!newItem || quantity <= 0) {
      alert("Please enter valid item details.");
      return;
    }
  
    try {
      const res = await fetch(endpoints.pantry.add, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newItem, quantity, unit }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error adding item:", errorData.message);
        alert("Failed to add item. Please try again.");
        return;
      }
      const addedPantry = await res.json();

      // Update pantry state by appending the new item
      setPantry((prevPantry) => [
        ...prevPantry,
        { name: newItem, quantity, unit, _id: addedPantry.items[addedPantry.items.length - 1]._id },
      ]);
      setNewItem(""); // Clear input fields
      setQuantity(1);
      setUnit("g");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("An error occurred while adding the item.");
    }
  };
  

  // Other functions like handleIncreaseQuantity, handleDecreaseQuantity, etc.
  const handleIncreaseQuantity = async (itemId) => {
    try {
      const res = await fetch(`${endpoints.pantry.updateQuantity}/${itemId}/quantity`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: 1 }), // Increase by 1
      });

      if (res.ok) {
        const updatedPantry = await res.json();
        setPantry(updatedPantry.items); // Update pantry state with new data
      } else {
        console.error("Error increasing quantity:", await res.text());
        alert("Failed to increase quantity. Please try again.");
      }
    } catch (error) {
      console.error("Error increasing quantity:", error);
      alert("An error occurred while increasing the quantity.");
    }
  };

  const handleDecreaseQuantity = async (itemId) => {
    try {
      const res = await fetch(`${endpoints.pantry.update}/${itemId}/decrease`, {
        method: "PATCH",
      });

      if (res.ok) {
        fetchPantry();
      }
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const res = await fetch(`${endpoints.pantry.delete}/${itemId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchPantry();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Component UI
  return (
    <Container>
      <h1>My Pantry</h1>

      {/* Add New Item Form */}
      <Form className="mb-4">
        <Form.Group>
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Unit</Form.Label>
          <Form.Select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="oz">oz</option>
            <option value="lb">lb</option>
            <option value="l">l</option>
            <option value="ml">ml</option>
          </Form.Select>
        </Form.Group>
        <Button className="mt-2" onClick={handleAddItem}>
          Add Item
        </Button>
      </Form>

      {/* Pantry Items Table */}
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
                  onClick={() => handleDecreaseQuantity(item._id)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <Button variant="danger" onClick={() => handleDeleteItem(item._id)}>
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
