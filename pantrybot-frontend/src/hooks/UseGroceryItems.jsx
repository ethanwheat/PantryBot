import React, { useState } from "react";
import endpoints from "../constants/endpoints";

export default function useGroceryItems() {
  const [error, setError] = useState(false);
  const [groceryItems, setGroceryItems] = useState([]);

  const searchGroceryItems = async ({ item }) => {
    setError(false);

    try {
      // Fetch endpoint for search
      const res = await fetch(`${endpoints.groceries.search}/${item}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();

      setGroceryItems(data);
    } catch (e) {
      setError(true);
    }
  };

  return { groceryItems, error, searchGroceryItems };
}
