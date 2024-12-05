import React from "react";
import { Button } from "react-bootstrap";
import ThemedSpinner from "../../components/spinners/ThemedSpinner";
import GroceryListAccordian from "../../components/accordians/GroceryListAccordian";
import CreateGroceryListModal from "../../components/modals/CreateGroceryListModal";
import useGroceryLists from "../../hooks/UseGroceryLists";
import useModal from "../../hooks/UseModal";

export default function GroceryLists() {
  const {
    loading,
    error,
    groceryLists,
    createGroceryList,
    deleteGroceryList,
    addGroceryItem,
    deleteGroceryItem,
    changeQuantity,
    changeInCart,
  } = useGroceryLists();
  const createModal = useModal();

  const noLists = groceryLists.length === 0;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Grocery Lists</h1>
        <Button onClick={() => createModal.showModal({ onSubmit: createGroceryList })}>
          Create Grocery List
        </Button>
      </div>
      <div className="my-2 d-flex flex-column gap-2">
        {loading ? (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "50vh" }}
          >
            <ThemedSpinner variant="primary" />
          </div>
        ) : error ? (
          <GroceryLists.Message title="Something went wrong!" text={error} />
        ) : noLists ? (
          <GroceryLists.Message
            title="No grocery lists created."
            text='Click "Create Grocery List" to create your first grocery list!'
          />
        ) : (
          groceryLists.map((list, index) => {
            return (
              <GroceryListAccordian
                key={`${list._id}${index}`}
                list={list}
                open={index === 0}
                onDeleteGroceryList={deleteGroceryList}
                onAddGroceryItem={addGroceryItem}
                onDeleteGroceryItem={deleteGroceryItem}
                onQuantityChange={changeQuantity}
                onInCartChange={changeInCart}
              />
            );
          })
        )}
      </div>
      <CreateGroceryListModal modal={createModal} />
    </>
  );
}

GroceryLists.Message = function GroceryListMessage({ title, text }) {
  return (
    <div className="d-flex flex-column align-items-center py-5">
      <p className="fs-2 m-2">{title}</p>
      <p>{text}</p>
    </div>
  );
};
