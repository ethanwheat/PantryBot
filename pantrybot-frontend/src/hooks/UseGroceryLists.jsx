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

  return { loading, error, groceryLists, createGroceryList, deleteGroceryList };
}
