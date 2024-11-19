import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Table } from "react-bootstrap";
import { ThreeDotsVertical, TrashFill } from "react-bootstrap-icons";
import DeleteModal from "../modals/DeleteModal";
import useModal from "../../hooks/UseModal";
import QuantityInputBox from "../inputs/inputBoxes/QuantityInputBox";

export default function GroceryListTable({
  list,
  onDeleteGroceryItem,
  onQuantityChange,
}) {
  const deleteModal = useModal();

  const items = list.items;

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
                  style={{ height: "2.5rem" }}
                >
                  {item.name}
                </div>
              </td>
              <td>
                <QuantityInputBox
                  quantity={item.quantity}
                  onQuantityChange={(quantity) => {
                    onQuantityChange({
                      initialList: list,
                      initialItem: item,
                      quantity,
                    });
                  }}
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
    </>
  );
}

GroceryListTable.Item = function GroceryListTableItem({ item, onDeleteClick }) {
  // const [quantity, setQuantity] = useState(item.quantity);

  // useEffect(() => {
  //   onQuantityChange(quantity || 1);
  // }, [quantity]);

  return (
    <tr>
      <td style={{ width: "75%" }}>
        <div className="d-flex align-items-center" style={{ height: "2.5rem" }}>
          {item.name}
        </div>
      </td>
      <td>
        {/* <div
          className="d-flex justify-content-center align-items-center gap-2"
          style={{ height: "2.5rem" }}
        >
          <Button
            variant="none"
            className="p-0"
            onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))}
          >
            -
          </Button>
          <Form.Control
            value={quantity || ""}
            type="text"
            onChange={(e) => setQuantity(parseFloat(e.target.value))}
            onBlur={() => !quantity && setQuantity(1)}
            className="m-0 text-center"
            style={{ width: "4rem" }}
          />
          <Button
            variant="none"
            className="p-0"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </Button>
        </div> */}
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
                onClick={onDeleteClick}
              >
                <TrashFill />
                <p className="m-0">Delete</p>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </td>
    </tr>
  );
};
