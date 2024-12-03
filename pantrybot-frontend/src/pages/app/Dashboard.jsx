import React from "react";
import { useAuth } from "../../providers/AuthProvider";
import useGroceryLists from "../../hooks/useGroceryLists";
import GroceryListAccordian from "../../components/accordians/GroceryListAccordian";
import ThemedSpinner from "../../components/spinners/ThemedSpinner";
import useRecipes from "../../hooks/UseRecipes";
import { Button } from "react-bootstrap";
import useModal from "../../hooks/UseModal";
import ViewRecipeModal from "../../components/modals/ViewRecipeModal";

export default function Dashboard() {
  const {
    session: {
      profile: { firstName },
    },
  } = useAuth();
  const {
    loading: groceryListsLoading,
    error: groceryListError,
    groceryLists,
    refreshGroceryLists,
    deleteGroceryList,
    addGroceryItem,
    deleteGroceryItem,
    changeQuantity,
    changeInCart,
  } = useGroceryLists();
  const {
    loading: recipesLoading,
    error: recipesError,
    recipes,
    recipeDetails,
    getRecipeById,
    deleteRecipe,
  } = useRecipes();
  const viewModal = useModal();

  const noLists = groceryLists.length === 0;
  const noRecipes = recipes.length === 0;

  return (
    <>
      <div className="d-flex flex-column gap-3">
        <div>
          <h1>Dashboard</h1>
          <p className="fs-2">Welcome back, {firstName}!</p>
        </div>
        <div>
          <p className="fs-3 fw-semibold">Nearby Grocery Stores</p>
          <div
            className="bg-gray d-flex w-100 justify-content-center align-items-center"
            style={{ height: "25rem" }}
          >
            <p>Put map here.</p>
          </div>
        </div>
        <div className="d-flex flex-column flex-sm-row gap-3">
          <div className="w-100 w-sm-60">
            <p className="fs-3 fw-semibold">Recent Grocery List</p>
            {groceryListsLoading ? (
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "15rem" }}
              >
                <ThemedSpinner variant="primary" />
              </div>
            ) : groceryListError ? (
              <Dashboard.Message
                title="Something went wrong!"
                text={groceryListError}
              />
            ) : noLists ? (
              <Dashboard.Message
                title="No grocery lists created."
                text='Click "Grocery Lists" to create your first grocery list!'
              />
            ) : (
              <GroceryListAccordian
                list={groceryLists[0]}
                open={true}
                onDeleteGroceryList={deleteGroceryList}
                onAddGroceryItem={addGroceryItem}
                onDeleteGroceryItem={deleteGroceryItem}
                onQuantityChange={changeQuantity}
                onInCartChange={changeInCart}
              />
            )}
          </div>
          <div className="w-100 w-sm-40">
            <p className="fs-3 fw-semibold">Recent Saved Recipes</p>
            {recipesLoading ? (
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "15rem" }}
              >
                <ThemedSpinner variant="primary" />
              </div>
            ) : recipesError ? (
              <Dashboard.Message
                title="Something went wrong!"
                text={recipesError}
              />
            ) : noRecipes ? (
              <Dashboard.Message
                title="No recipes created."
                text='Click "Recipes" to create your first recipe!'
              />
            ) : (
              <div className="d-flex flex-column gap-1">
                {recipes.slice(0, 10).map((recipe) => (
                  <Button
                    onClick={() => {
                      viewModal.showModal({
                        data: recipe.id,
                      });
                    }}
                    variant="primary"
                    size="lg"
                    key={recipe.id}
                  >
                    {recipe.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ViewRecipeModal
        modal={viewModal}
        recipeDetails={recipeDetails}
        getRecipeById={getRecipeById}
        deleteRecipe={deleteRecipe}
        addItemsToList={refreshGroceryLists}
      />
    </>
  );
}

Dashboard.Message = function DashboardMessage({ title, text }) {
  return (
    <div className="d-flex flex-column align-items-center py-5">
      <p className="fs-2 m-2">{title}</p>
      <p>{text}</p>
    </div>
  );
};
