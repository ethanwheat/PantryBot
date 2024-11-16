import { Button, Image, Offcanvas } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import routes from "../../constants/routes";
import { Link } from "react-router-dom";
import images from "../../constants/images";
import { useAuth } from "../../providers/AuthProvider";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function ThemedNavbar() {
  const { session } = useAuth();

  const [show, setShow] = useState(false);

  return (
    <>
      <Navbar
        expand="sm"
        className="bg-body-tertiary shadow px-sm-5"
        style={{ minHeight: "75px" }}
      >
        <Container fluid>
          <Navbar.Brand as={Link} to={routes.index}>
            <Image src={images.logo} style={{ width: "10rem" }} />
          </Navbar.Brand>
          {!session ? (
            <>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse className="justify-content-end">
                <Nav className="d-flex gap-3">
                  <Nav.Link as={Link} to={routes.login}>
                    Login
                  </Nav.Link>
                  <Button variant="primary" as={Link} to={routes.signup}>
                    Sign Up
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </>
          ) : (
            <>
              <Navbar.Toggle onClick={() => setShow(true)} />
            </>
          )}
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={() => setShow(false)} className="bg-body-tertiary">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Image src={images.logo} style={{ width: "10rem" }} />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Sidebar onSelect={() => setShow(false)}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
