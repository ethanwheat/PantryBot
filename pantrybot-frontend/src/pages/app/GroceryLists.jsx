import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import ThemedAccordian from "../../components/accordians/ThemedAccordian";

export default function GroceryLists() {
  const mockGroceryLists = [
    {
      id: 0,
      name: "Grocery List 1",
      date: "11/12/24",
      items: [
        {
          id: 0,
          name: "Chicken",
          quantity: 1,
          unit: "lbs",
        },
      ],
    },
    {
      id: 1,
      name: "Grocery List 2",
      date: "11/12/24",
      items: [
        {
          id: 1,
          name: "Chicken",
          quantity: 1,
          unit: "lbs,
        },
      ],
    },
    {
      id: 2,
      name: "Grocery List 3",
      date: "11/12/24",
      items: [
        {
          id: 2,
          name: "Chicken",
          quantity: 1,
          unit: "lbs",
        },
      ],
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Grocery Lists</h1>
        <Button>Create Grocery List</Button>
      </div>
      <div className="my-2 d-flex flex-column gap-2">
        {mockGroceryLists.map((list, index) => (
          <ThemedAccordian
            key={index}
            open={index == 0}
            title={
              <div className="text-start">
                <h4 className="m-0">{list.name}</h4>
                <p className="m-0">{list.date}</p>
              </div>
            }
            right={
              <Button variant="link" className="text-black">
                <ThreeDotsVertical size={25} />
              </Button>
            }
          >
            <h1>Test</h1>
          </ThemedAccordian>
        ))}
      </div>
    </>
  );
}
