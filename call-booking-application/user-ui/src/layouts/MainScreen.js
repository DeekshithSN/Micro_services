import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function MainScreen({ children, title, user, logout }) {
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">{title}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end" id="navbar-dark-example">
            <Nav>
              {user ? <NavDropdown
                id="nav-dropdown-dark-example"
                title={user.username}
              >
                <NavDropdown.Item href="#" onClick={() => logout()}>Logout</NavDropdown.Item>
              </NavDropdown> : <></>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ paddingTop: 100 }}>
        {children}
      </Container>
    </>
  );
}

export default MainScreen;