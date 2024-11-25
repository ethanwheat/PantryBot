import React from "react";
import { Dropdown, Form, Table } from "react-bootstrap";
import { ThreeDotsVertical, TrashFill } from "react-bootstrap-icons";
import DeleteModal from "../modals/DeleteModal";
import ErrorModal from "../modals/ErrorModal";
import useModal from "../../hooks/UseModal";
import QuantityInputBox from "../inputs/inputBoxes/QuantityInputBox";

export default function GroceryListTable({
  list,
  onDeleteGroceryItem,
  onQuantityChange,
  onInCartChange,
}) {
  const deleteModal = useModal();
  const errorModal = useModal();

  const items = list.items;

  const handleQuantityChange = async (listId, itemId, quantity) => {
    console.log(quantity);

    try {
      await onQuantityChange({ listId, itemId, quantity });
    } catch (e) {
      errorModal.showModal({
        data: {
          message: "Could not edit quantity of grocery item.",
        },
      });
    }
  };

  const handleInCartChange = async (listId, itemId, inCart) => {
    try {
      await onInCartChange({ listId, itemId, inCart });
    } catch (e) {
      errorModal.showModal({
        data: {
          message: "Could not edit in cart of grocery item.",
        },
      });
    }
  };

  return (
    <>
      <Table striped="columns">
        <thead>
          <tr>
            <th style={{ width: "75%" }}>Item</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Unit</th>
            <th className="text-center">In Cart</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td style={{ width: "75%" }}>
                <div
                  className="d-flex align-items-center"
                  style={{ minHeight: "2.5rem" }}
                >
                  <p className={`m-0 ${item.inCart && "text-decoration-line-through"}`}>
                    {item.name}
                  </p>
                </div>
              </td>
              <td style={{ minWidth: "8rem" }}>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ minHeight: "2.5rem" }}
                >
                  {item.inCart ? (
                    <p className="m-0">{item.quantity}</p>
                  ) : (
                    <QuantityInputBox
                      value={item.quantity}
                      onChange={(quantity) =>
                        handleQuantityChange(list._id, item._id, quantity)
                      }
                      disabled={item.inCart}
                    />
                  )}
                </div>
              </td>
              <td style={{ minWidth: "5rem" }}>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "2.5rem" }}
                >
                  <p className="m-0">{item.unit}</p>
                </div>
              </td>
              <td style={{ minWidth: "5rem" }}>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "2.5rem" }}
                >
                  <Form.Check
                    type="checkbox"
                    checked={item.inCart}
                    onChange={(e) =>
                      handleInCartChange(list._id, item._id, e.target.checked)
                    }
                  />
                </div>
              </td>
              <td>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "2.5rem" }}
                >
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="link"
                      className="text-black p-0 dropdown-toggle-hide"
                      id="dropdown"
                    >
                      <ThreeDotsVertical size={15} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        eventKey="1"
                        className="d-flex align-items-center gap-2 text-danger"
                        onClick={() =>
                          deleteModal.showModal({
                            data: {
                              name: item.name,
                            },
                            onSubmit: () =>
                              onDeleteGroceryItem({
                                listId: list._id,
                                itemId: item._id,
                              }),
                          })
                        }
                      >
                        <TrashFill />
                        <p className="m-0">Delete</p>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <DeleteModal modal={deleteModal} />
      <ErrorModal modal={errorModal} />
    </>
  );
}
