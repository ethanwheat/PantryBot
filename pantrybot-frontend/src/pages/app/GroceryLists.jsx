import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ThemedSpinner from "../../components/spinners/ThemedSpinner";
import useGroceryLists from "../../hooks/useGroceryLists";
import GroceryListAccordian from "../../components/accordians/GroceryListAccordian";
import CreateGroceryListModal from "../../components/modals/CreateGroceryListModal";
import useModal from "../../hooks/UseModal";
import DeleteModal from "../../components/modals/DeleteModal";

export default function GroceryLists() {
  const { loading, error, groceryLists, createGroceryList, deleteGroceryList } =
    useGroceryLists();
  const createModal = useModal();
  const deleteModal = useModal();

  const noItems = groceryLists.length === 0;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Grocery Lists</h1>
        <Button onClick={createModal.showModal}>Create Grocery List</Button>
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
          <GroceryLists.Message title="Something went wrong" text={error} />
        ) : noItems ? (
          <GroceryLists.Message
            title="No grocery lists created."
            text='Click "Create Grocery List" to create your first grocery list!'
          />
        ) : (
          groceryLists.map((list, index) => (
            <GroceryListAccordian
              key={`${list._id}${index}`}
              open={index === 0}
              list={list}
              onDeleteClick={() => deleteModal.showModal(list)}
            />
          ))
        )}
      </div>
      <CreateGroceryListModal
        show={createModal.show}
        onHide={createModal.hideModal}
        onCreate={createGroceryList}
      />
      <DeleteModal
        show={deleteModal.show}
        onHide={deleteModal.hideModal}
        onDeleteConfirm={() => deleteGroceryList({ id: deleteModal.data?._id })}
        itemName={deleteModal.data?.name}
      />
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
