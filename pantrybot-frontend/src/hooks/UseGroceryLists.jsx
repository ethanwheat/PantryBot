import { useEffect, useState } from "react";
import endpoints from "../constants/endpoints";

export default function useGroceryLists() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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

    // Throw error if response is invalid
    if (!res.ok) {
      const errorMessage = await res.statusText;
      throw new Error(errorMessage);
    }

    const data = await res.json();

    // Create grocery list
    setGroceryLists((prev) => [data, ...prev]);
  };

  const deleteGroceryList = async ({ id }) => {
    // Fetch api to delete grocery list
    const res = await fetch(`${endpoints.groceryLists}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    // Throw error if response is invalid
    if (!res.ok) {
      const errorMessage = await res.statusText;
      throw new Error(errorMessage);
    }

    // Remove grocery list
    setGroceryLists((prev) => prev.filter((list) => list._id !== id));
  };

  const addGroceryItem = async ({ listId, name, quantity, unit }) => {
    // Fetch api to add grocery item
    const res = await fetch(`${endpoints.groceryLists}/${listId}/items`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        quantity,
        unit,
      }),
    });

    // Throw error if response is invalid
    if (!res.ok) {
      const errorMessage = await res.statusText;
      throw new Error(errorMessage);
    }

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
    const res = await fetch(
      `${endpoints.groceryLists}/${listId}/items/${itemId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    // Throw error if response is invalid
    if (!res.ok) {
      const errorMessage = await res.statusText;
      throw new Error(errorMessage);
    }

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

  const changeQuantity = async ({ listId, itemId, quantity }) => {
    // Change quantity of grocery item
    setGroceryLists((prev) =>
      prev.map((list) => {
        if (list._id === listId) {
          return {
            ...list,
            items: list.items.map((item) =>
              item._id === itemId ? { ...item, quantity } : item
            ),
          };
        }
        return list;
      })
    );

    // Fetch api to change quantity on grocery item
    const res = await fetch(
      `${endpoints.groceryLists}/${listId}/items/${itemId}/quantity`,
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

    // Throw error if response is invalid
    if (!res.ok) {
      const errorMessage = await res.statusText;
      throw new Error(errorMessage);
    }
  };

  const changeInCart = async ({ listId, itemId, inCart }) => {
    // Change inCart of grocery item
    setGroceryLists((prev) =>
      prev.map((list) => {
        if (list._id === listId) {
          return {
            ...list,
            items: list.items.map((item) =>
              item._id === itemId ? { ...item, inCart } : item
            ),
          };
        }
        return list;
      })
    );

    // Fetch api to change inCart on grocery item
    const res = await fetch(
      `${endpoints.groceryLists}/${listId}/items/${itemId}/inCart`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inCart,
        }),
      }
    );

    // Throw error if response is invalid
    if (!res.ok) {
      const errorMessage = await res.statusText;
      throw new Error(errorMessage);
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

        // Throw error if response is invalid
        if (!res.ok) {
          const errorMessage = await res.statusText;
          throw new Error(errorMessage);
        }

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
    changeInCart,
  };
}
