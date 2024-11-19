import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ThemedSpinner from "../../components/spinners/ThemedSpinner";
import useGroceryLists from "../../hooks/useGroceryLists";
import GroceryListAccordian from "../../components/accordians/GroceryListAccordian";
import CreateGroceryListModal from "../../components/modals/CreateGroceryListModal";
import AddGroceryItemModal from "../../components/modals/AddGroceryItemModal";
import DeleteModal from "../../components/modals/DeleteModal";
import useModal from "../../hooks/UseModal";
import GroceryListTable from "../../components/tables/GroceryListTable";

export default function GroceryLists() {
  const {
    loading,
    error,
    groceryLists,
    createGroceryList,
    deleteGroceryList,
    addGroceryItem,
    deleteGroceryItem,
  } = useGroceryLists();
  const createModal = useModal();
  const addModal = useModal();
  const deleteModal = useModal();

  const noLists = groceryLists.length === 0;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Grocery Lists</h1>
        <Button
          onClick={() =>
            createModal.showModal({
              onSubmit: createGroceryList,
            })
          }
        >
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
            const items = list.items;
            const noItems = items.length === 0;

            return (
              <GroceryListAccordian open={index === 0} key={`${list._id}${index}`}>
                <GroceryListAccordian.Header
                  eventKey={0}
                  list={list}
                  onDeleteClick={() =>
                    deleteModal.showModal({
                      data: {
                        name: list.name,
                      },
                      onSubmit: () => deleteGroceryList({ id: list._id }),
                    })
                  }
                />
                <GroceryListAccordian.Collapse eventKey={0}>
                  <GroceryListAccordian.Body>
                    {noItems ? (
                      <GroceryLists.Message
                        title="No items in grocery list."
                        text='Click "Add" to add your first item to your grocery list!'
                        small
                      />
                    ) : (
                      <GroceryListTable>
                        <GroceryListTable.Header />
                        <GroceryListTable.Body>
                          {items.map((item) => (
                            <GroceryListTable.Item
                              key={item._id}
                              item={item}
                              onDeleteClick={() =>
                                deleteModal.showModal({
                                  data: {
                                    name: item.name,
                                  },
                                  onSubmit: () =>
                                    deleteGroceryItem({
                                      listId: list._id,
                                      itemId: item._id,
                                    }),
                                })
                              }
                            />
                          ))}
                        </GroceryListTable.Body>
                      </GroceryListTable>
                    )}
                  </GroceryListAccordian.Body>
                  <GroceryListAccordian.Footer>
                    <div className="d-flex justify-content-end">
                      <Button
                        onClick={() =>
                          addModal.showModal({
                            data: {
                              listId: list._id,
                              listName: list.name,
                            },
                            onSubmit: addGroceryItem,
                          })
                        }
                      >
                        Add
                      </Button>
                    </div>
                  </GroceryListAccordian.Footer>
                </GroceryListAccordian.Collapse>
              </GroceryListAccordian>
            );
          })
        )}
      </div>
      <CreateGroceryListModal modal={createModal} />
      <AddGroceryItemModal modal={addModal} />
      <DeleteModal modal={deleteModal} />
    </>
  );
}

GroceryLists.Message = function GroceryListMessage({ title, text, small }) {
  return (
    <div className={`d-flex flex-column align-items-center ${small ? "py-1" : "py-5"}`}>
      <p className="fs-2 m-2">{title}</p>
      <p>{text}</p>
    </div>
  );
};
