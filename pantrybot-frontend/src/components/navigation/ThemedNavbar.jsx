import { Button, Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import routes from '../../constants/routes';
import { Link } from "react-router-dom";
import images from '../../constants/images';
import { useAuth } from '../../providers/AuthProvider';

export default function ThemedNavbar() {
  const { user } = useAuth();

  return (
    <Navbar expand="sm" className="bg-body-tertiary shadow" style={{ minHeight: "75px" }}>
      <Container>
        <Navbar.Brand as={Link} to={routes.index}><Image src={images.logo} style={{ width: "10rem" }} /></Navbar.Brand>
        { !user && (
          <>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse className="justify-content-end">
                <Nav className="d-flex gap-3">
                  <Nav.Link as={Link} to={routes.login}>Login</Nav.Link>
                  <Button variant="primary" as={Link} to={routes.signup}>Signup</Button>
                </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  )
}
