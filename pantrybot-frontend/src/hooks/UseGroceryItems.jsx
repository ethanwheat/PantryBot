import { useState } from "react";
import endpoints from "../constants/endpoints";

export default function useGroceryItems() {
  const [error, setError] = useState(false);
  const [groceryItems, setGroceryItems] = useState([]);

  const searchGroceryItems = async ({ item }) => {
    try {
      // Fetch endpoint for search
      const res = await fetch(`${endpoints.groceries.search}/${item}`, {
        method: "GET",
      });

      // Throw error if response is invalid
      if (!res.ok) {
        const errorMessage = await res.statusText;
        throw new Error(errorMessage);
      }

      const data = await res.json();

      setError(false);
      setGroceryItems(data);
    } catch (e) {
      setError(e);
      setGroceryItems([]);
    }
  };

  return { error, groceryItems, searchGroceryItems };
}
