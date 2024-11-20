import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Table } from "react-bootstrap";
import { ThreeDotsVertical, TrashFill } from "react-bootstrap-icons";
import DeleteModal from "../modals/DeleteModal";
import ErrorModal from "../modals/ErrorModal";
import useModal from "../../hooks/UseModal";
import QuantityInputBox from "../inputs/inputBoxes/QuantityInputBox";

export default function GroceryListTable({
  list,
  onDeleteGroceryItem,
  onQuantityChange,
}) {
  const deleteModal = useModal();
  const errorModal = useModal();

  const items = list.items;

  const handleQuantityChange = async (list, item, quantity) => {
    try {
      await onQuantityChange({
        initialList: list,
        initialItem: item,
        quantity,
      });
    } catch (e) {
      errorModal.showModal({
        data: {
          message: "Could not edit quantity of grocery item.",
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
                  {item.name}
                </div>
              </td>
              <td>
                <QuantityInputBox
                  quantity={item.quantity}
                  onQuantityChange={(quantity) =>
                    handleQuantityChange(list, item, quantity)
                  }
                />
              </td>
              <td>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "2.5rem" }}
                >
                  <p className="m-0">{item.unit}</p>
                </div>
              </td>
              <td>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "2.5rem" }}
                >
                  <Form.Check name="group1" type="checkbox" />
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
