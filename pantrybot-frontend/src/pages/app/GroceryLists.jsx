import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import GroceryListAccordian from "../../components/accordians/GroceryListAccordian";
import endpoints from "../../constants/endpoints";
import ThemedSpinner from "../../components/spinners/ThemedSpinner";
import GroceryListTable from "../../components/tables/GroceryListTable";
import EllipsisButton from "../../components/buttons/EllipsisButton";
import ErrorModal from "../../components/modals/ErrorModal";
import CreateGroceryListModal from "../../components/modals/CreateGroceryListModal";

export default function GroceryLists() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [groceryLists, setGroceryLists] = useState([]);

  const getGroceryLists = async () => {
    try {
      const res = await fetch(endpoints.groceryLists, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();

        setGroceryLists(data);
      }
    } catch (e) {
      setError({
        type: "background",
        message: "Could not load grocery lists.",
      });
    }
  };

  const handleCreateGroceryList = async ({ name }) => {
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

      if (res.ok) {
        const data = await res.json();

        // Create grocery list
        setGroceryLists((prev) => [data, ...prev]);
      }

  };

  const handleDeleteGroceryList = async (groceryListId) => {
    // Fetch api to delete grocery list
    try {
      const res = await fetch(`${endpoints.groceryLists}/${groceryListId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        // Remove grocery list
        setGroceryLists((prev) =>
          prev.filter((list) => list._id !== groceryListId)
        );
      }
    } catch (e) {
      setError({
        type: "modal",
        message: "Could not delete grocery list.",
      });
    }
  };

  const handleQuantityChange = async (groceryListId, groceryItem, quantity) => {
    // Store original quantity
    let originalQuantity = quantity;

    // Set state to updated quantity
    setGroceryLists((prev) =>
      prev.map((list) =>
        list._id === groceryListId
          ? {
              ...list,
              items: list.items.map((item) =>
                item._id === groceryItem._id
                  ? { ...groceryItem, quantity: quantity }
                  : item
              ),
            }
          : list
      )
    );

    // Fetch api with updated quantity
    try {
      await fetch(
        `${endpoints.groceryLists}/${groceryListId}/items/${groceryItem._id}/quantity`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: quantity,
          }),
        }
      );
    } catch (e) {
      // Set error
      setError({
        type: "modal",
        message: "Could not edit quantity.",
      });

      // Reset quantity back to what it was
      setGroceryLists((prev) =>
        prev.map((list) =>
          list._id === groceryListId
            ? {
                ...list,
                items: list.items.map((item) =>
                  item._id === groceryItem._id
                    ? { ...groceryItem, quantity: originalQuantity }
                    : item
                ),
              }
            : list
        )
      );
    }
  };

  // Load all grocery lists
  useEffect(() => {
    const loadGroceryLists = async () => {
      setLoading(true);

      await getGroceryLists();

      setLoading(false);
    };

    loadGroceryLists();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Grocery Lists</h1>
        <Button onClick={() => setShowCreateModal(true)}>
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
        ) : error?.type == "background" ? (
          <div className="d-flex flex-column align-items-center py-5">
            <p className="fs-2 m-2">Something went wrong.</p>
            <p>{error.message}</p>
          </div>
        ) : groceryLists.length === 0 ? (
          <div className="d-flex flex-column align-items-center py-5">
            <p className="fs-2 m-2">No grocery lists created.</p>
            <p>
              Click "Create Grocery List" to create your first grocery list!
            </p>
          </div>
        ) : (
          groceryLists.map((list, index) => (
            <GroceryListAccordian
              key={`${list._id}${index}`}
              open={index === 0}
              list={{ name: list.name, dateCreated: list.dateCreated }}
              onDelete={() => handleDeleteGroceryList(list._id)}
            >
              {list.items.length === 0 ? (
                <div className="d-flex flex-column align-items-center py-1">
                  <p className="fs-4 m-2">No items in grocery list.</p>
                  <p>
                    Click "Add" to add your first item to your grocery list!
                  </p>
                </div>
              ) : (
                <GroceryListTable>
                  <GroceryListTable.Header />
                  <GroceryListTable.Body>
                    {list.items.map((item) => (
                      <GroceryListTable.Item
                        key={item._id}
                        item={item}
                        onQuantityChange={(quantity) =>
                          handleQuantityChange(list._id, item, quantity)
                        }
                      />
                    ))}
                  </GroceryListTable.Body>
                </GroceryListTable>
              )}
            </GroceryListAccordian>
          ))
        )}
      </div>
      <CreateGroceryListModal
        showModal={showCreateModal}
        onHideModal={() => setShowCreateModal(false)}
        onCreate={handleCreateGroceryList}
      />
      <ErrorModal
        showModal={error?.type == "modal"}
        onHideModal={() => setError(null)}
        error={error?.message}
      />
    </>
  );
}
