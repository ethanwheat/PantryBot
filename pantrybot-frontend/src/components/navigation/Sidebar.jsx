import React from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import routes from "../../constants/routes";
import { useAuth } from "../../providers/AuthProvider";
import { BoxArrowLeft, HouseDoorFill, ListTask } from "react-bootstrap-icons";

export default function Sidebar({ onSelect }) {
  const location = useLocation();
  const { logout } = useAuth();

  const topLinks = [
    {
      text: "Dashboard",
      route: routes.app.dashboard,
      icon: <HouseDoorFill size={25} />,
    },
    {
      text: "Grocery Lists",
      route: routes.app.groceryLists,
      icon: <ListTask size={25} />,
    },
    {
      text: "Pantry",
      route: routes.app.pantry,
      icon: <ListTask size={25} />,
    },
    {
      text: "Recipes",
      route: routes.app.recipes,
      icon: <ListTask size={25} />,
    },
  ];

  const bottomLinks = [
    {
      text: "Logout",
      onClick: logout,
      icon: <BoxArrowLeft size={25} />,
    },
  ];

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <div>
        {topLinks.map((link) => (
          <Button
            key={link.text}
            as={Link}
            to={link.route}
            onClick={onSelect}
            size="lg"
            variant={
              location.pathname.startsWith(link.route) ? "primary" : "sidebar-inactive"
            }
            className="d-flex align-items-center gap-3 rounded-0 w-100"
            style={{ height: "4rem" }}
          >
            {link.icon}
            {link.text}
          </Button>
        ))}
      </div>
      <div>
        {bottomLinks.map((link) => (
          <Button
            key={link.text}
            variant="btn-sidebar-inactive"
            onClick={() => {
              link.onClick();
              onSelect();
            }}
            size="lg"
            className="d-flex align-items-center gap-3 rounded-0 w-100"
            style={{ height: "4rem" }}
          >
            {link.icon}
            {link.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
