import { useEffect, useState } from "react";
import endpoints from "../constants/endpoints";

export default function useRecipes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [searchResults, setSearchResults] = useState({});
  const [groceryLists, setGroceryLists] = useState({});

  const loadRecipes = async () => {
    setLoading(true);
    setError(null); // reset error on every load

    try {
      const res = await fetch(endpoints.recipes.get, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        const errorMessage = await res.statusText;
        throw new Error(errorMessage);
      }

      const data = await res.json();
      setRecipes(data.recipes || data); // set recipes if there's a recipes field
    } catch (e) {
      setError("Could not load recipes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const getRecipeById = async (recipeID) => {

    const res = await fetch(`${endpoints.recipes.get}/${recipeID}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorMessage = await res.statusText;
      throw new Error(errorMessage);
    }

    const data = await res.json();
    setRecipeDetails(data.recipe); // Set the specific recipe details
  };

  
  const deleteRecipe = async (recipeID) => {

    const res = await fetch(`${endpoints.recipes.get}/${recipeID}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const errorMessage = await res.statusText;
      throw new Error(errorMessage);
    }
    loadRecipes();

  };

  const searchRecipe = async ( prompt, usePantry, useDiet, useAllergies, budget ) => {
    setSearchResults({});
    try {
      // Construct query parameters
      const queryParams = new URLSearchParams({
        prompt,
        usePantry: usePantry ? "true" : "false",
        useDiet: useDiet ? "true" : "false",
        useAllergies: useAllergies ? "true" : "false",
        budget: budget.toString(),
      }).toString();

      // Append query parameters to the URL
      const url = `${endpoints.recipes.search}?${queryParams}`;

      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        const errorMessage = await res.statusText;
        throw new Error(errorMessage);
      }

      const data = await res.json();
      if (data.error) {
        setSearchResults({ error: data.error});
      } else {
        setSearchResults(data);
      }
    } catch (e) {
      setSearchResults({ error: e.message});
    }
  };

  const saveRecipe = async () => {
    const { name, description, ingredients, estimatedTime } = searchResults;
    console.log(ingredients);

    const res = await fetch(endpoints.recipes.add, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        ingredients,
        estimatedTime
      }),
    });

    // Throw error if response is invalid
    if (!res.ok) {
      const errorMessage = await res.statusText;
      throw new Error(errorMessage);
    }

  };

  const loadGroceryLists = async () => {
    setGroceryLists({});
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
  };

  return { loading, error, recipes, recipeDetails, searchResults, groceryLists, getRecipeById, deleteRecipe, searchRecipe, saveRecipe, loadRecipes, loadGroceryLists };
}
