import React, { useContext } from "react";
import {
  Accordion,
  AccordionContext,
  Button,
  Card,
  Dropdown,
  useAccordionButton,
} from "react-bootstrap";
import {
  ChevronDown,
  ChevronUp,
  ThreeDotsVertical,
  TrashFill,
} from "react-bootstrap-icons";
import GroceryListTable from "../tables/GroceryListTable";
import DeleteModal from "../../components/modals/DeleteModal";
import AddGroceryItemModal from "../../components/modals/AddGroceryItemModal";
import useModal from "../../hooks/UseModal";

export default function GroceryListAccordian({
  list,
  open,
  onDeleteGroceryList,
  onAddGroceryItem,
  onDeleteGroceryItem,
  onQuantityChange,
}) {
  const deleteModal = useModal();
  const addModal = useModal();

  const items = list.items;
  const noItems = items.length === 0;

  return (
    <>
      <Accordion defaultActiveKey={open && 0}>
        <Card>
          <GroceryListAccordian.Header
            eventKey={0}
            list={list}
            onDeleteClick={() =>
              deleteModal.showModal({
                data: {
                  name: list.name,
                },
                onSubmit: () => onDeleteGroceryList({ id: list._id }),
              })
            }
          />
          <Accordion.Collapse eventKey={0}>
            <>
              <Card.Body>
                {noItems ? (
                  <div className="d-flex flex-column align-items-center py-1">
                    <p className="fs-2 m-2">No items in grocery list.</p>
                    <p>
                      Click "Add" to add your first item to your grocery list!
                    </p>
                  </div>
                ) : (
                  <GroceryListTable
                    list={list}
                    onDeleteGroceryItem={onDeleteGroceryItem}
                    onQuantityChange={onQuantityChange}
                  />
                )}
              </Card.Body>
              <Card.Footer className="d-flex justify-content-end">
                <Button
                  onClick={() =>
                    addModal.showModal({
                      data: {
                        listId: list._id,
                        listName: list.name,
                      },
                      onSubmit: onAddGroceryItem,
                    })
                  }
                >
                  Add
                </Button>
              </Card.Footer>
            </>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <DeleteModal modal={deleteModal} />
      <AddGroceryItemModal modal={addModal} />
    </>
  );
}

GroceryListAccordian.Header = function GroceryListAccordianHeader({
  eventKey,
  callback,
  onDeleteClick,
  list,
}) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <>
      <Card.Header
        className={`d-flex justify-content-between align-items-center gap-3 ${
          isCurrentEventKey && "bg-secondary"
        }`}
      >
        <Button
          className="h-100 w-100"
          style={{
            background: "none",
            color: "inherit",
            border: "none",
            padding: 0,
            font: "inherit",
            cursor: "pointer",
            outline: "inherit",
          }}
          onClick={decoratedOnClick}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-start">
              <h4 className="m-0">{list.name}</h4>
              <p className="m-0">
                {new Date(list.dateCreated).toLocaleDateString()}
              </p>
            </div>
            {isCurrentEventKey ? (
              <ChevronUp size={25} />
            ) : (
              <ChevronDown size={25} />
            )}
          </div>
        </Button>
        <Dropdown>
          <Dropdown.Toggle
            variant="link"
            className="text-black p-0 dropdown-toggle-hide"
            id="dropdown"
          >
            <ThreeDotsVertical size={22.5} />
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
      </Card.Header>
    </>
  );
};
