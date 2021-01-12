import React, { useContext } from "react";
import { IconButton } from "@material-ui/core";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ExitToApp, GitHub } from "@material-ui/icons";
import { userContext } from "../Context/User/userProvider";
import { guestContext } from "../Context/Guest/guestProvider";

const Header = () => {
  const { logoutUser, user } = useContext(userContext);
  const { clearUserData } = useContext(guestContext);
  const { firstName, lastName } = user;

  const handleLogout = (e) => {
    e.preventDefault();
    clearUserData();
    logoutUser();
  };

  return (
    <section className="header">
      <Navbar bg="bark" expand="lg" fixed="top">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <NavLink className="d-inline p-2 text-white" to="/">
                Home
              </NavLink>
            </Nav>
            <Nav className="navUser">
              <span>Welcome, {`${firstName} ${lastName}`}</span>
            </Nav>
            <Nav className="header_cart">
              <IconButton onClick={handleLogout}>
                <ExitToApp />
              </IconButton>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/akashingne/party-invitation-app"
              >
                <IconButton>
                  <GitHub />
                </IconButton>
              </a>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};

export default Header;
