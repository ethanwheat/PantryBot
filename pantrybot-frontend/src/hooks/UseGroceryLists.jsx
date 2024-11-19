import { useEffect, useState } from "react";
import endpoints from "../constants/endpoints";

export default function useGroceryLists() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [groceryLists, setGroceryLists] = useState([]);

  const createGroceryList = async ({ name }) => {
    // Fetch api to create grocery list
    const res = await fetch(endpoints.groceryLists, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        dateCreated: new Date(),
        items: [],
      }),
    });

    const data = await res.json();

    // Create grocery list
    setGroceryLists((prev) => [data, ...prev]);
  };

  const deleteGroceryList = async ({ id }) => {
    // Fetch api to delete grocery list
    await fetch(`${endpoints.groceryLists}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    // Remove grocery list
    setGroceryLists((prev) => prev.filter((list) => list._id !== id));
  };

  const addGroceryItem = async ({ listId }) => {
    // Fetch api to add grocery item
    const res = await fetch(`${endpoints.groceryLists}/${listId}/items`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "test",
        quantity: 1,
        unit: "l",
      }),
    });

    const data = await res.json();
    const items = data.items;

    // Add grocery item
    setGroceryLists((prev) =>
      prev.map((list) => {
        if (list._id === listId) {
          return {
            ...list,
            items,
          };
        }
        return list;
      })
    );
  };

  const deleteGroceryItem = async ({ listId, itemId }) => {
    // Fetch api to delete grocery item
    await fetch(`${endpoints.groceryLists}/${listId}/items/${itemId}`, {
      method: "DELETE",
      credentials: "include",
    });

    // Remove grocery item
    setGroceryLists((prev) =>
      prev.map((list) => {
        if (list._id === listId) {
          return {
            ...list,
            items: list.items.filter((item) => item._id !== itemId),
          };
        }
        return list;
      })
    );
  };

  const changeQuantity = async ({ initialList, initialItem, quantity }) => {
    // Change quantity of grocery item
    setGroceryLists((prev) =>
      prev.map((list) => {
        if (list._id === initialList._id) {
          return {
            ...list,
            items: list.items.map((item) =>
              item._id === initialItem._id ? { ...item, quantity } : item
            ),
          };
        }
        return list;
      })
    );

    try {
      // Fetch api to change quantity on grocery item
      await fetch(
        `${endpoints.groceryLists}/${initialList._id}/items/${initialItem._id}/quantity`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity,
          }),
        }
      );
    } catch (e) {
      // Reset quantity if there is an error
      setGroceryLists((prev) =>
        prev.map((list) => {
          if (list._id === initialList._id) {
            return {
              ...list,
              items: list.items.map((item) =>
                item._id === initialItem._id ? initialItem : item
              ),
            };
          }
          return list;
        })
      );
    }
  };

  useEffect(() => {
    const loadGroceryLists = async () => {
      setLoading(true);

      try {
        const res = await fetch(endpoints.groceryLists, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setGroceryLists(data);
      } catch (e) {
        setError("Could not load grocery lists.");
      } finally {
        setLoading(false);
      }
    };

    loadGroceryLists();
  }, []);

  return {
    loading,
    error,
    groceryLists,
    createGroceryList,
    deleteGroceryList,
    addGroceryItem,
    deleteGroceryItem,
    changeQuantity,
  };
}
